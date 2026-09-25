"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { Tabs } from "@/registry/new-york-v4/ui/tabs"

function hasTabValue(children: React.ReactNode, value: string): boolean {
  return React.Children.toArray(children).some((child) => {
    if (
      !React.isValidElement<{ children?: React.ReactNode; value?: string }>(
        child
      )
    ) {
      return false
    }

    return (
      child.props.value === value || hasTabValue(child.props.children, value)
    )
  })
}

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig()

  const installationType = React.useMemo(() => {
    const selectedType = config.installationType || "cli"

    return selectedType === "npm" && !hasTabValue(children, "npm")
      ? "cli"
      : selectedType
  }, [children, config.installationType])

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) =>
        setConfig({
          ...config,
          installationType: value as "cli" | "manual" | "npm",
        })
      }
      className="relative mt-6 w-full *:data-[slot=tabs-list]:gap-6"
    >
      {children}
    </Tabs>
  )
}
