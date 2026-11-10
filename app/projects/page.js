import ProjectsView from "../../components/site/ProjectsView";
import { getCatalog } from "../../lib/catalog";

export const metadata = {
  title: "Projects · Araki Hideki",
  description: "Selected systems, applications, sites, games, automation, logos, and case studies by Araki Hideki."
};

export default function ProjectsPage() {
  return <ProjectsView catalog={getCatalog()} />;
}
