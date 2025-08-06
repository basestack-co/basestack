// React
import { Fragment } from "react";
// Globals
import ConfirmModal from "./Confirm";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";
// Services
import CreateProjectModal from "./Project/Create";
import AddProjectMemberModal from "./Project/AddMember";

const Modals = () => {
  return (
    <Fragment>
      <ConfirmModal />
      <CreateTeamModal />
      <ManageTeamModal />
      <CreateProjectModal />
      <AddProjectMemberModal />
    </Fragment>
  );
};

export default Modals;
