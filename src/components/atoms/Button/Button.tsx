import React from "react";
import styles from "./Button.module.scss";

const Button: React.FC<{
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  variant?: "default" | "primary" | "danger";
}> = ({ children, onClick, variant = "default" }) => {
  return (
    <div className={`${styles["button"]} ${styles[variant]}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
