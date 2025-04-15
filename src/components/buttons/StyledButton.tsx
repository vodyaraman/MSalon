import React from "react";
import "./StyledButton.scss";

interface StyledButtonProps {
  href: string;
  text: string;
}

const StyledButton = ({ href, text }: StyledButtonProps) => {
  return (
    <a href={href} className="styled-button">
      <span className="button-text">{text}</span>
    </a>
  );
};

export default StyledButton;

