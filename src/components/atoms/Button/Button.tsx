import React from "react";
import styles from "./Button.module.scss";

const Button: React.FC<{
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  variant?: "default" | "primary" | "danger";
  disable?: boolean;
}> = ({ children, onClick, variant = "default", disable = false }) => {
  return (
    <div
      className={`${styles["button"]} ${styles[variant]}`}
      onClick={disable ? () => null : onClick}
    >
      {children}
    </div>
  );
};

export default Button;
