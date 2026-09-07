import { useEffect, useState } from "react";
import {
  AlertTriangle,
  AppWindow,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Eye,
  Laptop,
  Monitor,
  Pencil,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/quiz";
import {
  PLATFORM_SHARE_STEPS,
  SHARE_CHECKLIST,
  SHARE_PERMISSIONS,
  SHARE_PITFALLS,
  SHARE_QUIZ,
  SHARE_SCENARIOS,
} from "@/data/share-content";
import {
  SHARE_SECTIONS,
  useShareProgress,
  type ShareSectionId,
} from "@/lib/share-progress";
import { cn } from "@/lib/utils";

export function ShareGuide() {
  const [active, setActive] = useState<ShareSectionId>("start");
  const markVisited = useShareProgress((s) => s.markVisited);
  const visited = useShareProgress((s) => s.visited);
  const checks = useShareProgress((s) => s.checks);
  const quiz = useShareProgress((s) => s.quiz);

  useEffect(() => {
    void useShareProgress.persist.rehydrate();
  }, []);

  useEffect(() => {
    markVisited(active);
  }, [active, markVisited]);

  const checkedCount = SHARE_CHECKLIST.filter((c) => checks[c.id]).length;
  const quizDone = Object.keys(quiz).length;

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg"
      >
        Naar inhoud
      </a>
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-fg no-underline">
            <span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-fg">
              <Share2 className="size-4" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-medium leading-none text-fg">
                Delen
              </p>
              <p className="mt-1 text-xs text-muted">Outlook-gids · BM1</p>
            </div>
          </Link>
          <p className="hidden text-sm text-muted sm:block">10 minuten</p>
        </div>
      </header>

      <div className="mx-auto grid min-w-0 max-w-6xl lg:grid-cols-[16.5rem_minmax(0,1fr)]">
        <nav
          aria-label="Hoofdstukken"
          className="sticky top-0 z-20 min-w-0 overflow-x-hidden border-b border-border bg-bg/95 lg:h-dvh lg:overflow-y-auto lg:border-r lg:border-b-0"
        >
          <div className="flex gap-1 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-0.5 lg:px-4 lg:py-6">
            {SHARE_SECTIONS.map((s) => {
              const isActive = active === s.id;
              const done =
                Boolean(visited[s.id]) &&
                (s.id !== "checklist" ||
                  checkedCount === SHARE_CHECKLIST.length) &&
                (s.id !== "quiz" || quizDone === SHARE_QUIZ.length);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-left text-sm whitespace-nowrap transition-colors duration-150 lg:h-10 lg:w-full",
                    isActive
                      ? "bg-primary text-primary-fg"
                      : "text-muted hover:bg-bg-warm hover:text-fg",
                  )}
                >
                  <span className="hidden lg:flex">
                    {done && !isActive ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                  </span>
                  <span className="lg:hidden">{s.short}</span>
                  <span className="hidden lg:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <main
          id="inhoud"
          className="min-w-0 overflow-x-hidden px-4 py-8 sm:px-8 sm:py-10"
        >
          {active === "start" && <Start onNext={() => setActive("niveaus")} />}
          {active === "niveaus" && (
            <Niveaus onNext={() => setActive("stappen")} />
          )}
          {active === "stappen" && (
            <Stappen onNext={() => setActive("situaties")} />
          )}
          {active === "situaties" && (
            <Situaties onNext={() => setActive("valkuilen")} />
          )}
          {active === "valkuilen" && (
            <Valkuilen onNext={() => setActive("checklist")} />
          )}
          {active === "checklist" && (
            <Checklist onNext={() => setActive("quiz")} />
          )}
          {active === "quiz" && <Toets />}
        </main>
      </div>
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="stagger-in mb-8 max-w-2xl">
      <p className="text-xs font-medium tracking-wide text-primary uppercase">
        {kicker}
      </p>
      <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">{lead}</p>
    </header>
  );
}

function NextButton({
  onNext,
  children,
}: {
  onNext: () => void;
  children: string;
}) {
  return (
    <div className="mt-10">
      <Button type="button" size="lg" onClick={onNext}>
        {children}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

function Start({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Handleiding"
        title="Je agenda delen en machtigen, zonder per ongeluk je privéleven te tonen."
        lead="Voor 1ste bachelor Bedrijfsmanagement. In tien minuten leer je het verschil tussen delen en machtigen, welk permissieniveau je kiest, en hoe je toegang weer intrekt."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Eye,
            title: "Kan bekijken",
            body: "Anderen zien je afspraken, maar wijzigen niets. Voor groepsgenoten die alleen je planning willen zien.",
          },
          {
            icon: Pencil,
            title: "Kan bewerken",
            body: "Anderen voegen toe, wijzigen en verwijderen afspraken. Voor wie samen een agenda beheert.",
          },
          {
            icon: ShieldCheck,
            title: "Gemachtigde",
            body: "Iemand handelt namens jou — accepteert uitnodigingen, beheert soms ook je mail. Alleen voor vertrouwde personen.",
          },
        ].map((card) => (
          <article
            key={card.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <card.icon className="size-5 text-primary" aria-hidden />
            <h2 className="mt-3 font-display text-lg font-medium">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {card.body}
            </p>
          </article>
        ))}
      </div>
      <NextButton onNext={onNext}>Eerst de niveaus</NextButton>
    </div>
  );
}

function Niveaus({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Delen vs machtigen"
        title="Delen laat zien. Machtigen laat handelen."
        lead="Delen geeft leestoegang of bewerkrechten op je agenda. Een gemachtigde gaat verder: die doet dingen in jouw naam."
      />
      <div className="overflow-x-auto rounded-lg shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-surface-2 text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Niveau</th>
              <th className="px-4 py-3 font-medium">Toegang</th>
              <th className="px-4 py-3 font-medium">Wijzigen</th>
              <th className="px-4 py-3 font-medium">Namens jou</th>
              <th className="px-4 py-3 font-medium">Gebruik voor</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {SHARE_PERMISSIONS.map((p) => (
              <tr key={p.name} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.access}</td>
                <td className="px-4 py-3 text-muted">{p.edit}</td>
                <td className="px-4 py-3 text-muted">{p.delegate}</td>
                <td className="px-4 py-3 text-muted">{p.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
        Onthoud: delegatie van{" "}
        <strong className="font-medium text-fg">agenda</strong> en van{" "}
        <strong className="font-medium text-fg">e-mail</strong> zijn gescheiden.
        Een gemachtigde van je agenda beheert niet automatisch je mail — dat stel
        je apart in onder Instellingen → Delegaten.
      </p>
      <NextButton onNext={onNext}>Stappen in de echte Outlook</NextButton>
    </div>
  );
}

function Stappen({ onNext }: { onNext: () => void }) {
  const [platform, setPlatform] = useState<"web" | "new" | "classic">("web");
  const data = PLATFORM_SHARE_STEPS[platform];
  return (
    <div>
      <SectionHead
        kicker="In het echt"
        title="Zelfde principe, drie Outlooks."
        lead="Web en de nieuwe app delen bijna dezelfde knoppen. Klassiek heeft een apart machtigingenvenster. Het pad is overal: agenda → Delen → rechten."
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            ["web", "Web", Laptop],
            ["new", "Nieuwe app", Monitor],
            ["classic", "Klassiek", AppWindow],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPlatform(id)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm transition-colors duration-150",
              platform === id
                ? "bg-primary text-primary-fg"
                : "bg-surface text-muted shadow-[var(--shadow-border)] hover:text-fg",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
      <p className="mb-4 text-sm font-medium text-fg">{data.title}</p>
      <ol className="space-y-3">
        {data.steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-event-soft font-display text-sm text-primary tabular-nums">
              {i + 1}
            </span>
            <div>
              <h2 className="font-medium text-fg">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <NextButton onNext={onNext}>Vier BM-situaties</NextButton>
    </div>
  );
}

function Situaties({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Situaties"
        title="Kies het niveau bij de situatie."
        lead="Vier voorbeelden uit het studentenleven. Let vooral op: hoe minder rechten, hoe veiliger."
      />
      <div className="space-y-3">
        {SHARE_SCENARIOS.map((s) => (
          <article
            key={s.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-medium">{s.title}</h2>
                <p className="mt-1 text-sm text-muted">{s.when}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-event-soft px-3 py-1.5 text-sm font-medium text-primary">
                <ShieldCheck className="size-3.5" />
                {s.permission}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{s.why}</p>
            <p className="mt-4 rounded-md bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted">
              {s.tip}
            </p>
          </article>
        ))}
      </div>
      <NextButton onNext={onNext}>Vijf valkuilen</NextButton>
    </div>
  );
}

function Valkuilen({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Valkuilen"
        title="De meeste fouten gaan over de verkeerde agenda of te veel rechten."
        lead="Controleer altijd wat je deelt en met welk niveau. En denk aan intrekken na het project."
      />
      <div className="space-y-3">
        {SHARE_PITFALLS.map((p) => (
          <article
            key={p.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-medium">
              <AlertTriangle className="size-4 text-warn" />
              {p.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {p.problem}
            </p>
            <p className="mt-3 rounded-md bg-success-soft px-3 py-2 text-sm leading-relaxed text-success">
              {p.fix}
            </p>
          </article>
        ))}
      </div>
      <NextButton onNext={onNext}>Checklist voor je deelt</NextButton>
    </div>
  );
}

function Checklist({ onNext }: { onNext: () => void }) {
  const checks = useShareProgress((s) => s.checks);
  const toggle = useShareProgress((s) => s.toggleCheck);
  const n = SHARE_CHECKLIST.filter((c) => checks[c.id]).length;
  return (
    <div>
      <SectionHead
        kicker="Checklist"
        title="Zes punten, daarna verstuur je de uitnodiging."
        lead="Vink af terwijl je in het echte account deelt. Voortgang blijft op dit toestel."
      />
      <p className="mb-4 text-sm tabular-nums text-muted">
        {n} / {SHARE_CHECKLIST.length} afgevinkt
      </p>
      <ul className="space-y-2">
        {SHARE_CHECKLIST.map((c) => {
          const on = Boolean(checks[c.id]);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                className={cn(
                  "flex min-h-14 w-full items-start gap-3 rounded-lg px-4 py-3 text-left text-sm leading-snug shadow-[var(--shadow-border)]",
                  on ? "bg-success-soft text-success" : "bg-surface text-fg",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-xs ring-1",
                    on
                      ? "bg-success text-primary-fg ring-success"
                      : "ring-border",
                  )}
                >
                  {on && <Check className="size-3.5" />}
                </span>
                {c.text}
              </button>
            </li>
          );
        })}
      </ul>
      <NextButton onNext={onNext}>Toets van zes vragen</NextButton>
    </div>
  );
}

function Toets() {
  const answers = useShareProgress((s) => s.quiz);
  const setQuiz = useShareProgress((s) => s.setQuiz);
  const reset = useShareProgress((s) => s.reset);
  return (
    <div>
      <SectionHead
        kicker="Toets"
        title="Zes vragen. Directe uitleg."
        lead="Geen cijfer — wel of je bekijken, bewerken en machtigen uit elkaar houdt, en weet hoe je intrekt."
      />
      <Quiz
        items={SHARE_QUIZ}
        answers={answers}
        setAnswer={setQuiz}
        onReset={reset}
      />
      <p className="mt-10 flex items-center gap-2 text-sm text-subtle">
        <BookOpen className="size-4" />
        Labels verschillen licht per taal en versie. Twijfel je: zoek het menu
        Delen bij de agendanaam, niet in de algemene instellingen.
      </p>
    </div>
  );
}
