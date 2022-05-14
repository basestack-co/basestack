import React from "react";
import { Text } from "../../../atoms";
import { Modal } from "../../../molecules";

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
  return (
    <Modal
      title="Create Flag"
      isOpen={isModalOpen}
      onClose={onClose}
      buttons={[
        { text: "Close", onClick: onClose },
        { text: "Create", onClick: onCreate },
      ]}
    >
      <Text size="small">Coisas linda aqui dentro</Text>
    </Modal>
  );
};

export default CreateFlagModal;
