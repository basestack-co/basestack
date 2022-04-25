import React, { useCallback, useMemo } from "react";
// Store
import { batch, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setDemoModalOpen } from "store/slices/modals";
// Utils
import Portal from "design-system/global/Portal";
// import dayjs from "dayjs";
// Locales
import { useIntl } from "react-intl";
import { demoMessages as messages } from "locales/messages/app";

const DemoModal = () => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(
    (store: RootState) => store.modals.isDemoModalOpen
  );

  const onClose = useCallback(() => {
    if (isModalOpen) {
      batch(() => {
        dispatch(setDemoModalOpen(false));
      });
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
