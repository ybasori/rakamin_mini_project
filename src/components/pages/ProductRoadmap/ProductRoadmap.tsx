import React from "react";
import Button from "../../atoms/Button/Button";
import GroupList from "../../organisms/GroupList/GroupList";
import styles from "./ProductRoadmap.module.scss";

const ProductRoadmap: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>Product Roadmap</div>
        <Button variant="primary" onClick={() => null}>
          + Add New Group
        </Button>
      </div>
      <div className={styles["divider"]}></div>
      <div className={styles["body"]}>
        <GroupList />
      </div>
    </div>
  );
};

export default ProductRoadmap;
