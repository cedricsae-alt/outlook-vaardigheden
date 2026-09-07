import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type QuizItem = {
  id: string;
  question: string;
  choices: readonly string[];
  answer: number;
  why: string;
};

type QuizProps = {
  items?: readonly QuizItem[];
  answers?: Record<string, number | null>;
  setAnswer?: (id: string, choice: number) => void;
  onReset?: () => void;
};

export function Quiz({ items, answers, setAnswer, onReset }: QuizProps) {
  const storeAnswers = useProgress((s) => s.quiz);
  const storeSet = useProgress((s) => s.setQuiz);
  const storeReset = useProgress((s) => s.reset);

  const list = items ?? QUIZ;
  const pickedMap = answers ?? storeAnswers;
  const choose = setAnswer ?? storeSet;
  const reset = onReset ?? storeReset;

  const answered = list.filter((q) => pickedMap[q.id] != null).length;
  const correct = list.filter((q) => pickedMap[q.id] === q.answer).length;
  const complete = answered === list.length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-muted">
          {complete
            ? `${correct} van ${list.length} juist`
            : `${answered} van ${list.length} beantwoord`}
        </p>
        {complete && (
          <div
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium",
              correct >= 5
                ? "bg-success-soft text-success"
                : "bg-warn-soft text-warn",
            )}
          >
            {correct >= 5
              ? "Je mag dit in het echt doen."
              : "Lees de uitleg en probeer de missers opnieuw."}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {list.map((q, i) => {
          const picked = pickedMap[q.id];
          const revealed = picked != null;
          return (
            <article
              key={q.id}
              className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
            >
              <p className="text-xs font-medium tracking-wide text-subtle uppercase">
                Vraag {i + 1}
              </p>
              <h3 className="mt-1 font-display text-lg font-medium leading-snug text-fg">
                {q.question}
              </h3>
              <div className="mt-4 space-y-2">
                {q.choices.map((choice, idx) => {
                  const isPicked = picked === idx;
                  const isRight = idx === q.answer;
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => choose(q.id, idx)}
                      className={cn(
                        "flex min-h-12 w-full items-start gap-3 rounded-md px-3 py-3 text-left text-sm leading-snug shadow-[var(--shadow-border)] transition-colors duration-150",
                        !revealed && "bg-surface hover:bg-bg-warm",
                        revealed && isRight && "bg-success-soft text-success",
                        revealed &&
                          isPicked &&
                          !isRight &&
                          "bg-danger-soft text-danger",
                        revealed &&
                          !isPicked &&
                          !isRight &&
                          "bg-surface text-muted",
                      )}
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
                        {revealed && isRight ? (
                          <Check className="size-4" />
                        ) : revealed && isPicked ? (
                          <X className="size-4" />
                        ) : (
                          <span className="size-3.5 rounded-full ring-1 ring-border" />
                        )}
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {q.why}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {complete && (
        <Button type="button" variant="secondary" onClick={() => reset()}>
          <RotateCcw className="size-4" />
          Hele handleiding opnieuw
        </Button>
      )}
    </div>
  );
}
