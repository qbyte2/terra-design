import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@terra-design/react"

import { cn } from "@/lib/utils"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"

export function NpmComponentPreview({
  component,
  className,
  previewClassName,
  children,
}: {
  component: "button" | "card"
  className?: string
  previewClassName?: string
  children: React.ReactNode
}) {
  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={cn("min-h-52 p-10", previewClassName)}
      styleName="base-nova"
      component={
        component === "button" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        ) : (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Terra Design</CardTitle>
              <CardDescription>
                This card is rendered from @terra-design/react.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Base UI foundations with the Nova visual style.
            </CardContent>
            <CardFooter>
              <Button size="sm">Continue</Button>
            </CardFooter>
          </Card>
        )
      }
      source={children}
      sourcePreview={children}
    />
  )
}
