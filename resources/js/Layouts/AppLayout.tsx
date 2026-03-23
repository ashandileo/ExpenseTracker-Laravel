import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    Receipt,
    Tags,
    Sun,
    Moon,
    Menu,
    Wallet,
    X,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Expenses", href: "/expenses", icon: Receipt },
    { label: "Categories", href: "/categories", icon: Tags },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
    return (
        <Link
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
        >
            <item.icon className="size-4" />
            {item.label}
        </Link>
    );
}

function SidebarContent({ currentPath }: { currentPath: string }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-2.5 px-4 py-5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Wallet className="size-4" />
                </div>
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    ExpenseTracker
                </h4>
            </div>

            <Separator />

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        item={item}
                        active={currentPath === item.href}
                    />
                ))}
            </nav>

            <div className="px-3 pb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3"
                    onClick={toggleTheme}
                >
                    {theme === "dark" ? (
                        <Sun className="size-4" />
                    ) : (
                        <Moon className="size-4" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
            </div>
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const currentPath = url.split("?")[0];

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r bg-card">
                    <SidebarContent currentPath={currentPath} />
                </aside>
            )}

            {/* Mobile Header */}
            {isMobile && (
                <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b bg-card px-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <SidebarContent currentPath={currentPath} />
                        </SheetContent>
                    </Sheet>
                    <div className="flex items-center gap-2">
                        <Wallet className="size-4" />
                        <small className="text-sm leading-none font-medium">ExpenseTracker</small>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main
                className={`flex-1 ${isMobile ? "pt-14" : "pl-64"}`}
            >
                {children}
            </main>
        </div>
    );
}
