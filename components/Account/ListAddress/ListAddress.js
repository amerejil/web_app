import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { getAddressesApi, deleteAddressApi } from "../../../Api/address";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";

export default function ListAddress(props) {
  const { reloadAddresses, setreloadAddresses, openModal } = props;
  const [addresses, setaddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setaddresses(response || []);
      setreloadAddresses(false);
    })();
  }, [reloadAddresses]);
  if (!addresses) return null;
  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay direcciones creadas</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setreloadAddresses={setreloadAddresses}
                openModal={openModal}
              ></Address>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, logout, setreloadAddresses, openModal } = props;
  const [loadingDelete, setloadingDelete] = useState(false);
  const deleteAddress = async () => {
    setloadingDelete(true);
    const responsse = await deleteAddressApi(address._id, logout);
    setloadingDelete(false);
    if (responsse) {
      setreloadAddresses(true);
    }
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
