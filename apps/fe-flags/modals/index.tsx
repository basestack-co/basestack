import React, { Fragment } from "react";
import DemoModal from "./DemoModal";
import CreateFlagModal from "./CreateFlag";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./CreateEnvironment";
import CreateProjectModal from "./CreateProject";

const Modals = () => {
  return (
    <Fragment>
      <DemoModal />
      <CreateFlagModal />
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
    </Fragment>
  );
};

export default Modals;
