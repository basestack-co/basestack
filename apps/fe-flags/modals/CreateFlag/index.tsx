import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import Portal from "design-system/global/Portal";
import { useDispatch, useSelector } from "react-redux";
import { getIsCreateFlagModalOpen } from "store/selectors/modals";
import { AppDispatch } from "store";
import { setCreateFlagModalOpen } from "store/slices/modals";
import { Tabs, Text, Switch, Modal, InputGroup } from "design-system";
import { Environments } from "./styles";

const CreateFlagModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(getIsCreateFlagModalOpen);
  const [textareaLength, setTextareaLength] = useState("");

  const onClose = useCallback(() => {
    dispatch(setCreateFlagModalOpen(false));
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
        title="Create Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Create", onClick: () => console.log("create") },
        ]}
      >
        <Tabs
          items={[{ text: "Core" }, { text: "Advanced" }]}
          onSelect={(tab) => console.log(tab)}
          mb={theme.spacing.s6}
        />
        <InputGroup
          title="Feature Key"
          inputProps={{
            onChange: (text) => console.log("text = ", text),
            placeholder: "E.g. header_size",
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
            placeholder: "Flag description",
            maxlength: "120",
          }}
          mb={theme.spacing.s6}
        />
        <Text
          fontWeight={500}
          mb={theme.spacing.s2}
          data-testid="input-group-title"
          size="small"
        >
          Enabled Environments
        </Text>
        <Environments>
          <Switch
            py={theme.spacing.s2}
            mr={theme.spacing.s5}
            text="Development:"
            checked
            onChange={() => console.log("")}
          />
          <Switch
            py={theme.spacing.s2}
            mr={theme.spacing.s5}
            text="Staging:"
            checked={false}
            onChange={() => console.log("")}
          />
          <Switch
            py={theme.spacing.s2}
            mr={theme.spacing.s5}
            text="Production:"
            checked={false}
            onChange={() => console.log("")}
          />
        </Environments>
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
