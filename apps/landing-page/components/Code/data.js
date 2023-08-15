// Utils
import { config } from "@basestack/utils";

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

export const reactCode = `
    import { useFlag } from "@basestack/flags-react";
     
    const AppComponent = () => {
      const { enabled } = useFlag("private_msg_2");
     
      return (
        <div>
          {enabled && <div>This is a great feature</div>}
        </div>
      );
    };
`;

export const restCode = `
    # Get Flag By Slug/Name
    curl "https://your-basestack-hosted-app-domain.com/api/v1/flags/:slug" \\
         -H 'x-project-key: xxxx-xxxx-xxxx' \\
         -H 'x-environment-key: xxxx-xxxx-xxxx'
 `;

const data = [
  {
    id: "javascript",
    text: "Javascript",
    href: config.urls.docs.flags.sdk.javascript,
    code: javascriptCode,
  },
  {
    id: "react",
    text: "React",
    href: config.urls.docs.flags.sdk.react,
    code: reactCode,
  },
  {
    id: "rest",
    text: "Rest API",
    href: config.urls.docs.flags.sdk.rest,
    code: restCode,
  },
];

export default data;
