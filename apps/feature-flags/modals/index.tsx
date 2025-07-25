import { Fragment } from "react";
// Activity
import ActivityModal from "./Activity";
// Confirm
import ConfirmModal from "./Confirm";
// Environment
import CreateEnvironmentModal from "./Environment/Create";
import UpdateEnvironmentModal from "./Environment/Update";
// Flag
import CreateFlagModal from "./Flag/Create";
import UpdateFlagModal from "./Flag/Update";
// SDK Integration
import IntegrationModal from "./Integration";
import AddProjectMemberModal from "./Project/AddMember";
// Project
import CreateProjectModal from "./Project/Create";
// Teams
import CreateTeamModal from "./Team/Create";
import ManageTeamModal from "./Team/Manage";

const Modals = () => {
  return (
    <Fragment>
      <AddProjectMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <UpdateEnvironmentModal />
      <CreateFlagModal />
      <UpdateFlagModal />
      <ConfirmModal />
      <IntegrationModal />
      <ActivityModal />
      <CreateTeamModal />
      <ManageTeamModal />
    </Fragment>
  );
};

export default Modals;
