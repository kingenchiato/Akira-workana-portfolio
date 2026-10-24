import Placeholder from "../../components/Placeholder";
import { pages } from "../../lib/content";

export const metadata = { title: pages.voices.title };

export default function Page() {
  return <Placeholder {...pages.voices} />;
}
