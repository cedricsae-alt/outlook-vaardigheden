import { useEffect, useState } from "react";
import {
  AlertTriangle,
  AppWindow,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Filter,
  Laptop,
  Monitor,
  Search,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InboxSimulator } from "@/components/inbox-simulator";
import { Quiz } from "@/components/quiz";
import {
  OPERATORS,
  SEARCH_CHECKLIST,
  SEARCH_PITFALLS,
  SEARCH_PLATFORM_STEPS,
  SEARCH_QUIZ,
  SEARCH_SCENARIOS,
  type SearchPlatform,
} from "@/data/search-content";
import {
  SEARCH_SECTIONS,
  useSearchProgress,
  type SearchSectionId,
} from "@/lib/search-progress";
import { cn } from "@/lib/utils";

export function SearchGuide() {
  const [active, setActive] = useState<SearchSectionId>("start");
  const markVisited = useSearchProgress((s) => s.markVisited);
  const visited = useSearchProgress((s) => s.visited);
  const mission1 = useSearchProgress((s) => s.mission1);
  const mission2 = useSearchProgress((s) => s.mission2);
  const checks = useSearchProgress((s) => s.checks);
  const quiz = useSearchProgress((s) => s.quiz);

  useEffect(() => {
    void useSearchProgress.persist.rehydrate();
  }, []);

  useEffect(() => {
    markVisited(active);
  }, [active, markVisited]);

  const checkedCount = SEARCH_CHECKLIST.filter((c) => checks[c.id]).length;
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
              <Search className="size-4" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-medium leading-none text-fg">
                Zoek
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
            {SEARCH_SECTIONS.map((s) => {
              const isActive = active === s.id;
              const done =
                Boolean(visited[s.id]) &&
                (s.id !== "oefenen" || (mission1 && mission2)) &&
                (s.id !== "checklist" ||
                  checkedCount === SEARCH_CHECKLIST.length) &&
                (s.id !== "quiz" || quizDone === SEARCH_QUIZ.length);
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

        <main id="inhoud" className="min-w-0 overflow-x-hidden px-4 py-8 sm:px-8 sm:py-10">
          {active === "start" && <Start onNext={() => setActive("begrippen")} />}
          {active === "begrippen" && (
            <Begrippen onNext={() => setActive("oefenen")} />
          )}
          {active === "oefenen" && (
            <Oefenen onNext={() => setActive("stappen")} />
          )}
          {active === "stappen" && (
            <Stappen onNext={() => setActive("operators")} />
          )}
          {active === "operators" && (
            <Operators onNext={() => setActive("situaties")} />
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
        title="Zoeken en filteren in Outlook, zonder 80 hits op ‘marketing’."
        lead="Voor 1ste bachelor Bedrijfsmanagement. In tien minuten leer je het zoekvak, het bereik, operators en het Filter-menu — en het verschil daartussen."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Search,
            title: "Zoeken vindt iets",
            body: "from:Claes, een onderwerp, een pdf. Werkt over mappen heen als je het bereik verruimt.",
          },
          {
            icon: Filter,
            title: "Filter is een bril",
            body: "Ongelezen, Heeft bestanden, Aan mij. De map blijft dezelfde, de lijst wordt smaller.",
          },
          {
            icon: AlertTriangle,
            title: "Huidige map",
            body: "Standaard zoekt Outlook alleen waar je bent. Lesmateriaal bestaat dan niet.",
          },
        ].map((card) => (
          <article
            key={card.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <card.icon className="size-5 text-primary" aria-hidden />
            <h2 className="mt-3 font-display text-lg font-medium">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </div>
      <NextButton onNext={onNext}>Eerst het verschil</NextButton>
    </div>
  );
}

function Begrippen({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Begrippen"
        title="Vier dingen die op elkaar lijken, en het niet zijn."
        lead="Studenten verwarren ze. Outlook ook, visueel: alles zit bovenaan in hetzelfde scherm."
      />
      <div className="overflow-x-auto rounded-lg shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-surface-2 text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Wat</th>
              <th className="px-4 py-3 font-medium">Doet</th>
              <th className="px-4 py-3 font-medium">Wanneer</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Zoeken</td>
              <td className="px-4 py-3 text-muted">
                Vraagt het postvak af. Operators, woorden, datums.
              </td>
              <td className="px-4 py-3 text-muted">Iets terugvinden</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Filter</td>
              <td className="px-4 py-3 text-muted">
                Bril op de open lijst: ongelezen, bijlagen, aan mij.
              </td>
              <td className="px-4 py-3 text-muted">De berg smaller maken</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Bereik</td>
              <td className="px-4 py-3 text-muted">
                Huidige map, postvak of alle mappen.
              </td>
              <td className="px-4 py-3 text-muted">0 resultaten? Eerst hier.</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Gericht / Overige</td>
              <td className="px-4 py-3 text-muted">
                Inbox-indeling, geen zoekfilter. Nieuwsbrieven glippen weg.
              </td>
              <td className="px-4 py-3 text-muted">Mail ‘verdwenen’?</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
        Operators blijven Engels, ook in een Nederlandse Outlook:{" "}
        <strong className="font-medium text-fg">from:</strong>,{" "}
        <strong className="font-medium text-fg">subject:</strong>,{" "}
        <strong className="font-medium text-fg">hasattachment:yes</strong>. De
        knoppen heten Zoeken, Filters en Filter.
      </p>
      <NextButton onNext={onNext}>Oefen het in de nep-inbox</NextButton>
    </div>
  );
}

function Oefenen({ onNext }: { onNext: () => void }) {
  const m1 = useSearchProgress((s) => s.mission1);
  const m2 = useSearchProgress((s) => s.mission2);
  return (
    <div>
      <SectionHead
        kicker="Oefeninbox"
        title="Eerst hier. Dan in je schoolaccount."
        lead="Twee opdrachten: een pdf terugvinden die niet in Postvak IN zit, en daarna de lijst op ongelezen zetten."
      />
      <InboxSimulator />
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-2",
            m1 ? "bg-success-soft text-success" : "bg-bg-warm text-muted",
          )}
        >
          {m1 ? <Check className="size-3.5" /> : <Circle className="size-3.5" />}
          Pdf gevonden
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-2",
            m2 ? "bg-success-soft text-success" : "bg-bg-warm text-muted",
          )}
        >
          {m2 ? <Check className="size-3.5" /> : <Circle className="size-3.5" />}
          Ongelezen-filter
        </span>
      </div>
      <NextButton onNext={onNext}>Stappen in de echte Outlook</NextButton>
    </div>
  );
}

function Stappen({ onNext }: { onNext: () => void }) {
  const [platform, setPlatform] = useState<SearchPlatform>("web");
  const data = SEARCH_PLATFORM_STEPS[platform];
  return (
    <div>
      <SectionHead
        kicker="In het echt"
        title="Zelfde zoekvak, drie Outlooks."
        lead="Web en de nieuwe app delen bijna dezelfde knoppen. Klassiek heeft een lint Zoeken. Operators werken overal."
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
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Sneltoets:{" "}
        <kbd className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">Ctrl+E</kbd>{" "}
        zet de cursor in het zoekvak (Windows). Op Mac:{" "}
        <kbd className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
          Cmd+E
        </kbd>
        .
      </p>
      <NextButton onNext={onNext}>De operators die je nodig hebt</NextButton>
    </div>
  );
}

function Operators({ onNext }: { onNext: () => void }) {
  const [active, setActive] = useState<(typeof OPERATORS)[number]["token"]>(
    OPERATORS[0].token,
  );
  const current = OPERATORS.find((o) => o.token === active) ?? OPERATORS[0];
  return (
    <div>
      <SectionHead
        kicker="Operators"
        title="Geen spatie na de dubbele punt."
        lead="Zes patronen dekken bijna alles in het eerste jaar. Combineer ze met een spatie — dat betekent én."
      />
      <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {OPERATORS.map((o) => (
            <button
              key={o.token}
              type="button"
              onClick={() => setActive(o.token)}
              className={cn(
                "h-11 shrink-0 rounded-md px-4 text-left text-sm lg:w-full",
                active === o.token
                  ? "bg-primary text-primary-fg"
                  : "bg-surface text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              {o.token}
            </button>
          ))}
        </div>
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <p className="font-mono text-sm text-primary">{current.example}</p>
          <h2 className="mt-2 font-display text-2xl font-medium">{current.token}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{current.use}</p>
        </article>
      </div>
      <div className="mt-6 rounded-lg bg-surface-2 p-5">
        <p className="font-medium">Combineren</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            Spatie = én.{" "}
            <code className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
              from:Claes hasattachment:yes
            </code>
          </li>
          <li>
            <code className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
              AND OR NOT
            </code>{" "}
            in hoofdletters.{" "}
            <code className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
              opdracht NOT nieuwsbrief
            </code>
          </li>
          <li>
            Agenda (in de agendamap):{" "}
            <code className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
              organizer:Claes
            </code>{" "}
            ·{" "}
            <code className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
              is:recurring
            </code>
          </li>
        </ul>
      </div>
      <NextButton onNext={onNext}>Vier BM-situaties</NextButton>
    </div>
  );
}

function Situaties({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Situaties"
        title="Kopieer de zoekopdracht, niet het verhaal."
        lead="Pas de naam van de docent aan. Houd de operator."
      />
      <div className="space-y-3">
        {SEARCH_SCENARIOS.map((s) => (
          <article
            key={s.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="font-display text-xl font-medium">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">{s.when}</p>
            <p className="mt-4 font-mono text-sm text-primary">{s.query}</p>
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
        title="Nul resultaten is meestal het bereik."
        lead="Niet de zoekmachine. Jij stond in de verkeerde map, of je zette een spatie te veel."
      />
      <div className="space-y-3">
        {SEARCH_PITFALLS.map((p) => (
          <article
            key={p.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-medium">
              <AlertTriangle className="size-4 text-warn" />
              {p.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</p>
            <p className="mt-3 rounded-md bg-success-soft px-3 py-2 text-sm leading-relaxed text-success">
              {p.fix}
            </p>
          </article>
        ))}
      </div>
      <NextButton onNext={onNext}>Checklist voor je Enter drukt</NextButton>
    </div>
  );
}

function Checklist({ onNext }: { onNext: () => void }) {
  const checks = useSearchProgress((s) => s.checks);
  const toggle = useSearchProgress((s) => s.toggleCheck);
  const n = SEARCH_CHECKLIST.filter((c) => checks[c.id]).length;
  return (
    <div>
      <SectionHead
        kicker="Checklist"
        title="Acht punten, daarna Enter."
        lead="Vink af terwijl je in het echte postvak zoekt. Voortgang blijft op dit toestel."
      />
      <p className="mb-4 text-sm tabular-nums text-muted">
        {n} / {SEARCH_CHECKLIST.length} afgevinkt
      </p>
      <ul className="space-y-2">
        {SEARCH_CHECKLIST.map((c) => {
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
  const answers = useSearchProgress((s) => s.quiz);
  const setQuiz = useSearchProgress((s) => s.setQuiz);
  const reset = useSearchProgress((s) => s.reset);
  return (
    <div>
      <SectionHead
        kicker="Toets"
        title="Zes vragen. Directe uitleg."
        lead="Geen cijfer — wel of je het bereik, de spatie en Gericht/Overige uit elkaar houdt."
      />
      <Quiz
        items={SEARCH_QUIZ}
        answers={answers}
        setAnswer={setQuiz}
        onReset={reset}
      />
      <p className="mt-10 flex items-center gap-2 text-sm text-subtle">
        <BookOpen className="size-4" />
        Labels verschillen licht per taal en versie. Twijfel je: zoek de trechter
        Filters, niet alleen het woord Filter boven de lijst.
      </p>
    </div>
  );
}
