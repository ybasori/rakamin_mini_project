import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAuth } from "../../../domain/auth/auth.reducer";
import { AppDispatch, RootState } from "../../../store";
import Button from "../../atoms/Button/Button";
import Modal from "../../atoms/Modal/Modal";
import CreateGroup from "../../molecules/CreateGroup/CreateGroup";
import Login from "../../molecules/Login/Login";
import GroupList from "../../organisms/GroupList/GroupList";
import styles from "./ProductRoadmap.module.scss";

const ProductRoadmap: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.auth);
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles["title"]}>Product Roadmap</div>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            + Add New Group
          </Button>
          <Button onClick={() => dispatch(resetAuth())}>Logout</Button>
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
      {authStore.data === null && (
        <Modal onClose={() => null}>
          <Login />
        </Modal>
      )}
    </>
  );
};

export default ProductRoadmap;
