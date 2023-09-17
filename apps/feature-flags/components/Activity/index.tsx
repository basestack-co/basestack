import React, { useState, useCallback } from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text } from "@basestack/design-system";
import ActivityList from "./ActivityList";
import Toolbar from "./Toolbar";
import { Container } from "./styles";

const Activity = () => {
  const theme = useTheme();
  const { t } = useTranslation("profile");

  const [selectedDate, setSelectedDate] = useState<Array<Date>>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const onChangeDate = useCallback((value: Date[]) => {
    setSelectedDate(value);
  }, []);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Activity
      </Text>
      <Toolbar
        searchValue={searchValue}
        selectedDate={selectedDate}
        onSearchChange={(event) => setSearchValue(event.target.value)}
        onChangeDate={onChangeDate}
      />
      <ActivityList />
    </Container>
  );
};

export default Activity;
