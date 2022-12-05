import React from "react";
// Components
import { Input, SettingCard } from "@basestack/design-system";

const DangerExample = () => {
  return (
    <SettingCard
      title="Danger Example"
      description="Used as an example how the card will look."
      button="Delete"
      onClick={() => console.log("onClick")}
      text="Learn more about Project Name"
      isDisabled={false}
      variant="danger"
    >
      <Input
        maxWidth={400}
        onChange={() => console.log("onChange")}
        onBlur={() => console.log("onBlur")}
        placeholder="Danger example"
        name="name"
        value="value"
        hasError={false}
        isDisabled={false}
      />
    </SettingCard>
  );
};

export default DangerExample;
