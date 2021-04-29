import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { updateEmailApi } from "../../../Api/user";
import { toast } from "react-toastify";
export default function ChangeEmailFomr(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setloading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      console.log(response);
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el email");
      } else {
        setReloadUser(true);
        toast.success("Actualizado");
        formik.handleReset();
      }
      setloading(false);
      console.log(formData);
    },
  });
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email <span>(Tu email actual es:{user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          ></Form.Input>
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
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
    email: "",
    repeatEmail: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
}
