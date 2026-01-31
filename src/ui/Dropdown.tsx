"use client"

import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface DropdownItem {
    label?: string
    onClick?: () => void
    icon?: React.ReactNode
    shortcut?: string
    variant?: "default" | "destructive"
    disabled?: boolean
    separator?: boolean
    className?: string
    children?: React.ReactNode
}

interface DropdownProps {
    trigger: React.ReactNode
    items: DropdownItem[]
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
    className?: string
    contentClassName?: string
    triggerClassName?: string
}

export const Dropdown = ({
    trigger,
    items,
    align = "end",
    side = "bottom",
    sideOffset = 4,
    className,
    contentClassName,
    triggerClassName,
}: DropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className={triggerClassName}
            >
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className={cn(contentClassName, className)}
            >
                {items.map((item, index) => {
                    if (item.separator) {
                        return <DropdownMenuSeparator key={`separator-${index}`} />
                    }

                    if (!item.onClick && !item.children) {
                        return null
                    }

                    return (
                        <DropdownMenuItem
                            key={item.label || `item-${index}`}
                            onClick={item.onClick}
                            disabled={item.disabled}
                            variant={item.variant}
                            className={item.className}
                        >
                            {item.icon && (
                                <span className="flex items-center justify-center">
                                    {item.icon}
                                </span>
                            )}
                            {item.children || (item.label && <span>{item.label}</span>)}
                            {item.shortcut && (
                                <DropdownMenuShortcut>
                                    {item.shortcut}
                                </DropdownMenuShortcut>
                            )}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}