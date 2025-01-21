import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'

const calloutVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-50 [&>svg]:text-blue-500",
        success: "border-green-200 bg-green-50 text-green-900 dark:border-green-200/30 dark:bg-green-900/30 dark:text-green-50 [&>svg]:text-green-500",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-900/30 dark:text-yellow-50 [&>svg]:text-yellow-500",
        error: "border-red-200 bg-red-50 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-50 [&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
}

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, title, children, ...props }, ref) => {
    const Icon = icons[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </div>
        <div className="text-sm [&_p]:leading-relaxed">{children}</div>
      </div>
    )
  }
)
Callout.displayName = "Callout"

export { Callout, calloutVariants }

