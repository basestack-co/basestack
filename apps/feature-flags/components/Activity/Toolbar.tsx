import React, { useMemo, useState } from "react";
import { CalendarInput, Input } from "@basestack/design-system";
import dayjs from "dayjs";
import { InputContainer, ToolBar } from "./styles";

interface ToolbarProps {
  selectedDate: Array<Date>;
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (date: Date[]) => void;
}

const Toolbar = ({
  selectedDate,
  searchValue,
  onSearchChange,
  onChangeDate,
}: ToolbarProps) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);

  const selectedRange = useMemo(() => {
    if (selectedDate.length > 0) {
      return `${dayjs(selectedDate[0]).format("DD/MM/YYYY")} - ${dayjs(
        selectedDate[1],
      ).format("DD/MM/YYYY")}`;
    }

    return "";
  }, [selectedDate]);

  return (
    <ToolBar>
      <InputContainer>
        <Input
          size="small"
          width="100%"
          isDarker
          icon="search"
          iconPlacement="left"
          placeholder="Search projects activity"
          onChange={onSearchChange}
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
            placeholder: "dd/mm/yyyy - dd/mm/yyyy",
            name: "date",
            value: selectedRange,
            autoComplete: "off",
          }}
          calendarProps={{
            //@ts-ignore
            onChange: onChangeDate,
            //@ts-ignore
            value: selectedDate,
            locale: "en-US",
            selectRange: true,
          }}
        />
      </InputContainer>
    </ToolBar>
  );
};

export default Toolbar;
