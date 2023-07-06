import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Hero from "..";

describe("Hero tests", () => {
  afterEach(cleanup);

  test("renders the title, text, and buttons", () => {
    const title = "Welcome to my app";
    const text = "Discover the power of my app";

    const { getByText } = renderWithTheme(<Hero title={title} text={text} />);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText("Get Started")).toBeInTheDocument();
    expect(getByText("Talk To Sales")).toBeInTheDocument();
  });

  test("renders the image if provided", () => {
    const title = "Welcome to my app";
    const text = "Discover the power of my app";
    const image = {
      src: "image.jpg",
      alt: "An illustration of a hero image",
    };

    const { getByAltText } = renderWithTheme(
      <Hero title={title} text={text} image={image} />,
    );

    expect(getByAltText(image.alt)).toBeInTheDocument();
  });
});
