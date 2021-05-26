import React, { useState, useEffect } from "react";
import { Grid, Button, GridColumn } from "semantic-ui-react";
import { map, size } from "lodash";
import classNames from "classnames";
import Link from "next/link";
import { getAddressesApi } from "../../../Api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping(props) {
  const { setaddress } = props;
  const { auth, logout } = useAuth();
  const [addresses, setaddresses] = useState(null);
  const [addressActive, setaddressActive] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setaddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna direccón creada{" "}
            <Link href="/account/perfil">añadir tu primera direccón</Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setaddressActive={setaddressActive}
                  setaddress={setaddress}
                ></Address>
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
function Address(props) {
  const { address, addressActive, setaddressActive, setaddress } = props;
  const changeAddress = () => {
    setaddressActive(address._id);
    setaddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
