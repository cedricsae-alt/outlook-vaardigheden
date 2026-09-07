import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SECTIONS = [
  { id: "start", label: "Start", short: "Start" },
  { id: "begrippen", label: "Begrippen", short: "Begrip" },
  { id: "oefenen", label: "Oefenagenda", short: "Oefen" },
  { id: "stappen", label: "Stappen in Outlook", short: "Stappen" },
  { id: "patronen", label: "Herhaalpatronen", short: "Patronen" },
  { id: "wijzigen", label: "Wijzigen & schrappen", short: "Wijzig" },
  { id: "situaties", label: "Studentensituaties", short: "Situaties" },
  { id: "valkuilen", label: "Valkuilen", short: "Valkuilen" },
  { id: "checklist", label: "Checklist", short: "Check" },
  { id: "quiz", label: "Toets jezelf", short: "Toets" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

type ProgressState = {
  visited: Record<string, boolean>;
  checks: Record<string, boolean>;
  quiz: Record<string, number | null>;
  simulatorComplete: boolean;
  exceptionComplete: boolean;
  markVisited: (id: SectionId) => void;
  toggleCheck: (id: string) => void;
  setQuiz: (id: string, choice: number) => void;
  setSimulatorComplete: () => void;
  setExceptionComplete: () => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      visited: { start: true },
      checks: {},
      quiz: {},
      simulatorComplete: false,
      exceptionComplete: false,
      markVisited: (id) =>
        set({ visited: { ...get().visited, [id]: true } }),
      toggleCheck: (id) =>
        set({
          checks: { ...get().checks, [id]: !get().checks[id] },
        }),
      setQuiz: (id, choice) =>
        set({ quiz: { ...get().quiz, [id]: choice } }),
      setSimulatorComplete: () => set({ simulatorComplete: true }),
      setExceptionComplete: () => set({ exceptionComplete: true }),
      reset: () =>
        set({
          visited: { start: true },
          checks: {},
          quiz: {},
          simulatorComplete: false,
          exceptionComplete: false,
        }),
    }),
    { name: "reeks-progress-v1", skipHydration: true },
  ),
);
