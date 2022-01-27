import React, { useState, useEffect } from "react";
import { apiServices } from "../lookup";
import { ServicesDetail } from "./details";

export function ServicesList(props) {
  const [services, setServices] = useState([]);
  const [hasServices, setHasServices] = useState(false);

  useEffect(() => {
    if (hasServices === false) {
      const handleServicesListLookup = (response, status) => {
        if (status === 200) {
          setServices(response.servicelist);
          setHasServices(true);
        } else {
          alert("There was an error");
        }
      };
      apiServices(handleServicesListLookup);
    }
  }, [services, hasServices]);

  return (
    <React.Fragment>
      {services.map((item, index) => {
        return <ServicesDetail services={item} key={index} />;
      })}
    </React.Fragment>
  );
}
