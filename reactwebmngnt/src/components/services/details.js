import React from "react";

export function ServicesDetail(props) {
  const { services } = props;
  return (
    <div>
      <header>
        <h3>{services.longdescrip}</h3>
      </header>
    </div>
  );
}
