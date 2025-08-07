// React
import { Fragment } from "react";
// Globals
import ConfirmModal from "./Confirm";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";
// Projects
import CreateProjectModal from "./Project/Create";
import AddProjectMemberModal from "./Project/AddMember";
// Monitors
import CreateMonitorModal from "./Monitor/Create";

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
