import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { updatePasswordApi } from "../../../Api/user";
import { toast } from "react-toastify";
export default function ChangePasswordForm(props) {
  const { user, logout } = props;
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setloading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response) {
        toast.error("Error al actualizar la contraseña");
      } else {
        logout();
      }
      setloading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambiar tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          ></Form.Input>
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Confirma tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          ></Form.Input>
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}
function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
