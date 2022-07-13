import React, { Fragment } from "react";
import DemoModal from "./DemoModal";
import CreateFlagModal from "./CreateFlag";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./CreateEnvironment";

const Modals = () => {
  return (
    <Fragment>
      <DemoModal />
      <CreateFlagModal />
      <InviteMemberModal />
      <CreateEnvironmentModal />
    </Fragment>
  );
};

export default Modals;
