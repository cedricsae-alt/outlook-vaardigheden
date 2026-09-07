import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SEARCH_SECTIONS = [
  { id: "start", label: "Start", short: "Start" },
  { id: "begrippen", label: "Zoeken vs filter", short: "Begrip" },
  { id: "oefenen", label: "Oefeninbox", short: "Oefen" },
  { id: "stappen", label: "Stappen in Outlook", short: "Stappen" },
  { id: "operators", label: "Operators", short: "Operators" },
  { id: "situaties", label: "Studentensituaties", short: "Situaties" },
  { id: "valkuilen", label: "Valkuilen", short: "Valkuilen" },
  { id: "checklist", label: "Checklist", short: "Check" },
  { id: "quiz", label: "Toets jezelf", short: "Toets" },
] as const;

export type SearchSectionId = (typeof SEARCH_SECTIONS)[number]["id"];

type SearchProgressState = {
  visited: Record<string, boolean>;
  checks: Record<string, boolean>;
  quiz: Record<string, number | null>;
  mission1: boolean;
  mission2: boolean;
  markVisited: (id: SearchSectionId) => void;
  toggleCheck: (id: string) => void;
  setQuiz: (id: string, choice: number) => void;
  setMission1: () => void;
  setMission2: () => void;
  reset: () => void;
};

export const useSearchProgress = create<SearchProgressState>()(
  persist(
    (set, get) => ({
      visited: { start: true },
      checks: {},
      quiz: {},
      mission1: false,
      mission2: false,
      markVisited: (id) =>
        set({ visited: { ...get().visited, [id]: true } }),
      toggleCheck: (id) =>
        set({
          checks: { ...get().checks, [id]: !get().checks[id] },
        }),
      setQuiz: (id, choice) =>
        set({ quiz: { ...get().quiz, [id]: choice } }),
      setMission1: () => set({ mission1: true }),
      setMission2: () => set({ mission2: true }),
      reset: () =>
        set({
          visited: { start: true },
          checks: {},
          quiz: {},
          mission1: false,
          mission2: false,
        }),
    }),
    { name: "outlook-gids-search-v1", skipHydration: true },
  ),
);
