import React from "react";
import styles from "./InputField.module.scss";

const InputField: React.FC<{
  type?: "text" | "password";
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      className={`${styles["input"]} ${
        value !== "" ? styles["not-empty"] : ""
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputField;
