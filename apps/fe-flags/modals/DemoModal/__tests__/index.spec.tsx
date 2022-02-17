import React from "react";
import { renderWithAllProviders } from "utils/testUtils";
import configureMockStore from "redux-mock-store";
import DemoModal from "..";

const mockStore = configureMockStore([]);

describe("DemoModal tests", () => {
  test("render DemoModal correctly", () => {
    const { asFragment } = renderWithAllProviders(<DemoModal />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("render DemoModal with Event", () => {
    const storeMock = mockStore({
      modals: { isDemoModalOpen: true },
    });

    const { asFragment } = renderWithAllProviders(
      <div id="portal">
        <DemoModal />
      </div>,
      storeMock
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
