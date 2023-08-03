// Utils
import {
  DOCS_SDKS_JS_URL,
  DOCS_SDKS_REST_URL,
  DOCS_SDKS_REACT_URL,
} from "utils/helpers/constants";

export const javascriptCode = `
import FlagsJS from "@basestack/flags-js-sdk";
 
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
import { useFlag } from "@basestack/flags-react-sdk";
 
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
## Get Flag By Slug/Name
curl "https://your-basestack-hosted-app-domain.com/api/v1/flags/:slug" \\
     -H 'x-project-key: xxxx-xxxx-xxxx' \\
     -H 'x-environment-key: xxxx-xxxx-xxxx'
 `;

const data = [
  {
    id: "javascript",
    text: "Javascript",
    href: DOCS_SDKS_JS_URL,
    code: javascriptCode,
  },
  { id: "react", text: "React", href: DOCS_SDKS_REACT_URL, code: reactCode },
  { id: "rest", text: "Rest API", href: DOCS_SDKS_REST_URL, code: restCode },
];

export default data;
