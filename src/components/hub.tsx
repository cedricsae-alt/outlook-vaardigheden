import { Link } from "@tanstack/react-router";
import { ChevronRight, Filter, Repeat, Search, Share2 } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { useSearchProgress } from "@/lib/search-progress";
import { useShareProgress } from "@/lib/share-progress";
import { SHARE_CHECKLIST, SHARE_QUIZ } from "@/data/share-content";
import { cn } from "@/lib/utils";

export function Hub() {
  const reeksSim = useProgress((s) => s.simulatorComplete);
  const reeksExc = useProgress((s) => s.exceptionComplete);
  const search1 = useSearchProgress((s) => s.mission1);
  const search2 = useSearchProgress((s) => s.mission2);
  const shareChecks = useShareProgress((s) => s.checks);
  const shareQuiz = useShareProgress((s) => s.quiz);
  const shareDone =
    SHARE_CHECKLIST.every((c) => shareChecks[c.id]) &&
    Object.keys(shareQuiz).length === SHARE_QUIZ.length;

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-fg">
              <Search className="size-4" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-medium leading-none text-fg">
                Outlook-gids
              </p>
              <p className="mt-1 text-xs text-muted">
                1ste bachelor Bedrijfsmanagement
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="stagger-in mb-10 max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            Drie handleidingen
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Outlook zoals je het in het eerste jaar nodig hebt.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Geen volledige Microsoft-help. Wel de drie vaardigheden waar BM-studenten
            op vastlopen: reeksen in de agenda, mail terugvinden zonder 80 hits, en je
            agenda delen of machtigen zonder te veel prijs te geven.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <GuideCard
            to="/reeks"
            icon={Repeat}
            kicker="Agenda"
            title="Terugkerende afspraken"
            body="Wekelijkse projectgroep, studieblok, stagecheck. Eén les schrappen zonder het semester mee te nemen."
            time="10 min"
            done={reeksSim && reeksExc}
            doneLabel="Oefenagenda klaar"
          />
          <GuideCard
            to="/zoeken"
            icon={Filter}
            kicker="Mail"
            title="Zoeken en filters"
            body="Het zoekvak, het bereik, operators zoals from: en hasattachment:yes, en het Filter-menu."
            time="10 min"
            done={search1 && search2}
            doneLabel="Oefeninbox klaar"
          />
          <GuideCard
            to="/delen"
            icon={Share2}
            kicker="Agenda"
            title="Delen en machtigen"
            body="Kan bekijken, bewerken of gemachtigde? Je agenda delen met je groep of stagementor — en toegang weer intrekken."
            time="10 min"
            done={shareDone}
            doneLabel="Checklist en toets klaar"
          />
        </div>
      </main>
    </div>
  );
}

function GuideCard({
  to,
  icon: Icon,
  kicker,
  title,
  body,
  time,
  done,
  doneLabel,
}: {
  to: "/reeks" | "/zoeken" | "/delen";
  icon: typeof Repeat;
  kicker: string;
  title: string;
  body: string;
  time: string;
  done: boolean;
  doneLabel: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl bg-surface p-6 text-fg no-underline shadow-[var(--shadow-border)] transition-shadow duration-150 hover:shadow-[var(--shadow-elevated)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-md bg-event-soft text-primary">
          <Icon className="size-5" />
        </span>
        <span className="text-sm text-muted">{time}</span>
      </div>
      <p className="mt-5 text-xs font-medium tracking-wide text-primary uppercase">
        {kicker}
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium text-fg">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-sm",
            done ? "text-success" : "text-muted",
          )}
        >
          {done ? doneLabel : "Nog niet geoefend"}
        </span>
        <span className="inline-flex h-11 items-center gap-1 text-sm font-medium text-primary">
          Openen
          <ChevronRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
