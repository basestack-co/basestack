import { Fragment } from "react";
import ConfirmModal from "./Confirm";
import AddFormMemberModal from "./Form/AddMember"; // Generic
// Forms
import CreateFormModal from "./Form/Create";
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
