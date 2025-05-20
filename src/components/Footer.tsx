import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by{" "}
          <a
            href="https://en.edrisranjbar.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Edris Ranjbar
          </a>
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://en.edrisranjbar.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Globe className="size-5" />
              <span className="sr-only">Website</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/edrisranjbar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
