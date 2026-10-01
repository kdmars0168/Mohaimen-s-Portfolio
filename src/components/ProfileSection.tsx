import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowDown, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { profile, proof } from "@/data/portfolio";
import { DUR, EASE, STAGGER, springSoft } from "@/lib/motion";

const rotatingRoles = profile.roles.split("·").map((role) => role.trim());

const socialLinks = [
  {
    icon: Linkedin,
    href: profile.links.find((link) => link.label === "LinkedIn")?.href ?? "#",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: profile.links.find((link) => link.label === "GitHub")?.href ?? "#",
    label: "GitHub",
  },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export const ProfileSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 260, damping: 30, mass: 0.9 });
  const rotateY = useSpring(rotateYValue, { stiffness: 260, damping: 30, mass: 0.9 });

  useEffect(() => {
    const timer = window.setInterval(
      () => setRoleIndex((previous) => (previous + 1) % rotatingRoles.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const handleTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !tiltRef.current) return;
    const bounds = tiltRef.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateYValue.set(px * 10);
    rotateXValue.set(-py * 10);
  };

  const resetTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="flex justify-center md:justify-end"
          style={{ perspective: 900 }}
        >
          <motion.div
            ref={tiltRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ rotateX, rotateY }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent shadow-lift hover:shadow-lift transition-shadow"
          >
            <img
              src="/mohaimen.jpg"
              alt="Portrait of Mohaimen Rashid"
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.base } } }}
          className="text-left"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            {profile.name}
          </motion.h1>

          <div className="h-8 mb-4" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={rotatingRoles[roleIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="text-xl text-primary font-semibold"
              >
                {rotatingRoles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="text-lg text-muted-foreground mb-4 max-w-prose"
          >
            {profile.lede}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="text-sm text-muted-foreground mb-8"
          >
            {profile.subline}
            <span className="block mt-1 text-foreground/80">{profile.availability}</span>
          </motion.p>

          <motion.dl
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="grid grid-cols-3 gap-4 mb-8 max-w-md"
          >
            {proof.map((item) => (
              <div key={item.label} className="border-l-2 border-border pl-3">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-2xl font-bold text-primary leading-none">{item.value}</dd>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="flex flex-wrap items-center gap-6 mb-8"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={springSoft}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Résumé
            </Button>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              See the work
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
