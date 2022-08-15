import React, { Fragment } from "react";
import DemoModal from "./DemoModal";
import CreateFlagModal from "./CreateFlag";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./CreateEnvironment";
import CreateProjectModal from "./CreateProject";
import EditFlag from "./EditFlag";

const Modals = () => {
  return (
    <Fragment>
      <DemoModal />
      <CreateFlagModal />
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <EditFlag />
    </Fragment>
  );
};

export default Modals;
