const FlagsJS = require("..").default;

const sdk = new FlagsJS({
  apiUrl: "http://localhost:3000/api/v1",
  projectKey: "clgml5hr200g068xkieuefn27",
  envKey: "clgml5hr300g268xkmw5blg36",
});

const main = async () => {
  console.log("------ INIT ------");
  console.log("isInitialized 1 = ", sdk.isInitialized);
  await sdk.initialize();
  console.log("isInitialized 2 = ", sdk.isInitialized);
  console.log("----------------------------------");

  console.log("------ Flags from the Store ------");
  console.log("flags = ", sdk.flags());
  console.log("flag X Success = ", sdk.flag("demo2_23"));
  console.log("flag X Empty = ", sdk.flag("demo2_23XX"));
  console.log("----------------------------------");

  console.log("------ Flags from the Server ------");
  console.log("flags = ", await sdk.flagsAsync());
  console.log("flag X Success = ", await sdk.flagAsync("demo2_23"));
  console.log("flag X Empty = ", await sdk.flagAsync("demo2_23XX"));
  console.log("----------------------------------");
};

main();
