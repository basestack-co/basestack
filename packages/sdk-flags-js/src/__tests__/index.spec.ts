import FlagsJS from "..";
// Mocks
import { paramsMock, flagsMock, flagMock } from "../mocks/flags";

jest.mock("../index.ts", () => {
  return function () {
    return {
      flags: () => flagsMock,
      flag: (slug: string) =>
        slug === "flag"
          ? flagMock
          : {
              enabled: false,
              error: true,
              message: `Flag with name ${slug} does not exist`,
            },
    };
  };
});

const up = new FlagsJS(paramsMock);

describe("FlagsJS features tests", () => {
  it("Get All Flag", async () => {
    const flags = await up.flags();

    expect(flags).toEqual(flagsMock);

    // expect(flags).toEqual(flagsMock);
  });

  it("Get Feature Flag by Id", async () => {
    const flag = await up.flag("flag");

    expect(flag).toEqual(flagMock);

    expect(flag).toHaveProperty("enabled", true);
    expect(flag).toHaveProperty("slug", "flag");
  });

  it("Should return the default values if a flag does not exist", async () => {
    const flag = await up.flag("does_not_exist");

    expect(flag).toHaveProperty("enabled", false);
    expect(flag).toHaveProperty("error", true);
    expect(flag).toHaveProperty(
      "message",
      "Flag with name does_not_exist does not exist"
    );
  });
});
