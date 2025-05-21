import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

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
          <Link to="/" className="hover:text-primary transition-colors">
            Convert
          </Link>
          <Link to="/learn" className="hover:text-primary transition-colors">
            Learn
          </Link>
          <Link to="/history" className="hover:text-primary transition-colors">
            History
          </Link>
        </nav>
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
    </header>
  );
};

export default Header;
