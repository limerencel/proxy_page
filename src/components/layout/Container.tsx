import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(
      "container relative",
      "mx-auto px-4",
      "max-w-[90%]",
      "sm:max-w-[540px]",
      "md:max-w-[720px]",
      "lg:max-w-[900px]",
      "xl:max-w-[1000px]",
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  );
}