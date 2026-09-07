import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hub } from "@/components/hub";
import { useProgress } from "@/lib/progress";
import { useSearchProgress } from "@/lib/search-progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    void useProgress.persist.rehydrate();
    void useSearchProgress.persist.rehydrate();
  }, []);
  return <Hub />;
}
