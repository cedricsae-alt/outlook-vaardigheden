import { createFileRoute } from "@tanstack/react-router";
import { ShareGuide } from "@/components/share-guide";

export const Route = createFileRoute("/delen")({ component: DelenPage });

function DelenPage() {
  return <ShareGuide />;
}