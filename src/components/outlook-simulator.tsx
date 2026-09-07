import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Repeat,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress";

type Mission = 1 | 2;
type RepeatChoice = "none" | "weekly" | "custom";
type EndChoice = "never" | "date";
type OpenMode = "this" | "series" | null;

const WEEKDAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"] as const;
const EXCEPTION_DATE = 23;
const SERIES_DATES = [9, 16, 23, 30];
const WEDNESDAYS = [2, 9, 16, 23, 30];

const EXISTING = [
  { day: 7, start: "08:30", title: "Marketing", color: "event-2" as const },
  { day: 8, start: "10:00", title: "Boekhouden", color: "event-2" as const },
  { day: 10, start: "13:30", title: "Statistiek", color: "event-2" as const },
];

function septemberCells() {
  const cells: { day: number | null; inMonth: boolean }[] = [];
  cells.push({ day: 31, inMonth: false });
  for (let d = 1; d <= 30; d++) cells.push({ day: d, inMonth: true });
  while (cells.length % 7 !== 0) cells.push({ day: null, inMonth: false });
  return cells;
}

export function OutlookSimulator() {
  const setSimulatorComplete = useProgress((s) => s.setSimulatorComplete);
  const setExceptionComplete = useProgress((s) => s.setExceptionComplete);
  const simulatorComplete = useProgress((s) => s.simulatorComplete);
  const exceptionComplete = useProgress((s) => s.exceptionComplete);

  const [mission, setMission] = useState<Mission>(simulatorComplete ? 2 : 1);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("16:00");
  const [end, setEnd] = useState("17:30");
  const [repeat, setRepeat] = useState<RepeatChoice>("none");
  const [repeatOpen, setRepeatOpen] = useState(false);
  const [endChoice, setEndChoice] = useState<EndChoice>("never");
  const [saved, setSaved] = useState(simulatorComplete);
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState("");
  const [openDate, setOpenDate] = useState<number | null>(null);
  const [openMode, setOpenMode] = useState<OpenMode>(null);
  const [deleted, setDeleted] = useState<number[]>(
    exceptionComplete ? [EXCEPTION_DATE] : [],
  );
  const [wrongPulse, setWrongPulse] = useState(false);

  const cells = useMemo(septemberCells, []);

  useEffect(() => {
    if (saved) setSimulatorComplete();
  }, [saved, setSimulatorComplete]);

  useEffect(() => {
    if (deleted.includes(EXCEPTION_DATE)) setExceptionComplete();
  }, [deleted, setExceptionComplete]);

  function flash(message: string) {
    setHint(message);
    setShake(true);
    window.setTimeout(() => setShake(false), 220);
  }

  function startCompose() {
    if (saved) return;
    setComposing(true);
    setHint("");
  }

  function trySave() {
    if (title.trim().length < 3) {
      flash("Vul een duidelijke titel in, bv. Projectgroep Marketing.");
      return;
    }
    if (repeat !== "weekly") {
      flash("Kies Wekelijks — de projectgroep valt elke woensdag.");
      setRepeatOpen(true);
      return;
    }
    if (endChoice !== "date") {
      flash("Zet een einddatum. Een semester mag niet oneindig doorlopen.");
      setRepeatOpen(true);
      return;
    }
    setRepeatOpen(false);
    setComposing(false);
    setSaved(true);
    setMission(2);
    setHint("");
  }

  function clickSeriesEvent(day: number) {
    if (!saved || mission !== 2 || deleted.includes(day)) return;
    setOpenDate(day);
    setOpenMode(null);
    setHint("");
  }

  function chooseMode(mode: OpenMode) {
    if (openDate !== EXCEPTION_DATE && mode === "this") {
      setWrongPulse(true);
      flash(
        `Niet ${openDate} september — schrap alleen woensdag ${EXCEPTION_DATE} september.`,
      );
      window.setTimeout(() => setWrongPulse(false), 400);
      return;
    }
    if (openDate === EXCEPTION_DATE && mode === "series") {
      setWrongPulse(true);
      flash(
        "Niet de hele reeks. Kies Deze gebeurtenis, anders verdwijnt het hele semester.",
      );
      window.setTimeout(() => setWrongPulse(false), 400);
      return;
    }
    setOpenMode(mode);
  }

  function confirmDelete() {
    if (openDate == null || openMode !== "this") {
      flash("Kies eerst Deze gebeurtenis.");
      return;
    }
    if (openDate !== EXCEPTION_DATE) {
      flash(`Schrap alleen ${EXCEPTION_DATE} september.`);
      return;
    }
    setDeleted((d) => [...d, openDate]);
    setOpenDate(null);
    setOpenMode(null);
  }

  const stepLabel = !saved
    ? composing
      ? "Vul de reeks in"
      : "Start een nieuwe gebeurtenis"
    : deleted.includes(EXCEPTION_DATE)
      ? "Klaar"
      : "Schrap één uitgevallen les";

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-elevated)]">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            Oefenagenda · september 2026
          </p>
          <h3 className="mt-1 font-display text-xl font-medium text-fg">
            {mission === 1
              ? "Opdracht 1 — wekelijkse projectgroep"
              : "Opdracht 2 — één les schrappen"}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
            {mission === 1
              ? "Maak Projectgroep Marketing, wekelijks op woensdag van 16:00 tot 17:30, tot eind december."
              : `Woensdag ${EXCEPTION_DATE} september valt uit. Verwijder alleen die keer, niet de reeks.`}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-md bg-event-soft px-3 py-2 text-sm text-primary">
          <Repeat className="size-4" aria-hidden />
          <span>{stepLabel}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-fg">
              <span className="flex size-10 items-center justify-center text-muted">
                <ChevronLeft className="size-4" />
              </span>
              <span className="min-w-36 text-center text-sm font-medium">
                september 2026
              </span>
              <span className="flex size-10 items-center justify-center text-muted">
                <ChevronRight className="size-4" />
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={startCompose}
              disabled={saved}
              className={cn(!composing && !saved && "ring-2 ring-primary/40")}
            >
              Nieuwe gebeurtenis
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md bg-border text-center">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="bg-surface-2 py-2 text-xs font-medium tracking-wide text-muted uppercase"
              >
                {d}
              </div>
            ))}
            {cells.map((cell, i) => {
              const isSeries =
                saved &&
                cell.inMonth &&
                cell.day != null &&
                SERIES_DATES.includes(cell.day);
              const isGone = cell.day != null && deleted.includes(cell.day);
              const existing = EXISTING.filter(
                (e) => cell.inMonth && e.day === cell.day,
              );
              const isWed =
                cell.inMonth &&
                cell.day != null &&
                WEDNESDAYS.includes(cell.day);

              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-20 bg-surface p-1.5 text-left sm:min-h-24",
                    !cell.inMonth && "bg-bg-warm/60 text-subtle",
                    isWed && !saved && "bg-event-soft/40",
                  )}
                >
                  <div className="text-xs tabular-nums text-muted">
                    {cell.day ?? ""}
                  </div>
                  <div className="mt-1 flex flex-col gap-1">
                    {existing.map((e) => (
                      <div
                        key={e.title}
                        className="truncate rounded-xs bg-event-2-soft px-1.5 py-0.5 text-xs leading-tight text-event-2"
                      >
                        <span className="hidden sm:inline">{e.start} · </span>
                        {e.title}
                      </div>
                    ))}
                    {isSeries && !isGone && (
                      <button
                        type="button"
                        onClick={() =>
                          cell.day != null && clickSeriesEvent(cell.day)
                        }
                        className={cn(
                          "flex items-start gap-1 rounded-xs bg-event-soft px-1.5 py-0.5 text-left text-xs leading-tight text-primary",
                          mission === 2 &&
                            cell.day === EXCEPTION_DATE &&
                            "ring-2 ring-primary",
                        )}
                      >
                        <Repeat className="mt-0.5 size-2.5 shrink-0" />
                        <span className="truncate">
                          <span className="hidden sm:inline">16:00 · </span>
                          Projectgroep
                        </span>
                      </button>
                    )}
                    {isGone && (
                      <div className="rounded-xs bg-danger-soft px-1.5 py-0.5 text-xs text-danger line-through">
                        Geschrapt
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Woensdagen zijn licht gemarkeerd. Bestaande vakken blijven staan —
            jouw reeks komt erbovenop.
          </p>
        </div>

        <aside className="border-t border-border bg-surface-2 p-4 lg:border-t-0 lg:border-l">
          {!composing && openDate == null && (
            <Coach
              shake={shake}
              hint={hint}
              saved={saved}
              done={deleted.includes(EXCEPTION_DATE)}
              mission={mission}
            />
          )}

          {composing && (
            <EventForm
              title={title}
              setTitle={setTitle}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              repeat={repeat}
              setRepeat={setRepeat}
              repeatOpen={repeatOpen}
              setRepeatOpen={setRepeatOpen}
              endChoice={endChoice}
              setEndChoice={setEndChoice}
              onClose={() => setComposing(false)}
              onSave={trySave}
              shake={shake}
              hint={hint}
            />
          )}

          {openDate != null && (
            <EditPanel
              day={openDate}
              mode={openMode}
              onMode={chooseMode}
              onDelete={confirmDelete}
              onClose={() => {
                setOpenDate(null);
                setOpenMode(null);
              }}
              shake={shake || wrongPulse}
              hint={hint}
            />
          )}
        </aside>
      </div>
    </div>
  );
}

function Coach({
  shake,
  hint,
  saved,
  done,
  mission,
}: {
  shake: boolean;
  hint: string;
  saved: boolean;
  done: boolean;
  mission: Mission;
}) {
  return (
    <div className={cn("space-y-3", shake && "shake")}>
      <p className="text-xs font-medium tracking-wide text-primary uppercase">
        Coach
      </p>
      {done ? (
        <>
          <p className="font-display text-lg text-fg">Beide opdrachten klaar.</p>
          <p className="text-sm leading-relaxed text-muted">
            Je hebt een reeks gezet mét einddatum, en één uitzondering
            geschrapt zonder de rest te wissen. Dat is het hele trucje.
          </p>
          <div className="flex items-center gap-2 rounded-md bg-success-soft px-3 py-2 text-sm text-success">
            <Check className="size-4" />
            Opgeslagen in je voortgang
          </div>
        </>
      ) : !saved ? (
        <>
          <p className="font-display text-lg text-fg">
            Klik op Nieuwe gebeurtenis.
          </p>
          <ol className="space-y-2 text-sm leading-relaxed text-muted">
            <li>1. Titel: Projectgroep Marketing</li>
            <li>2. Tijd: 16:00–17:30</li>
            <li>3. Niet herhalen → Wekelijks</li>
            <li>4. Eindigt op: 16 december 2026</li>
            <li>5. Opslaan</li>
          </ol>
        </>
      ) : (
        <>
          <p className="font-display text-lg text-fg">
            Klik de reeks op {EXCEPTION_DATE} sep.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Outlook vraagt wat je wilt openen. Voor een uitgevallen les kies je
            Deze gebeurtenis — nooit de hele reeks.
          </p>
        </>
      )}
      {hint && (
        <p className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
          {hint}
        </p>
      )}
      {mission === 2 && saved && !done && (
        <p className="text-xs text-subtle">
          Het blok op {EXCEPTION_DATE} september heeft een ring.
        </p>
      )}
    </div>
  );
}

function EventForm({
  title,
  setTitle,
  start,
  setStart,
  end,
  setEnd,
  repeat,
  setRepeat,
  repeatOpen,
  setRepeatOpen,
  endChoice,
  setEndChoice,
  onClose,
  onSave,
  shake,
  hint,
}: {
  title: string;
  setTitle: (v: string) => void;
  start: string;
  setStart: (v: string) => void;
  end: string;
  setEnd: (v: string) => void;
  repeat: RepeatChoice;
  setRepeat: (v: RepeatChoice) => void;
  repeatOpen: boolean;
  setRepeatOpen: (v: boolean) => void;
  endChoice: EndChoice;
  setEndChoice: (v: EndChoice) => void;
  onClose: () => void;
  onSave: () => void;
  shake: boolean;
  hint: string;
}) {
  const repeatLabel =
    repeat === "weekly"
      ? "Wekelijks op woensdag"
      : repeat === "custom"
        ? "Aangepast"
        : "Niet herhalen";

  return (
    <div className={cn("space-y-4", shake && "shake")}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-lg text-fg">Nieuwe gebeurtenis</p>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-sm text-muted hover:bg-bg-warm"
          aria-label="Sluiten"
        >
          <X className="size-4" />
        </button>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">
          Titel
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Projectgroep Marketing"
          className="h-11 w-full rounded-sm bg-surface px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label>
          <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted">
            <Clock className="size-3" /> Start
          </span>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-11 w-full rounded-sm bg-surface px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-medium text-muted">
            Einde
          </span>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="h-11 w-full rounded-sm bg-surface px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      <div>
        <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted">
          <Repeat className="size-3" /> Herhalen
        </span>
        <button
          type="button"
          onClick={() => setRepeatOpen(!repeatOpen)}
          className="flex h-11 w-full items-center justify-between rounded-sm bg-surface px-3 text-left text-sm shadow-[var(--shadow-border)]"
        >
          {repeatLabel}
          <ChevronRight
            className={cn(
              "size-4 text-muted transition-transform duration-150",
              repeatOpen && "rotate-90",
            )}
          />
        </button>
        {repeatOpen && (
          <div className="mt-2 space-y-1 rounded-md bg-surface p-1 shadow-[var(--shadow-border)]">
            {(
              [
                ["none", "Niet herhalen"],
                ["weekly", "Wekelijks op woensdag"],
                ["custom", "Aangepast…"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setRepeat(id);
                  if (id === "none") setEndChoice("never");
                }}
                className={cn(
                  "flex h-10 w-full items-center rounded-sm px-3 text-left text-sm",
                  repeat === id
                    ? "bg-event-soft text-primary"
                    : "hover:bg-bg-warm",
                )}
              >
                {label}
              </button>
            ))}
            {repeat === "weekly" && (
              <div className="mt-2 space-y-2 border-t border-border px-3 py-3">
                <p className="text-xs font-medium text-muted">
                  Einde van de reeks
                </p>
                <label className="flex min-h-10 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="end"
                    checked={endChoice === "never"}
                    onChange={() => setEndChoice("never")}
                    className="size-4 accent-primary"
                  />
                  Geen einddatum
                </label>
                <label className="flex min-h-10 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="end"
                    checked={endChoice === "date"}
                    onChange={() => setEndChoice("date")}
                    className="size-4 accent-primary"
                  />
                  Eindigt op 16 december 2026
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted">
        <MapPin className="size-4" />
        Lokaal B.2.14
      </div>
      <div className="flex items-center gap-2 text-sm text-muted">
        <Users className="size-4" />
        3 groepsgenoten (oefening slaat lokaal op)
      </div>

      {hint && (
        <p className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
          {hint}
        </p>
      )}

      <Button type="button" className="w-full" onClick={onSave}>
        Opslaan
      </Button>
    </div>
  );
}

function EditPanel({
  day,
  mode,
  onMode,
  onDelete,
  onClose,
  shake,
  hint,
}: {
  day: number;
  mode: OpenMode;
  onMode: (m: OpenMode) => void;
  onDelete: () => void;
  onClose: () => void;
  shake: boolean;
  hint: string;
}) {
  return (
    <div className={cn("space-y-4", shake && "shake")}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg text-fg">Projectgroep Marketing</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <CalendarDays className="size-3.5" />
            woensdag {day} september · 16:00–17:30
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-sm text-muted hover:bg-bg-warm"
          aria-label="Sluiten"
        >
          <X className="size-4" />
        </button>
      </div>

      <p className="text-sm leading-relaxed text-muted">
        Dit is een terugkerende gebeurtenis. Wat wil je openen?
      </p>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onMode("this")}
          className={cn(
            "flex min-h-12 w-full items-center rounded-md px-3 text-left text-sm shadow-[var(--shadow-border)]",
            mode === "this"
              ? "bg-event-soft text-primary"
              : "bg-surface hover:bg-bg-warm",
          )}
        >
          Deze gebeurtenis
        </button>
        <button
          type="button"
          onClick={() => onMode("series")}
          className={cn(
            "flex min-h-12 w-full items-center rounded-md px-3 text-left text-sm shadow-[var(--shadow-border)]",
            mode === "series"
              ? "bg-danger-soft text-danger"
              : "bg-surface hover:bg-bg-warm",
          )}
        >
          Alle gebeurtenissen in de reeks
        </button>
      </div>

      {hint && (
        <p className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
          {hint}
        </p>
      )}

      {mode === "this" && (
        <Button
          type="button"
          variant="outline"
          className="w-full text-danger"
          onClick={onDelete}
        >
          <Trash2 className="size-4" />
          Deze keer verwijderen
        </Button>
      )}
    </div>
  );
}
