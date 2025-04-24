import * as React from "react";
import { cn } from "../utils";

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                className
            )}
            {...props}
        >
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            DeepDanci
                        </span>
                    </a>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <a
                            href="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            文档
                        </a>
                        <a
                            href="/components"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            组件
                        </a>
                        <a
                            href="/examples"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            示例
                        </a>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="hidden lg:flex">
                            <nav className="flex items-center">
                                <a
                                    href="https://github.com/bookmarkbao/deepdanci-ui"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 