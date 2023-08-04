import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Avatar from "..";

describe("Avatar tests", () => {
  afterEach(cleanup);

  test("render Avatar correctly", () => {
    const { asFragment } = renderWithTheme(<Avatar alt="avatar" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Avatar with user name initials", () => {
    const { asFragment } = renderWithTheme(
      <Avatar userName="Flávio Amaral" alt="user_avatar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render squared Avatar", () => {
    const { asFragment } = renderWithTheme(
      <Avatar userName="Flávio Amaral" alt="user_avatar" round={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render large Avatar", () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="large" alt="avatar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render medium Avatar", () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="medium" alt="avatar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render small Avatar", () => {
    const { asFragment } = renderWithTheme(
      <Avatar size="small" alt="avatar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
