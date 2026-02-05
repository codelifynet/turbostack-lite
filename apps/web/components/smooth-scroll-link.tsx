"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode, MouseEvent } from "react";

interface SmoothScrollLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function SmoothScrollLink({
  href,
  children,
  className,
  offset = 100,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Only handle anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const headerHeight = offset;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      // Call custom onClick if provided
      if (onClick) {
        onClick(e);
      }
    } else {
      // For non-anchor links, call custom onClick if provided
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
