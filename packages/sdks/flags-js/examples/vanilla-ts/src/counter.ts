// Flags SDK
import { FlagsSDK } from "../../../dist";

const client = new FlagsSDK({
  baseURL: "http://localhost:3000/api/v1",
  projectKey: "cm5qx25c900048onlrh1eloq5",
  environmentKey: "cm5qx25c900068onlvbtk1cdy",
});

async function setupApp() {
  // Preload flags
  await client.init();
}

setupApp();

export async function setupCounter(element: HTMLButtonElement) {
  try {
    const { enabled, payload } = await client.getFlag("count");
    const { text = "count is" } = payload as { text: string };

    let counter = 0;

    const setCounter = (count: number) => {
      counter = count;
      element.innerHTML = !enabled
        ? "Count is not enabled"
        : `${text} ${counter}`;
    };

    if (enabled) {
      element.addEventListener("click", () => {
        setCounter(counter + 1);
      });
    }

    setCounter(0);
  } catch (error) {
    console.error("Failed to fetch flag:", error);
  }
}
