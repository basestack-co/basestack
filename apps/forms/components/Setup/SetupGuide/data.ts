export const data = [
  {
    id: "html",
    text: "HTML",
  },
  {
    id: "javascript",
    text: "Javascript",
  },
  {
    id: "react",
    text: "React",
  },
  {
    id: "vue",
    text: "Vue",
  },
  {
    id: "rest",
    text: "Rest API",
  },
];

export const javascriptCode = `
  import FlagsJS from "@basestack/flags-js";
   
  const sdk = new FlagsJS({
    apiUrl: "https://your-basestack-hosted-app-domain.com/api/v1",
    projectKey: "xxxxx",
    envKey: "xxxxx",
  });
  
  const MyFeature = async () => {
    try {
      const flag = await sdk.flagAsync("header");
      //flag.enabled true | false
      //  ...code
    } catch (e) {
      throw e;
    }
  };
 `;
