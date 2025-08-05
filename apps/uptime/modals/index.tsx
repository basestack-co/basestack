import { Fragment } from "react";
import ConfirmModal from "./Confirm";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";
// Services
import CreateServiceModal from "./Service/Create";
import AddServiceMemberModal from "./Service/AddMember";

const Modals = () => {
  return (
    <Fragment>
      <ConfirmModal />
      <CreateTeamModal />
      <ManageTeamModal />
      <CreateServiceModal />
      <AddServiceMemberModal />
    </Fragment>
  );
};

export default Modals;
