import React, { useState, useCallback } from "react";
import { useTheme } from "styled-components";
import dayjs from "dayjs";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text, Input, CalendarInput } from "@basestack/design-system";
import ActivityList from "./ActivityList";
import { Container, InputContainer, ToolBar } from "./styles";

const Activity = () => {
  const theme = useTheme();
  const { t } = useTranslation("profile");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);

  const onChangeDate = useCallback(() => {
    console.log("change date");
  }, []);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Activity
      </Text>

      <ToolBar>
        <InputContainer>
          <Input
            size="small"
            width="100%"
            isDarker
            icon="search"
            iconPlacement="left"
            placeholder="Search projects activity"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            name="search"
            value={searchValue}
          />
        </InputContainer>
        <InputContainer>
          <CalendarInput
            width="100%"
            isCalenderOpen={isCalenderOpen}
            onClickAway={() => setIsCalenderOpen(false)}
            inputProps={{
              icon: "date_range",
              iconPlacement: "left",
              isDarker: true,
              onFocus: () => setIsCalenderOpen(true),
              onChange: () => null,
              placeholder: "12/15/2009",
              name: "date",
              value: dayjs(new Date()).format("DD/MM/YYYY"),
              autoComplete: "off",
            }}
            calendarProps={{
              onChange: onChangeDate,
              value: dayjs(new Date()).format("DD/MM/YYYY"),
              locale: "en-US",
              minDate: new Date(),
            }}
          />
        </InputContainer>
      </ToolBar>
      <ActivityList />
    </Container>
  );
};

export default Activity;
