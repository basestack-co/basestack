import React, { Fragment } from "react";
// Project
import CreateProjectModal from "./Project/Create";
import AddProjectMemberModal from "./Project/AddMember";
// Flag
import CreateFlagModal from "./Flag/Create";
import UpdateFlagModal from "./Flag/Update";
// Environment
import CreateEnvironmentModal from "./Environment/Create";
import UpdateEnvironmentModal from "./Environment/Update";
// Confirm
import ConfirmModal from "./Confirm";
// SDK Integration
import IntegrationModal from "./Integration";
// Activity
import ActivityModal from "./Activity";
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
