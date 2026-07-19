"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

// Context for managing dropdown state
type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const DropdownContext = React.createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
};

// Root DropdownMenu Component
function DropdownMenu({ children, defaultOpen = false }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest?.('[data-slot="dropdown-menu-content"]')
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

// Trigger Component
function DropdownMenuTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerRef } = useDropdown();

  return (
    <button
      ref={triggerRef}
      type="button"
      data-state={open ? "open" : "closed"}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      onClick={() => setOpen(!open)}
      aria-haspopup="true"
      aria-expanded={open}
      {...props}
    >
      {children}
    </button>
  );
}

// Portal Component (simple implementation)
function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Content Component
function DropdownMenuContent({
  children,
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const { open, triggerRef } = useDropdown();
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const left = align === "start" ? rect.left : align === "end" ? rect.right - 200 : rect.left + rect.width / 2 - 100;
      setPosition({
        top: rect.bottom + sideOffset,
        left: Math.max(10, left),
      });
    }
  }, [open, triggerRef, align, sideOffset]);

  if (!open) return null;

  return (
    <div
      data-slot="dropdown-menu-content"
      className={cn(
        "z-50 min-w-32 max-h-[var(--available-height)] overflow-auto rounded-lg bg-white p-1 text-gray-900 shadow-lg ring-1 ring-black/10 animate-in fade-in-0 zoom-in-95",
        className
      )}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transformOrigin: "top",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Group Component
function DropdownMenuGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="dropdown-menu-group" className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// Label Component
function DropdownMenuLabel({
  className,
  inset,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-1.5 py-1 text-xs font-medium text-gray-500", inset && "pl-7", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Item Component
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const { setOpen } = useDropdown();

  return (
    <button
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none transition-colors hover:bg-gray-100 hover:text-gray-900",
        variant === "destructive" && "text-red-600 hover:bg-red-50 hover:text-red-700",
        inset && "pl-7",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        // Close the dropdown after item click
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// Sub Menu
function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 4,
      });
    }
  }, [open]);

  // Find the trigger and content from children
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuSubTrigger
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuSubContent
  );

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      {open && content && (
        <div
          className="fixed z-50 min-w-32 rounded-lg bg-white p-1 text-gray-900 shadow-lg ring-1 ring-black/10 animate-in fade-in-0 zoom-in-95"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// Sub Trigger - Fixed with forwardRef and proper typing
const DropdownMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-gray-100",
        inset && "pl-7",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </button>
  );
});

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// Sub Content
function DropdownMenuSubContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-w-32 rounded-lg bg-white p-1 text-gray-900 shadow-lg ring-1 ring-black/10", className)} {...props}>
      {children}
    </div>
  );
}

// Checkbox Item
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  inset?: boolean;
}) {
  const { setOpen } = useDropdown();

  return (
    <button
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none transition-colors hover:bg-gray-100",
        inset && "pl-7",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <CheckIcon className="h-4 w-4" />}
      </span>
    </button>
  );
}

// Radio Group
function DropdownMenuRadioGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="dropdown-menu-radio-group" className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// Radio Item
function DropdownMenuRadioItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  inset?: boolean;
}) {
  const { setOpen } = useDropdown();

  return (
    <button
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none transition-colors hover:bg-gray-100",
        inset && "pl-7",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <CheckIcon className="h-4 w-4" />}
      </span>
    </button>
  );
}

// Separator
function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />;
}

// Shortcut
function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-gray-400", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};