import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "utils/helpers/testUtils";
import Image from "..";

jest.mock("@basestack/hooks", () => ({
  ...jest.requireActual("@basestack/hooks"),
  useMediaQuery: jest.fn(() => false),
}));

describe("Image tests", () => {
  afterEach(cleanup);

  test("should render image with src and alt", () => {
    const src = "image-src";
    const alt = "image-alt";
    const { getByAltText } = renderWithTheme(<Image src={src} alt={alt} />);

    const image = getByAltText(alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", src);
  });
});
