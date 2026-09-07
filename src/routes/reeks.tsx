import { createFileRoute } from "@tanstack/react-router";
import { GuideApp } from "@/components/guide-app";

export const Route = createFileRoute("/reeks")({ component: ReeksPage });

function ReeksPage() {
  return <GuideApp />;
}
