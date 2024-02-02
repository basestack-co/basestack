import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Calendar from "..";

jest.useFakeTimers();

describe("Calendar tests", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2024-01-01").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(cleanup);

  test("render Calendar correctly", () => {
    const { asFragment } = renderWithTheme(<Calendar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
