//trans
import messagesEN from "./languages/en.json";
//Dates
import dayjs from "dayjs";
import "dayjs/locale/en";

const messages = {
  en: messagesEN,
};
// language without region code
//const language = navigator.language.split(/[-_]/)[0];
const language = "en";

dayjs.locale(language);

export { messages, language };
