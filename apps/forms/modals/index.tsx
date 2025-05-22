import React, { Fragment } from "react";
// Forms
import CreateFormModal from "./Form/Create";
import AddFormMemberModal from "./Form/AddMember"; // Generic
import ConfirmModal from "./Confirm";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";

const Modals = () => {
  return (
    <Fragment>
      <CreateFormModal />
      <AddFormMemberModal />
      <ConfirmModal />
      <CreateTeamModal />
      <ManageTeamModal />
    </Fragment>
  );
};

export default Modals;
