import React from "react";
import styles from "./Label.module.scss";

const Label: React.FC<{
  children: React.ReactNode;
  variant: "primary" | "warning" | "danger" | "success";
}> = ({ children, variant }) => {
  return (
    <div className={`${styles["container"]} ${styles[variant]}`}>
      {children}
    </div>
  );
};

export default Label;
