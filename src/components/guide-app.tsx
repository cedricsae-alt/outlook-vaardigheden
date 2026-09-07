import { useEffect, useState } from "react";
import {
  AlertTriangle,
  AppWindow,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  Circle,
  GraduationCap,
  Laptop,
  Monitor,
  Repeat,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { OutlookSimulator } from "@/components/outlook-simulator";
import { Quiz } from "@/components/quiz";
import {
  CHECKLIST,
  PATTERNS,
  PITFALLS,
  PLATFORM_STEPS,
  SCENARIOS,
  type Platform,
} from "@/data/content";
import { SECTIONS, useProgress, type SectionId } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function GuideApp() {
  const [active, setActive] = useState<SectionId>("start");
  const markVisited = useProgress((s) => s.markVisited);
  const visited = useProgress((s) => s.visited);
  const simulatorComplete = useProgress((s) => s.simulatorComplete);
  const exceptionComplete = useProgress((s) => s.exceptionComplete);
  const checks = useProgress((s) => s.checks);
  const quiz = useProgress((s) => s.quiz);

  useEffect(() => {
    void useProgress.persist.rehydrate();
  }, []);

  useEffect(() => {
    markVisited(active);
  }, [active, markVisited]);

  const checkedCount = CHECKLIST.filter((c) => checks[c.id]).length;
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
              <Repeat className="size-4" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-medium leading-none text-fg">
                Reeks
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
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              const done =
                Boolean(visited[s.id]) &&
                (s.id !== "oefenen" ||
                  (simulatorComplete && exceptionComplete)) &&
                (s.id !== "checklist" || checkedCount === CHECKLIST.length) &&
                (s.id !== "quiz" || quizDone === 6);
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
            <Stappen onNext={() => setActive("patronen")} />
          )}
          {active === "patronen" && (
            <Patronen onNext={() => setActive("wijzigen")} />
          )}
          {active === "wijzigen" && (
            <Wijzigen onNext={() => setActive("situaties")} />
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
        title="Terugkerende afspraken in Outlook, zonder je semester te slopen."
        lead="Voor 1ste bachelor Bedrijfsmanagement. In tien minuten leer je een reeks zetten, het juiste patroon kiezen, en één les schrappen zonder de rest mee te nemen."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Repeat,
            title: "Eén keer plannen",
            body: "Wekelijkse projectgroep, studieblok of stagecheck — Outlook herhaalt het voor je.",
          },
          {
            icon: Users,
            title: "Alleen of met anderen",
            body: "Afspraak = alleen jij. Vergadering = deelnemers krijgen één uitnodiging voor de hele reeks.",
          },
          {
            icon: AlertTriangle,
            title: "De gevaarlijke knop",
            body: "‘Hele reeks’ wist of wijzigt alles. ‘Deze gebeurtenis’ raakt één dag.",
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
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-surface-2 p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-fg">
          <GraduationCap className="size-4 text-primary" />
          Wat je nodig hebt
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            Je hogeschoolaccount (Microsoft 365) — meestal outlook.office.com.
          </li>
          <li>
            De webagenda werkt op laptop, Chromebook en telefoon. De Windows-app
            is optioneel.
          </li>
          <li>
            Geen installatie voor deze handleiding: oefen eerst hier, daarna in
            het echt.
          </li>
        </ul>
      </div>

      <NextButton onNext={onNext}>Eerst de begrippen</NextButton>
    </div>
  );
}

function Begrippen({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Begrippen"
        title="Drie woorden die je niet mag door elkaar halen."
        lead="Outlook gebruikt dezelfde knoppen voor een eenmalige les, een wekelijkse werkgroep en een uitnodiging aan je team. Het verschil zit in deelnemers en in herhalen."
      />

      <div className="overflow-x-auto rounded-lg shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-surface-2 text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Woord</th>
              <th className="px-4 py-3 font-medium">Wat het is</th>
              <th className="px-4 py-3 font-medium">Wanneer</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Afspraak</td>
              <td className="px-4 py-3 text-muted">
                Staat alleen in jouw agenda. Niemand krijgt mail.
              </td>
              <td className="px-4 py-3 text-muted">
                Studieblok, job, herinnering
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Vergadering</td>
              <td className="px-4 py-3 text-muted">
                Je nodigt mensen uit. Zij accepteren of weigeren.
              </td>
              <td className="px-4 py-3 text-muted">
                Projectgroep, stagegesprek
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium">Reeks</td>
              <td className="px-4 py-3 text-muted">
                Dezelfde afspraak of vergadering, herhaald volgens een patroon.
              </td>
              <td className="px-4 py-3 text-muted">
                Elke woensdag tot de deadline
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-lg font-medium">Niet herhalen</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Standaard. Eén blok, één dag. Gebruik dit voor een examen, een
            gastcollege of een eenmalige afspraak met de docent.
          </p>
        </article>
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-lg font-medium">Wel herhalen</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Outlook maakt de volgende keren automatisch. Jij (en je
            groepsgenoten) zien ze als losse blokken, maar ze horen bij één reeks.
          </p>
        </article>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
        Op je telefoon en in de webagenda heten de knoppen vaak{" "}
        <strong className="font-medium text-fg">Nieuwe gebeurtenis</strong> en{" "}
        <strong className="font-medium text-fg">Niet herhalen</strong>. In de
        klassieke Windows-app:{" "}
        <strong className="font-medium text-fg">Nieuwe afspraak</strong> of{" "}
        <strong className="font-medium text-fg">Herhaling</strong>.
      </p>

      <NextButton onNext={onNext}>Oefen het in de nep-agenda</NextButton>
    </div>
  );
}

function Oefenen({ onNext }: { onNext: () => void }) {
  const sim = useProgress((s) => s.simulatorComplete);
  const exc = useProgress((s) => s.exceptionComplete);
  return (
    <div>
      <SectionHead
        kicker="Oefenagenda"
        title="Doe het eerst hier. Dan in Outlook."
        lead="Twee opdrachten, dezelfde klikken als in de echte agenda. De coach laat je niet verder als het patroon of de einddatum ontbreekt."
      />
      <OutlookSimulator />
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <StatusChip ok={sim} label="Reeks gezet" />
        <StatusChip ok={exc} label="Uitzondering geschrapt" />
      </div>
      <NextButton onNext={onNext}>Stappen in de echte Outlook</NextButton>
    </div>
  );
}

function StatusChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-2",
        ok ? "bg-success-soft text-success" : "bg-bg-warm text-muted",
      )}
    >
      {ok ? <Check className="size-3.5" /> : <Circle className="size-3.5" />}
      {label}
    </span>
  );
}

function Stappen({ onNext }: { onNext: () => void }) {
  const [platform, setPlatform] = useState<Platform>("web");
  const data = PLATFORM_STEPS[platform];
  return (
    <div>
      <SectionHead
        kicker="In het echt"
        title="Zelfde reeks, drie Outlooks."
        lead="De meeste studenten werken in de browser. De nieuwe app lijkt daar sterk op. De klassieke Windows-app heeft een extra venster ‘Afspraakherhaling’."
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
        Sneltoets klassiek:{" "}
        <kbd className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">
          Ctrl+Shift+Q
        </kbd>{" "}
        nieuwe vergadering,{" "}
        <kbd className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-fg">Ctrl+G</kbd>{" "}
        herhaling.
      </p>

      <NextButton onNext={onNext}>Welk patroon kies ik?</NextButton>
    </div>
  );
}

function Patronen({ onNext }: { onNext: () => void }) {
  const [active, setActive] = useState<(typeof PATTERNS)[number]["id"]>(
    PATTERNS[2].id,
  );
  const current = PATTERNS.find((p) => p.id === active) ?? PATTERNS[2];
  return (
    <div>
      <SectionHead
        kicker="Patronen"
        title="Kies het patroon op de week, niet op het gevoel."
        lead="‘Wekelijks’ is bijna altijd het juiste antwoord in BM. ‘Elke 2 weken’ zit verstopt onder Aangepast. ‘Dag 1 van de maand’ is bijna nooit wat je wilt."
      />

      <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                "h-11 shrink-0 rounded-md px-4 text-left text-sm lg:w-full",
                active === p.id
                  ? "bg-primary text-primary-fg"
                  : "bg-surface text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="font-display text-2xl font-medium">{current.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{current.use}</p>
          <p className="mt-4 rounded-md bg-event-soft px-4 py-3 text-sm leading-relaxed text-primary">
            {current.how}
          </p>
          <PatternPreview id={current.id} />
        </article>
      </div>

      <div className="mt-6 rounded-lg bg-surface-2 p-5">
        <p className="flex items-center gap-2 font-medium">
          <CalendarClock className="size-4 text-primary" />
          Altijd een einde
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            <strong className="font-medium text-fg">Eindigt op</strong> — laatste
            lesweek, presentatiedag, einde stage.
          </li>
          <li>
            <strong className="font-medium text-fg">Eindigt na N keer</strong> —
            handig als je 12 werksessies telt.
          </li>
          <li>
            <strong className="font-medium text-fg">Geen einddatum</strong> —
            alleen voor iets dat echt niet stopt (en bijna nooit voor school).
          </li>
        </ul>
      </div>

      <NextButton onNext={onNext}>Wijzigen zonder schade</NextButton>
    </div>
  );
}

function PatternPreview({ id }: { id: string }) {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const on = (d: number) => {
    if (id === "daily") return true;
    if (id === "weekdays") return d % 7 !== 6 && d % 7 !== 0;
    if (id === "weekly") return d % 7 === 3;
    if (id === "biweekly") return d === 3;
    if (id === "monthly") return d === 1;
    return false;
  };
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
        Twee weken, visueel
      </p>
      <div className="grid grid-cols-7 gap-1">
        {["ma", "di", "wo", "do", "vr", "za", "zo"].map((d) => (
          <div
            key={d}
            className="text-center text-xs tracking-wide text-subtle uppercase"
          >
            {d}
          </div>
        ))}
        {days.map((d) => (
          <div
            key={d}
            className={cn(
              "flex h-9 items-center justify-center rounded-xs text-xs tabular-nums",
              on(d) ? "bg-primary text-primary-fg" : "bg-bg-warm text-subtle",
            )}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function Wijzigen({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <SectionHead
        kicker="Wijzigen"
        title="Drie keuzes. Eén daarvan is gevaarlijk."
        lead="Als je een herhaalde gebeurtenis opent, vraagt Outlook wat je bedoelt. Lees die vraag. Altijd."
      />

      <div className="space-y-3">
        {[
          {
            title: "Deze gebeurtenis",
            body: "Alleen die dag. Gebruik bij ziekte, een uitgevallen les, een lokaalwissel voor één keer, of een extra kwartier.",
            tone: "ok" as const,
          },
          {
            title: "Deze en volgende gebeurtenissen",
            body: "Vanaf die datum een nieuwe regel, de vorige keren blijven. Zit in de webagenda en nieuwe Outlook. Klassiek heeft dit vaak niet.",
            tone: "ok" as const,
          },
          {
            title: "Alle gebeurtenissen in de reeks",
            body: "Past of wist élke keer, ook die in het verleden. Alleen als het uur, de dag of de deelnemers voor altijd veranderen.",
            tone: "warn" as const,
          },
        ].map((item) => (
          <article
            key={item.title}
            className={cn(
              "rounded-lg p-5 shadow-[var(--shadow-border)]",
              item.tone === "warn" ? "bg-warn-soft" : "bg-surface",
            )}
          >
            <h2
              className={cn(
                "font-display text-lg font-medium",
                item.tone === "warn" ? "text-warn" : "text-fg",
              )}
            >
              {item.title}
            </h2>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                item.tone === "warn" ? "text-warn" : "text-muted",
              )}
            >
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-medium">Vergadering updaten</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Na een wijziging aan de reeks:{" "}
            <strong className="font-medium text-fg">Update verzenden</strong>.
            Nooit een tweede nieuwe gebeurtenis maken — dan zitten er dubbels
            in ieders agenda.
          </p>
        </article>
        <article className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-medium">Iets vanaf nu anders</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Web: Deze en volgende. Klassiek: zet de oude reeks op eindigen de
            dag vóór de wijziging, en maak een nieuwe reeks vanaf de nieuwe
            datum.
          </p>
        </article>
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
        title="Kopieer het patroon, niet de titel."
        lead="Dit zijn de vier reeksen die je in het eerste jaar het vaakst nodig hebt. Pas titel en uren aan, houd het patroon."
      />
      <div className="space-y-3">
        {SCENARIOS.map((s) => (
          <article
            key={s.title}
            className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="font-display text-xl font-medium">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">{s.when}</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium tracking-wide text-subtle uppercase">
                  Patroon
                </dt>
                <dd className="mt-1 text-sm">{s.pattern}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-subtle uppercase">
                  Einde
                </dt>
                <dd className="mt-1 text-sm">{s.end}</dd>
              </div>
            </dl>
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
        title="De fouten die iedereen een keer maakt."
        lead="Meestal niet uit onkunde, maar omdat Outlook twee dingen met bijna dezelfde naam naast elkaar zet."
      />
      <div className="space-y-3">
        {PITFALLS.map((p) => (
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
      <NextButton onNext={onNext}>Checklist voor je het verstuurt</NextButton>
    </div>
  );
}

function Checklist({ onNext }: { onNext: () => void }) {
  const checks = useProgress((s) => s.checks);
  const toggle = useProgress((s) => s.toggleCheck);
  const n = CHECKLIST.filter((c) => checks[c.id]).length;
  return (
    <div>
      <SectionHead
        kicker="Checklist"
        title="Acht punten, daarna verzenden."
        lead="Vink af terwijl je de echte gebeurtenis maakt. Je voortgang blijft bewaard op dit toestel."
      />
      <p className="mb-4 text-sm tabular-nums text-muted">
        {n} / {CHECKLIST.length} afgevinkt
      </p>
      <ul className="space-y-2">
        {CHECKLIST.map((c) => {
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
  return (
    <div>
      <SectionHead
        kicker="Toets"
        title="Zes vragen. Directe uitleg."
        lead="Geen cijfer voor school — wel een check of je de gevaarlijke knop herkent voor je hem in het echt indrukt."
      />
      <Quiz />
      <p className="mt-10 flex items-center gap-2 text-sm text-subtle">
        <BookOpen className="size-4" />
        Labels kunnen licht verschillen per taal en Outlook-versie. Twijfel je:
        kijk naar Herhalen / Repeat, niet naar het icoon alleen.
      </p>
      <p className="mt-3 text-xs leading-relaxed text-subtle">
        Stappen gebaseerd op Microsoft-ondersteuning voor nieuwe Outlook, Outlook
        op het web en klassieke Outlook. Jouw hogeschool kan extra beleidsregels
        hebben voor Teams-vergaderingen.
      </p>
    </div>
  );
}
