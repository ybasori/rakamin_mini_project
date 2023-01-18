import React from "react";
import styles from "./TextField.module.scss";

const TextField: React.FC<{
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className={`${styles["input"]} ${
        value !== "" ? styles["not-empty"] : ""
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;
