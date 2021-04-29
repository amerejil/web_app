import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../Api/address";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  const { setshowModal, setreloadAddresses, newAddress, address } = props;
  const [loading, setloading] = useState(false);
  const { auth, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      //createAddress(formData);
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setloading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    console.log(response);
    if (!response) {
      toast.warning("Error al crear la dirección");
      setloading(false);
    } else {
      formik.resetForm();
      setreloadAddresses(true);
      setloading(false);
      setshowModal(false);
    }
  };

  const updateAddress = async (formData) => {
    setloading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = updateAddressApi(address._id, formDataTemp, logout);
    if (!response) {
      toast.warning("Error al actualizar la dirección");
      setloading(false);
    } else {
      formik.resetForm();
      setreloadAddresses(true);
      setloading(false);
      setshowModal(false);
    }
    console.log("Actualizando dirección");
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Título de la dirección"
        placeholder="Título de la dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      ></Form.Input>
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Nombre y apellidos"
          label="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        ></Form.Input>
        <Form.Input
          name="address"
          type="text"
          placeholder="Dirección"
          label="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        ></Form.Input>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        ></Form.Input>
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        ></Form.Input>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Código postal"
          placeholder="Código postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        ></Form.Input>
        <Form.Input
          name="phone"
          type="text"
          label="Número de teléfono"
          placeholder="Número de teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        ></Form.Input>
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear dorección" : "Actualizando dirección"}
        </Button>
      </div>
    </Form>
  );
}
function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}
function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
