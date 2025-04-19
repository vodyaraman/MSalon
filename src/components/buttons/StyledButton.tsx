import React from "react";
import "./StyledButton.scss";

interface StyledButtonProps {
  href: string;
  text: string;
  className?: string;
}

const StyledButton = ({ href, text, className = '' }: StyledButtonProps) => {
  return (
    <a href={href} className={`styled-button ${className}`}>
      <span className="button-text">{text}</span>
    </a>
  );
};

export default StyledButton;

