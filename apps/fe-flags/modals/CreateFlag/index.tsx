import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import {
  Tabs,
  Text,
  Switch,
  Modal,
  InputGroup,
} from "@basestack/design-system";
import { Environments } from "./styles";

interface CreateFlagModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const CreateFlagModal = ({
  isModalOpen,
  onClose,
  onCreate,
}: CreateFlagModalProps) => {
  const theme = useTheme();
  const [textareaLength, setTextareaLength] = useState("");

  const onChangeTextarea = useCallback(
    (event) => {
      if (textareaLength.length < 120) {
        setTextareaLength(event.target.value.toString());
      }
    },
    [textareaLength]
  );

  return (
    <Modal
      title="Create Flag"
      expandMobile
      isOpen={isModalOpen}
      onClose={onClose}
      buttons={[
        { text: "Close", onClick: onClose },
        { text: "Create", onClick: onCreate },
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
  );
};

export default CreateFlagModal;
