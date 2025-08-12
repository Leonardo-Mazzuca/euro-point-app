import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from "react";
import { TextInput, View } from "react-native";
import { cn } from "@/lib/utils";

export type InputProps = {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  variant?: "default" | "line" | "outline"
  wrapperClasses? : string
} & ComponentPropsWithoutRef<typeof TextInput>;

const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, prefixIcon, suffixIcon, variant = "default", wrapperClasses,...props }, ref) => {

    const classes = cn(
      variant === "line" && "border-b border-gray-400",
      variant === "default" && "web:flex h-10 native:h-12 w-full dark:bg-zinc-800 rounded-md border-input bg-zinc-200 px-4 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0",
      variant === "outline" && "border rounded-lg bg-transparent dark:border-zinc-500 border-gray-300"
    )

    return (
      <View className={cn("relative w-full justify-center", wrapperClasses)}>
        {prefixIcon && (
          <View className="absolute right-3 z-10">{prefixIcon}</View>
        )}
        {suffixIcon && (
          <View className="absolute left-3 z-10">{suffixIcon}</View>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "dark:text-gray-300 dark:placeholder:text-gray-300 ps-3",
            classes,
            prefixIcon && "pr-12",
            suffixIcon && "ps-12",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className,
          )}
          placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
