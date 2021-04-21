import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setloading] = useState(false);
  const { login } = useAuth();

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
      console.log("Email incorrecto");
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setloading(true);
      const response = await loginApi(formData);
      setloading(false);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El email o la contraseña son incorrectos");
      }
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo Electrónico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      ></Form.Input>
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      ></Form.Input>
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}
function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}
function validationSchema() {
  return {
    identifier: Yup.string().email().required(true),
    password: Yup.string().required(true),
  };
}
