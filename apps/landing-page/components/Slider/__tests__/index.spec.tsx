import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Slider from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("Slider tests", () => {
  afterEach(cleanup);

  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const slides = [
    {
      icon: "person",
      title: "User traits",
      text: "MoonFlags makes it easy to create and manage feature toggles across web, mobile, and server-side applications.",
      image: {
        src: "https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "product demo",
      },
    },
    {
      icon: "send",
      title: "Staged feature rollouts",
      text: "MoonFlags makes it easy to create and manage feature toggles across web, mobile, and server-side applications.",
      image: {
        src: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "product demo",
      },
    },
    {
      icon: "history",
      title: "Track Changes",
      text: "MoonFlags makes it easy to create and manage feature toggles across web, mobile, and server-side applications.",
      image: {
        src: "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "product demo",
      },
    },
  ];

  test("should render Slider correctly", () => {
    const { asFragment } = renderWithTheme(
      <Slider
        title="Release with Confidence"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        data={slides}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
