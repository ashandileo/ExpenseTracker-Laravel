import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LayoutDashboard,
    Receipt,
    Tags,
    Sun,
    Moon,
    Menu,
    Wallet,
    LogOut,
    X,
} from "lucide-react";

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    [key: string]: unknown;
}

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

function UserDropdown({ user }: { user: AuthUser }) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Avatar className="size-7">
                        <AvatarFallback className="text-xs">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user.name}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.post("/logout")}
                    className="cursor-pointer"
                >
                    <LogOut className="size-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function SidebarContent({
    currentPath,
    user,
}: {
    currentPath: string;
    user: AuthUser | null;
}) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-5">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Wallet className="size-4" />
                    </div>
                    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                        ExpenseTracker
                    </h4>
                </div>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={toggleTheme}
                >
                    {theme === "dark" ? (
                        <Sun className="size-4" />
                    ) : (
                        <Moon className="size-4" />
                    )}
                </Button>
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

            {user && (
                <div className="px-3 pb-4">
                    <UserDropdown user={user} />
                </div>
            )}
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage<PageProps>();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const currentPath = url.split("?")[0];
    const user = props.auth.user ?? {
        id: 1,
        name: "Ashandi Leonadi",
        email: "ashandi@example.com",
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r bg-card">
                    <SidebarContent currentPath={currentPath} user={user} />
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
                            <SidebarContent currentPath={currentPath} user={user} />
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
