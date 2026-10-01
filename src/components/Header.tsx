import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { profile } from "@/data/portfolio";

const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#work-experience" },
  { name: "Education", href: "#education" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Résumé", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.slow, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-border/70 bg-background/85 shadow-md"
          : "border-transparent bg-background/60"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          {/* Profile Image + Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-lg lg:text-xl hover:text-primary transition-colors shrink-0"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-accent shadow-lg">
              <img
                src="/mohaimen.jpg"
                alt="Mohaimen Rashid"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(event) => (event.currentTarget.style.display = "none")}
              />
            </div>
            <span className="text-base sm:text-lg lg:text-xl">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-3 lg:gap-5">
            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DUR.base,
                    ease: EASE,
                    delay: DUR.fast + index * STAGGER.tight,
                  }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    onClick={(event) => handleScroll(event, link.href)}
                    className="font-[system-ui] text-sm lg:text-[15px] xl:text-base text-foreground/90 hover:text-primary transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
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
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="rounded-full hover:bg-accent transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                  className="inline-flex"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
