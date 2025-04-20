"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./button";

type ButtonVariants="default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;

interface TooltipButtonProps {
    tooltipContent: string;
    icon: React.ReactNode;
    onClick?: () => void;
    buttonVariant?: ButtonVariants;
    buttonClassName?: string;
    tooltipDelay?: number;
    disabled?: boolean;
}


const TooltipButton = ({
    tooltipContent,
    icon,
    onClick,
    buttonVariant="ghost",
    buttonClassName="",
    tooltipDelay=0,
    disabled=false
}: TooltipButtonProps) => {
    return (
        <TooltipProvider delayDuration={tooltipDelay}>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        size={"icon"}
                        variant={buttonVariant}
                        className={buttonClassName}
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipButton