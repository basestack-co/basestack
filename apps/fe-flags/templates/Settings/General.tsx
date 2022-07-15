import React from "react";
import { Input, SettingCard } from "@basestack/design-system";
import { CardList, CardListItem } from "./styles";

const General = () => {
  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Team name"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          button="Save"
          onClick={() => console.log("save")}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <Input
            maxWidth={400}
            onChange={() => console.log("change")}
            placeholder="Team name"
          />
        </SettingCard>
      </CardListItem>
      <CardListItem>
        <SettingCard
          title="Project name"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          button="Save"
          onClick={() => console.log("save")}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <Input
            maxWidth={400}
            onChange={() => console.log("change")}
            placeholder="Project name"
          />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default General;
