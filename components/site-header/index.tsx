import React from "react";
import { cn } from "../../utils";

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b bg-background",
                className
            )}
            {...props}
        >
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <a href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold">DeepDanci</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <a
                            href="/docs"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Docs
                        </a>
                        <a
                            href="https://github.com/yourusername/deepdanci-ui"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
} 