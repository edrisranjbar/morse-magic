import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";
import { SettingsDialog } from "@/components/ui/settings-dialog";
import { cn } from "@/lib/utils";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Convert" },
    { path: "/learn", label: "Learn" },
    { path: "/history", label: "History" }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative size-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="relative size-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-mono text-sm">M</span>
            </div>
          </div>
          <h1 className="text-xl font-semibold">Morse Magic</h1>
        </div>
        <nav className="flex items-center gap-6">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "transition-colors relative py-1",
                isActive(path)
                  ? "text-primary font-medium"
                  : "hover:text-primary/80",
                isActive(path) && "after:absolute after:left-0 after:right-0 after:-bottom-[1.125rem] after:h-0.5 after:bg-primary after:rounded-full"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SettingsDialog />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-transform hover:rotate-90"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
