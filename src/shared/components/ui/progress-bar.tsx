import { cn } from "@/shared/utils/cn"
import * as React from "react"


export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-2 bg-secondary overflow-hidden rounded-full", className)}
        {...props}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
        />
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }

