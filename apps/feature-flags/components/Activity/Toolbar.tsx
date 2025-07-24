import React, { useMemo, useState } from "react";
// Locales
import { useTranslations } from "next-intl";
// Components
import { CalendarInput, Input } from "@basestack/design-system";
// Utils
import dayjs from "dayjs";
// Styles
import { InputContainer, ToolBar } from "./styles";

interface ToolbarProps {
  selectedDate: Array<Date>;
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (date: Date[]) => void;
  onClearCalendar?: () => void;
  showCalendarClearButton?: boolean;
}

const Toolbar = ({
  selectedDate,
  searchValue,
  onSearchChange,
  onChangeDate,
  showCalendarClearButton = false,
  onClearCalendar,
}: ToolbarProps) => {
  const t = useTranslations("modal");
  const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);

  const selectedRange = useMemo(() => {
    if (selectedDate.length === 2) {
      setIsCalenderOpen(false);
    }

    if (selectedDate.length > 0) {
      return `${dayjs(selectedDate[0]).format("DD/MM/YYYY")} - ${dayjs(
        selectedDate[1],
      ).format("DD/MM/YYYY")}`;
    }

    return "";
  }, [selectedDate, setIsCalenderOpen]);

  return (
    <ToolBar>
      <InputContainer>
        <Input
          size="small"
          width="100%"
          icon="search"
          iconPlacement="left"
          placeholder={t("activity.toolbar.search.placeholder")}
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
          showClearButton={showCalendarClearButton}
          onClear={onClearCalendar}
          inputProps={{
            icon: "date_range",
            iconPlacement: "left",
            onFocus: () => setIsCalenderOpen(true),
            onChange: () => null,
            placeholder: t("activity.toolbar.calendar.placeholder"),
            name: "date",
            value: selectedRange,
            autoComplete: "off",
          }}
          calendarProps={{
            // @ts-expect-error
            onChange: onChangeDate,
            // @ts-expect-error
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
