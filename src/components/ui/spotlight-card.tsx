import React from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  style,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
