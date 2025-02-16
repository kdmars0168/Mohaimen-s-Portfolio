import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#work-experience" },
    { name: "Education", href: "#education" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-md">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Profile Image + Name */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl hover:text-primary transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent shadow-lg">
              <img 
                src="/mohaimen.jpg" 
                alt="Mohaimen Rashid"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => (e.currentTarget.style.display = "none")} // Hide if image fails to load
              />
            </div>
            Mohaimen Rashid
          </Link>

          <div className="flex items-center gap-6">
            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-accent hover:scale-105 transition-all duration-300"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
