// React
import { Fragment } from "react";
// Globals
import ConfirmModal from "./Confirm";
// Monitors
import CreateMonitorModal from "./Monitor/Create";
import AddProjectMemberModal from "./Project/AddMember";
// Projects
import CreateProjectModal from "./Project/Create";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";

const Modals = () => {
  return (
    <Fragment>
      <ConfirmModal />
      <CreateTeamModal />
      <ManageTeamModal />
      <CreateProjectModal />
      <AddProjectMemberModal />
      <CreateMonitorModal />
    </Fragment>
  );
};

export default Modals;
