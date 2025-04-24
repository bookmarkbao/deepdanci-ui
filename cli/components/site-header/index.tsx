import React from "react";

// 使用相对路径引用cn函数
// 这个函数将被复制到用户项目中
function cn(...inputs: any[]): string {
    try {
        const clsx = require('clsx');
        const { twMerge } = require('tailwind-merge');
        return twMerge(clsx(inputs));
    } catch (e) {
        return inputs
            .filter(Boolean)
            .join(' ')
            .trim()
            .replace(/\s+/g, ' ');
    }
}

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
                            href="https://github.com/bookmarkbao/deepdanci-ui"
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