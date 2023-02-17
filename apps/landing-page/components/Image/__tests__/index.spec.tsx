import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/testUtils";
import Image from "..";

describe("Image tests", () => {
  afterEach(cleanup);

  test("renders image with src and alt", () => {
    const src = "image-src";
    const alt = "image-alt";
    const { getByAltText } = renderWithTheme(<Image src={src} alt={alt} />);

    const image = getByAltText(alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", src);
  });
});
