import React, { Fragment } from "react";
// Project
import CreateProjectModal from "./Project/Create";
// Flag
import CreateFlagModal from "./Flag/Create";
import UpdateFlagModal from "./Flag/Update";
// Environment
import CreateEnvironmentModal from "./Environment/Create";
import UpdateEnvironmentModal from "./Environment/Update";
// Settings
import InviteMemberModal from "./Member/Invite";
// Confirm
import ConfirmModal from "./Confirm";

const Modals = () => {
  return (
    <Fragment>
      <InviteMemberModal />
      <CreateEnvironmentModal />
      <CreateProjectModal />
      <UpdateEnvironmentModal />
      <CreateFlagModal />
      <UpdateFlagModal />
      <ConfirmModal />
    </Fragment>
  );
};

export default Modals;
