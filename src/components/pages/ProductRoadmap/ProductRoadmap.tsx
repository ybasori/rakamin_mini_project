import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import Modal from "../../atoms/Modal/Modal";
import CreateGroup from "../../molecules/CreateGroup/CreateGroup";
import GroupList from "../../organisms/GroupList/GroupList";
import styles from "./ProductRoadmap.module.scss";

const ProductRoadmap: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles["title"]}>Product Roadmap</div>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            + Add New Group
          </Button>
        </div>
        <div className={styles["divider"]}></div>
        <div className={styles["body"]}>
          <GroupList />
        </div>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateGroup onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default ProductRoadmap;
