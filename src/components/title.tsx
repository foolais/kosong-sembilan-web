import { Globe } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { WebData } from "@/lib/data";

const titleVariants = cva("flex items-center gap-2 font-bold text-foreground", {
  variants: {
    size: {
      sm: "text-lg",
      default: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Title({
  className,
  size,
  ...props
}: React.ComponentProps<"h1"> & VariantProps<typeof titleVariants>) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-full bg-secondary">
        <Globe className="size-4 text-foreground" />
      </div>
      <h1
        data-slot="title"
        data-size={size}
        className={cn(titleVariants({ size, className }))}
        {...props}
      >
        {WebData.title}
      </h1>
    </div>
  );
}

export { Title };
