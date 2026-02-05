import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

type IconifyIconData = {
  body: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
};

type Size = number | string;

type IconifyProps = {
  icon: IconifyIconData | string;
  className?: string;
  title?: string;
  size?: Size;
  width?: Size;
  height?: Size;
} & Omit<
  React.SVGProps<SVGSVGElement>,
  "dangerouslySetInnerHTML" | "children" | "onLoad"
>;

// SSR destekli Iconify component
export function Iconify({
  icon,
  className,
  title,
  size,
  width,
  height,
  ...props
}: IconifyProps) {
  // STRING ICON - @iconify/react kullanarak API'den yükle
  if (typeof icon === "string") {
    const computedWidth = width ?? size ?? 24;
    const computedHeight = height ?? size ?? 24;

    return (
      <Icon
        icon={icon}
        width={computedWidth}
        height={computedHeight}
        className={cn("shrink-0", className)}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      />
    );
  }

  // INLINE ICON DATA
  const viewBoxWidth = icon.width ?? 24;
  const viewBoxHeight = icon.height ?? 24;
  const left = icon.left ?? 0;
  const top = icon.top ?? 0;

  const computedWidth = width ?? size ?? viewBoxWidth;
  const computedHeight = height ?? size ?? viewBoxHeight;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${left} ${top} ${viewBoxWidth} ${viewBoxHeight}`}
      width={computedWidth}
      height={computedHeight}
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g dangerouslySetInnerHTML={{ __html: icon.body }} />
    </svg>
  );
}
