import React from "react";
import styles from "./InputField.module.scss";

const InputField: React.FC<{
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ value, onChange, placeholder }) => {
  return (
    <input
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
