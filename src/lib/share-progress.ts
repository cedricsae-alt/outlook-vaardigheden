import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SHARE_SECTIONS = [
  { id: "start", label: "Start", short: "Start" },
  { id: "niveaus", label: "Delen vs machtigen", short: "Niveaus" },
  { id: "stappen", label: "Stappen in Outlook", short: "Stappen" },
  { id: "situaties", label: "Studentensituaties", short: "Situaties" },
  { id: "valkuilen", label: "Valkuilen", short: "Valkuilen" },
  { id: "checklist", label: "Checklist", short: "Check" },
  { id: "quiz", label: "Toets jezelf", short: "Toets" },
] as const;

export type ShareSectionId = (typeof SHARE_SECTIONS)[number]["id"];

type ShareProgressState = {
  visited: Record<string, boolean>;
  checks: Record<string, boolean>;
  quiz: Record<string, number | null>;
  markVisited: (id: ShareSectionId) => void;
  toggleCheck: (id: string) => void;
  setQuiz: (id: string, choice: number) => void;
  reset: () => void;
};

export const useShareProgress = create<ShareProgressState>()(
  persist(
    (set, get) => ({
      visited: { start: true },
      checks: {},
      quiz: {},
      markVisited: (id) => set({ visited: { ...get().visited, [id]: true } }),
      toggleCheck: (id) =>
        set({
          checks: { ...get().checks, [id]: !get().checks[id] },
        }),
      setQuiz: (id, choice) => set({ quiz: { ...get().quiz, [id]: choice } }),
      reset: () =>
        set({
          visited: { start: true },
          checks: {},
          quiz: {},
        }),
    }),
    { name: "outlook-gids-share-v1", skipHydration: true },
  ),
);
