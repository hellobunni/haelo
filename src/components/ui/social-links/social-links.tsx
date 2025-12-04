import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  social: {
    github?: string;
    x?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  variant?: "light" | "dark";
  className?: string;
}

export default function SocialLinks({
  social,
  variant = "light",
  className,
}: SocialLinksProps) {
  const isDark = variant === "dark";

  const baseButtonClasses = cn(
    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors group",
    isDark
      ? "bg-gray-800 hover:bg-periwinkle-500 border border-gray-700 hover:border-periwinkle-500"
      : "bg-gray-100 hover:bg-jordy-blue",
    className,
  );

  const iconClasses = cn(
    "w-5 h-5 transition-colors",
    isDark
      ? "text-gray-400 group-hover:text-white"
      : "text-gray-600 group-hover:text-white",
  );

  return (
    <div className="flex items-center gap-3">
      {social.github && (
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="GitHub"
        >
          <Github className={iconClasses} />
        </a>
      )}
      {social.x && (
        <a
          href={social.x}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="X (Twitter)"
        >
          <Twitter className={iconClasses} />
        </a>
      )}
      {social.linkedin && (
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="LinkedIn"
        >
          <Linkedin className={iconClasses} />
        </a>
      )}
      {social.instagram && (
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="Instagram"
        >
          <Instagram className={iconClasses} />
        </a>
      )}
      {social.facebook && (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="Facebook"
        >
          <Facebook className={iconClasses} />
        </a>
      )}
      {social.youtube && (
        <a
          href={social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={baseButtonClasses}
          aria-label="YouTube"
        >
          <Youtube className={iconClasses} />
        </a>
      )}
    </div>
  );
}
