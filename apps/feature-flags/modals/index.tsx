import React, { Fragment } from "react";
import InviteMemberModal from "./InviteMember";
import CreateEnvironmentModal from "./Environment/Create";
import UpdateEnvironmentModal from "./Environment/Update";
import CreateProjectModal from "./CreateProject";
import FlagModal from "./Flag";

const Modals = () => {
  return (
    <Fragment>
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <UpdateEnvironmentModal />
      <FlagModal />
    </Fragment>
  );
};

export default Modals;
