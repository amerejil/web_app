import React from "react";
import { Icon } from "semantic-ui-react";
export default function Search() {
  return (
    <div className="search-box">
      <input type="search" placeholder="Buscar"></input>
      <div className="icon">
        <Icon className="search"></Icon>
      </div>
    </div>
  );
}
