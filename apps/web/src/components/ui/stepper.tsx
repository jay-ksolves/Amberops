"use client"

import * as React from "react"
import { Check, Loader } from "lucide-react"

import { cn } from "@amberops/lib"
import { Button } from "./button"

type StepperContextValue = {
  activeStep: number
  orientation: "horizontal" | "vertical"
  isLastStep: (step: number) => boolean
  isStepActive: (step: number) => boolean
  isStepCompleted: (step: number) => boolean
  isStepDisabled: (step: number) => boolean
  isLoading: (step: number) => boolean
}

const StepperContext = React.createContext<StepperContextValue>(
  {} as StepperContextValue
)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepperContext must be used within a <Stepper />")
  }
  return context
}

type UseStepper = {
  initialStep: number
  steps?: {
    label?: React.ReactNode
    description?: React.ReactNode
  }[]
}

function useStepper({ initialStep }: UseStepper) {
  const [activeStep, setActiveStep] = React.useState(initialStep)

  const nextStep = React.useCallback(() => {
    setActiveStep((prev) => prev + 1)
  }, [])

  const prevStep = React.useCallback(() => {
    setActiveStep((prev) => prev - 1)
  }, [])

  const setStep = React.useCallback((step: number) => {
    setActiveStep(step)
  }, [])

  return { activeStep, nextStep, prevStep, setStep }
}

const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    activeStep: number
    orientation?: "horizontal" | "vertical"
  }
>(
  (
    {
      children,
      className,
      activeStep,
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    const steps = React.Children.toArray(children)
    const totalSteps = steps.length

    const isLastStep = (step: number) => step === totalSteps - 1
    const isStepActive = (step: number) => step === activeStep
    const isStepCompleted = (step: number) => step < activeStep
    const isStepDisabled = (step: number) => step > activeStep
    const isLoading = (step: number) => step === activeStep

    const contextValue = React.useMemo<StepperContextValue>(
      () => ({
        activeStep,
        orientation,
        isLastStep,
        isStepActive,
        isStepCompleted,
        isStepDisabled,
        isLoading,
      }),
      [activeStep, orientation]
    )

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex w-full flex-col gap-4",
            orientation === "horizontal" && "flex-row items-center",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = "Stepper"

const StepperItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    step: number
  }
>(({ children, className, step, ...props }, ref) => {
  const { isLastStep, orientation } = useStepperContext()
  const hasSeparator = !isLastStep(step)

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-center gap-4",
        orientation === "horizontal" && "flex-col justify-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          orientation === "vertical" && "w-full"
        )}
      >
        {children}
      </div>
      {hasSeparator && orientation === "vertical" && <StepperSeparator />}
    </div>
  )
})
StepperItem.displayName = "StepperItem"

const StepperTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn(
        "flex items-center gap-x-2 rounded-full p-2 ps-2",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
})
StepperTrigger.displayName = "StepperTrigger"

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex size-6 items-center justify-center rounded-full text-sm font-medium ring-1 ring-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
StepperIndicator.displayName = "StepperIndicator"

const StepperNumber = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn(className)} {...props}>
      {children}
    </span>
  )
})
StepperNumber.displayName = "StepperNumber"

const StepperLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})
StepperLabel.displayName = "StepperLabel"

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useStepperContext()

  return (
    <div
      ref={ref}
      className={cn(
        "bg-border",
        orientation === "horizontal"
          ? "h-px w-full flex-1"
          : "h-full w-px",
        className
      )}
      {...props}
    />
  )
})
StepperSeparator.displayName = "StepperSeparator"

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    step: number
  }
>(({ children, className, step, ...props }, ref) => {
  const { activeStep } = useStepperContext()

  if (activeStep !== step) {
    return null
  }
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
})
StepperContent.displayName = "StepperContent"

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperNumber,
  StepperLabel,
  StepperSeparator,
  StepperContent,
  useStepper,
}
