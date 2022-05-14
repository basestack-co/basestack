import React from "react";
import { Modal, InputGroup } from "../../../molecules";
import { useTheme } from "styled-components";
import { Text, Switch } from "../../../atoms";
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
      <InputGroup
        title="Feature Key"
        inputProps={{
          onChange: (text) => console.log("text = ", text),
          placeholder: "E.g. header_size",
        }}
        hint="No numbers, spaces, or special characters"
        mb={theme.spacing.s5}
      />
      <InputGroup
        title="Description"
        label="0 / 120"
        textarea
        textareaProps={{
          onChange: (text) => console.log("text = ", text),
          placeholder: "Flag description",
        }}
        mb={theme.spacing.s5}
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
