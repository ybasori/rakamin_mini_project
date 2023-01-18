import React from "react";
import GroupTask from "../GroupTask/GroupTask";
import styles from "./GroupList.module.scss";

const GroupList: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <GroupTask variant="primary" />
      <GroupTask variant="warning" />
      <GroupTask variant="danger" />
      <GroupTask variant="success" />
      <GroupTask variant="success" />
      <GroupTask variant="success" />
    </div>
  );
};

export default GroupList;
