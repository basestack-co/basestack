import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import CalendarInput from "..";

describe("CalendarInput tests", () => {
  afterEach(cleanup);

  test("render CalendarInput correctly", () => {
    const { asFragment } = renderWithTheme(
      <CalendarInput
        calendarProps={{ allowPartialRange: false }}
        isCalenderOpen
        inputTitle="Title"
        inputProps={{
          placeholder: "placeholder",
          value: "value",
          name: "name",
          onChange: jest.fn(),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
