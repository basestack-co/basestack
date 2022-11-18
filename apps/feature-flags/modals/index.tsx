import React, { Fragment } from "react";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./Environment/Create";
import EditEnvironmentModal from "./Environment/Edit";
import CreateProjectModal from "./CreateProject";
import FlagModal from "./Flag";

const Modals = () => {
  return (
    <Fragment>
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <EditEnvironmentModal />
      <FlagModal />
    </Fragment>
  );
};

export default Modals;
