import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { profile, resume } from '@/data/portfolio';

export const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: profile.links.find((link) => link.label === 'GitHub')?.href ?? '#',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: profile.links.find((link) => link.label === 'LinkedIn')?.href ?? '#',
      label: 'LinkedIn',
    },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: FileText, href: resume.file, label: 'Résumé (PDF)' },
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
