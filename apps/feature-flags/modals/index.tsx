import React, { Fragment } from "react";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./CreateEnvironment";
import CreateProjectModal from "./CreateProject";
import FlagModal from "./Flag";

const Modals = () => {
  return (
    <Fragment>
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <FlagModal />
    </Fragment>
  );
};

export default Modals;
