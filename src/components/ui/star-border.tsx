import React from "react";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  contentClassName = "",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-flex overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        background: "rgba(255, 214, 120, 0.18)",
        boxShadow: "0 0 0 1px rgba(255, 211, 102, 0.18), 0 12px 24px rgba(136,73,28,0.14)",
        ...(rest as any).style,
      }}
    >
      <div className={`relative z-[1] flex rounded-[inherit] ${contentClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
