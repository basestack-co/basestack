import React from "react";
import { cleanup } from "@testing-library/react";
import "jest-styled-components";
import { renderWithTheme } from "../../../utils/testUtils";
import Avatar from "..";

describe("Avatar Atom tests", () => {
  afterEach(cleanup);

  test("render Avatar with default props", () => {
    const { asFragment } = renderWithTheme(
      <Avatar
        src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="user_avatar"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render Avatar with user name initials", () => {
    const { asFragment } = renderWithTheme(
      <Avatar userName="Flávio Amaral" alt="user_avatar" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
