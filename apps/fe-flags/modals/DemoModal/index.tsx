import React, { useCallback, useMemo } from "react";
// Utils
import Portal from "@basestack/design-system/global/Portal";
// Context
import useModals from "hooks/useModals";
import { setIsDemoModalOpen } from "contexts/modals/actions";
// import dayjs from "dayjs";
// Locales
import { useIntl } from "react-intl";
import { demoMessages as messages } from "locales/messages/app";

const DemoModal = () => {
  const intl = useIntl();
  const {
    dispatch,
    state: { isDemoModalOpen: isModalOpen },
  } = useModals();

  const onClose = useCallback(() => {
    if (isModalOpen) {
      dispatch(setIsDemoModalOpen(false));
    }
  }, [isModalOpen, dispatch]);

  return useMemo(() => {
    if (!isModalOpen) return null;

    return (
      <Portal selector="#portal">
        <div>Demo portal</div>
        <p>intl: {intl.formatMessage(messages.demo)}</p>
        <button onClick={onClose}>Close Modal</button>
      </Portal>
    );
  }, [isModalOpen]);
};

export default DemoModal;
