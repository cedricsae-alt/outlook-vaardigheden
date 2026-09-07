import { createFileRoute } from "@tanstack/react-router";
import { SearchGuide } from "@/components/search-guide";

export const Route = createFileRoute("/zoeken")({ component: ZoekenPage });

function ZoekenPage() {
  return <SearchGuide />;
}
