"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
    const context = React.useContext(DialogContext);

    if (!context) {
        throw new Error("Dialog components must be used inside <Dialog>");
    }

    return context;
}

interface DialogProps {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

function Dialog({
    children,
    open,
    defaultOpen = false,
    onOpenChange,
}: DialogProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const isControlled = open !== undefined;

    const currentOpen = isControlled ? open : internalOpen;

    const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
        const next =
            typeof value === "function" ? value(currentOpen) : value;

        if (!isControlled) {
            setInternalOpen(next);
        }

        onOpenChange?.(next);
    };

    return (
        <DialogContext.Provider
            value={{
                open: currentOpen,
                setOpen,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
}

interface TriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const DialogTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
    ({ onClick, ...props }, ref) => {
        const { setOpen } = useDialog();

        return (
            <button
                ref={ref}
                {...props}
                onClick={(e) => {
                    onClick?.(e);
                    setOpen(true);
                }}
            />
        );
    }
);

DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    if (typeof window === "undefined") return null;

    return createPortal(children, document.body);
};

interface OverlayProps
    extends React.HTMLAttributes<HTMLDivElement> { }

const DialogOverlay = React.forwardRef<HTMLDivElement, OverlayProps>(
    ({ className, ...props }, ref) => {
        const { open, setOpen } = useDialog();

        if (!open) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                    className
                )}
                onClick={() => setOpen(false)}
                {...props}
            />
        );
    }
);

DialogOverlay.displayName = "DialogOverlay";

interface ContentProps
    extends React.HTMLAttributes<HTMLDivElement> { }

const DialogContent = React.forwardRef<HTMLDivElement, ContentProps>(
    ({ className, children, ...props }, ref) => {
        const { open, setOpen } = useDialog();

        React.useEffect(() => {
            if (!open) return;

            const handleKey = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setOpen(false);
                }
            };

            document.addEventListener("keydown", handleKey);

            return () =>
                document.removeEventListener("keydown", handleKey);
        }, [open, setOpen]);

        if (!open) return null;

        return (
            <DialogPortal>
                <DialogOverlay />

                <div
                    ref={ref}
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl",
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                >
                    {children}

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 rounded-md p-1 hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </DialogPortal>
        );
    }
);

DialogContent.displayName = "DialogContent";

interface CloseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const DialogClose = React.forwardRef<HTMLButtonElement, CloseProps>(
    ({ onClick, children, ...props }, ref) => {
        const { setOpen } = useDialog();

        return (
            <button
                ref={ref}
                {...props}
                onClick={(e) => {
                    onClick?.(e);
                    setOpen(false);
                }}
            >
                {children}
            </button>
        );
    }
);

DialogClose.displayName = "DialogClose";

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogClose,
};