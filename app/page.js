import HomeView from "../components/site/HomeView";
import { homeData } from "../lib/homeData";
import { siteCopy } from "../lib/siteCopy";

export const metadata = {
  title: siteCopy("en").metaTitle,
  description: siteCopy("en").metaDescription
};

export default function HomePage() {
  return <HomeView data={homeData()} />;
}
