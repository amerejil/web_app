import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { getMeaApi } from "../../Api/user";
import ChangeNameForm from "../../components/Account/ChangeNameForm";
import ChangeEmailForm from "../../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../../components/Account/ChangePasswordForm";
import BasicModal from "../../components/Modal/BasicModal";
import { Icon } from "semantic-ui-react";
import AddressForm from "../../components/Account/AddressForm";
import ListAddress from "../../components/Account/ListAddress";
import useUser from "../../hooks/useUser";
import Header from "../../components/header/Header";
import useCategories from "../../hooks/useCategories";
export default function perfil() {
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const { categorias } = useCategories();
  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }
  return (
    <div>
      <Header categorias={categorias}></Header>
      <Configuracion
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      ></Configuracion>
      <Addresses></Addresses>
    </div>
  );
}
function Configuracion(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account_configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        ></ChangeNameForm>
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        ></ChangeEmailForm>
        <ChangePasswordForm user={user} logout={logout}></ChangePasswordForm>
      </div>
    </div>
  );
}
function Addresses() {
  const [showModal, setshowModal] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [formModal, setformModal] = useState(null);
  const [reloadAddresses, setreloadAddresses] = useState(false);

  const openModal = (title, address) => {
    settitleModal(title);
    setformModal(
      <AddressForm
        setreloadAddresses={setreloadAddresses}
        setshowModal={setshowModal}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setshowModal(true);
  };
  return (
    <div className="account_addresses">
      <div className="title">
        Direcciones
        <Icon
          name="plus"
          link
          onClick={() => openModal("Nueva dirección")}
        ></Icon>
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setreloadAddresses={setreloadAddresses}
          openModal={openModal}
        ></ListAddress>
      </div>
      <BasicModal show={showModal} setShow={setshowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
