import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function Auth(props) {
  const { onCloseModal, settitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);
  const showLoginForm = () => {
    settitleModal("Iniciar Sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    settitleModal("Crear Nuevo Usuario");
    setShowLogin(false);
  };
  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    ></LoginForm>
  ) : (
    <RegisterForm showLoginForm={showLoginForm}></RegisterForm>
  );
}
