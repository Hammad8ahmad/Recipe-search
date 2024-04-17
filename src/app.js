import React, { useEffect, useState } from "react";
import "./app.css";
import Interface from "./interface";
import Items from "./items";
import { fetching } from "./fetchData";

function App() {
  return (
    <React.Fragment>
      <Interface></Interface>
    </React.Fragment>
  );
}

export default App;
