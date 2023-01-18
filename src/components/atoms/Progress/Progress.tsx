import React from "react";
import styles from "./Progress.module.scss";
import checklist from "../../../assets/images/checklist.png";

const Progress: React.FC<{ number: number }> = ({ number }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["bg-progress"]}>
        <div
          className={`${styles["progress"]} ${
            number === 100 ? styles["complete"] : ""
          }`}
          style={{ width: `${number * (10 / 9)}%` }}
        ></div>
      </div>
      <div className={styles["number"]}>
        {number === 100 ? (
          <img
            className={styles["checklist"]}
            src={checklist}
            loading="lazy"
            alt=""
          />
        ) : (
          <>{number}%</>
        )}
      </div>
    </div>
  );
};

export default Progress;
