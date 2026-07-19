import { Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-12 text-center">
      <div className="mb-4 rounded-full bg-[#E9CC2F]/10 p-4">
        {icon || <Package className="h-8 w-8 text-[#E9CC2F]" />}
      </div>
      <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
      <p className="mt-2 text-sm text-[#6B7280] max-w-sm">{description}</p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="mt-6 bg-[#E9CC2F] text-white hover:bg-[#B69E24]"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
