import { Fragment } from "react";
import ConfirmModal from "./Confirm";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";

const Modals = () => {
  return (
    <Fragment>
      <ConfirmModal />
      <CreateTeamModal />
      <ManageTeamModal />
    </Fragment>
  );
};

export default Modals;
