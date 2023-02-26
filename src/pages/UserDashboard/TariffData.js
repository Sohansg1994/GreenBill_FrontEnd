import React from "react";
import Dashboard from "./components/Dashboard";
import TariffDataTable from "./components/TarifficDataTable";
import withRoot from "D:/Proffession/ReactJs/GreenBill_FrontEnd/src/pages/modules/withRoot.js";

function TarifficData() {
  return (
    <React.Fragment>
      <Dashboard />
      <TariffDataTable />
    </React.Fragment>
  );
}

export default withRoot(TarifficData);
