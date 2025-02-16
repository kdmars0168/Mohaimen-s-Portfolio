import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/kdmars0168', // Your actual GitHub link
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mohaimenrashid/', // Your actual LinkedIn link
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:marashid0168@gmail.com', // Your actual email
      label: 'Email',
    },
  ];

  return (
    <footer className="bg-accent/5 border-t py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mohaimen Rashid. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
