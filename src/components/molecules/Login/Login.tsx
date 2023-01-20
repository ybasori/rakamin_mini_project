import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, postRegister } from "../../../domain/auth/auth.thunk";
import { AppDispatch, RootState } from "../../../store";
import { resetAuth, resetRegister } from "../../../domain/auth/auth.reducer";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.auth);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    password_confirmation: "",
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(postRegister({ ...form, ...registerForm }));
    } else {
      dispatch(postLogin(form));
    }
  };

  useEffect(() => {
    if (authStore.errorAuth) {
      dispatch(resetAuth());
      alert("fail");
    }
  }, [authStore.errorAuth, dispatch]);

  useEffect(() => {
    if (authStore.errorRegister) {
      dispatch(resetRegister());
      setForm({
        email: "",
        password: "",
      });
      setRegisterForm({
        name: "",
        password_confirmation: "",
      });
      alert("fail");
    }
    if (authStore.register) {
      dispatch(resetRegister());
      setForm({
        email: "",
        password: "",
      });
      setRegisterForm({
        name: "",
        password_confirmation: "",
      });
      setIsRegister(false);
      alert("success");
    }
  }, [authStore.errorRegister, authStore.register, dispatch]);

  return (
    <form className={styles["container"]} onSubmit={onSubmit}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>
          {isRegister ? "Register" : "Login"}
        </div>
      </div>
      <div className={styles["body"]}>
        {isRegister && (
          <div className={styles["group"]}>
            <div className={`${styles["row"]} ${styles["label"]}`}>Name</div>
            <div className={styles["row"]}>
              <InputField
                placeholder="Name"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    name: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
        )}
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>E-mail</div>
          <div className={styles["row"]}>
            <InputField
              placeholder="E-mail"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>Password</div>
          <div className={styles["row"]}>
            <InputField
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.currentTarget.value })
              }
            />
          </div>
        </div>
        {isRegister && (
          <div className={styles["group"]}>
            <div className={`${styles["row"]} ${styles["label"]}`}>
              Password Confirmation
            </div>
            <div className={styles["row"]}>
              <InputField
                type="password"
                placeholder="Password"
                value={registerForm.password_confirmation}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    password_confirmation: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          {isRegister ? (
            <Button onClick={() => setIsRegister(false)}>Login</Button>
          ) : (
            <Button onClick={() => setIsRegister(true)}>Register</Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disable={authStore.isLoadingAuth}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
