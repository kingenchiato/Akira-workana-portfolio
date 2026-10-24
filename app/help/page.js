import Placeholder from "../../components/Placeholder";
import { pages } from "../../lib/content";

export const metadata = { title: pages.help.title };

export default function Page() {
  return <Placeholder {...pages.help} />;
}
