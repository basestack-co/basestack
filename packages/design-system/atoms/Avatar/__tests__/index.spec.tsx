import { rem } from "polished";
import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Avatar from "..";

describe("Avatar Atom tests", () => {
  afterEach(cleanup);

  test("render Avatar correctly", () => {
    const { asFragment, getByTestId } = renderWithTheme(
      <Avatar alt="avatar" />
    );
    const avatar = getByTestId("avatar");

    expect(avatar).toHaveStyle(`border-radius: 50%`);
    expect(avatar).toHaveStyle(`overflow: hidden`);
    expect(avatar).toHaveStyle(`flex-shrink: 0`);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render Avatar with user name initials", () => {
    const { asFragment } = renderWithTheme(
      <Avatar userName="Flávio Amaral" alt="user_avatar" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("should render squared Avatar", () => {
    const { getByTestId } = renderWithTheme(
      <Avatar userName="Flávio Amaral" alt="user_avatar" round={false} />
    );
    const avatar = getByTestId("avatar");

    expect(avatar).toHaveStyle(`border-radius: 4px`);
  });

  test("should render large Avatar", () => {
    const { getByTestId } = renderWithTheme(
      <Avatar size="large" alt="avatar" />
    );
    const avatar = getByTestId("avatar");

    expect(avatar).toHaveStyle(`height: ${rem("56px")}`);
    expect(avatar).toHaveStyle(`width: ${rem("56px")}`);
  });

  test("should render medium Avatar", () => {
    const { getByTestId } = renderWithTheme(
      <Avatar size="medium" alt="avatar" />
    );
    const avatar = getByTestId("avatar");

    expect(avatar).toHaveStyle(`height: ${rem("40px")}`);
    expect(avatar).toHaveStyle(`width: ${rem("40px")}`);
  });

  test("should render small Avatar", () => {
    const { getByTestId } = renderWithTheme(
      <Avatar size="small" alt="avatar" />
    );
    const avatar = getByTestId("avatar");

    expect(avatar).toHaveStyle(`height: ${rem("28px")}`);
    expect(avatar).toHaveStyle(`width: ${rem("28px")}`);
  });
});
