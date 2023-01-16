import React from "react";
import { useApp } from "../context/Appcontext";
import Alert from "./Alert";

function Navbar() {
  const { slowStatus, errorStatus } = useApp();
  return (
    <div>
      {slowStatus && <Alert message="Slow network connection" />}
      {errorStatus && <Alert message="An error occurred while fetching data" />}
    </div>
  );
}

export default Navbar;
