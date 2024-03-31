import React, { Fragment } from "react";
// Modals
import CreateFormModal from "./Form/Create";
import ConfirmModal from "./Confirm";

const Modals = () => {
  return (
    <Fragment>
      <CreateFormModal />
      <ConfirmModal />
    </Fragment>
  );
};

export default Modals;
