import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { useDispatch, useSelector } from "react-redux";
import { getIsCreateEnvironmentModalOpen } from "store/selectors/modals";
import { AppDispatch } from "store";
import { setCreateEnvironmentModalOpen } from "store/slices/modals";
import { Modal, InputGroup } from "@basestack/design-system";

const CreateEnvironmentModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(getIsCreateEnvironmentModalOpen);
  const [textareaLength, setTextareaLength] = useState("");

  const onClose = useCallback(() => {
    dispatch(setCreateEnvironmentModalOpen(false));
  }, [dispatch]);

  const onChangeTextarea = useCallback(
    (event) => {
      if (textareaLength.length < 120) {
        setTextareaLength(event.target.value.toString());
      }
    },
    [textareaLength]
  );

  return (
    <Portal selector="#portal">
      <Modal
        title="Create New Environment"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Create", onClick: () => console.log("create") },
        ]}
      >
        <InputGroup
          title="Id"
          inputProps={{
            onChange: (text) => console.log("text = ", text),
            placeholder: "E.g. development",
          }}
          hint="No numbers, spaces, or special characters"
          mb={theme.spacing.s6}
        />
        <InputGroup
          title="Description"
          label={`${textareaLength.length} / 120`}
          textarea
          textareaProps={{
            onChange: (event) => onChangeTextarea(event),
            placeholder: "Environment description",
            maxlength: "120",
          }}
        />
      </Modal>
    </Portal>
  );
};

export default CreateEnvironmentModal;
