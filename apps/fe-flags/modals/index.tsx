import React, { Fragment } from "react";
import CreateFlagModal from "./CreateFlag";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./CreateEnvironment";
import CreateProjectModal from "./CreateProject";
import EditFlag from "./EditFlag";

const Modals = () => {
  return (
    <Fragment>
      <CreateFlagModal />
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <EditFlag />
    </Fragment>
  );
};

export default Modals;
