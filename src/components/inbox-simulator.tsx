import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Filter,
  Paperclip,
  Search,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchProgress } from "@/lib/search-progress";
import { cn } from "@/lib/utils";

type FolderId = "inbox" | "lesmateriaal" | "project";
type Scope = "current" | "all";
type Bucket = "today" | "this-week" | "last-week" | "older";

type Mail = {
  id: string;
  from: string;
  fromKey: string;
  toMe: boolean;
  subject: string;
  preview: string;
  when: string;
  bucket: Bucket;
  unread: boolean;
  flagged: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
  folder: FolderId;
  invite: boolean;
};

const TARGET_ID = "m-claes-opdracht";

const MAILS: Mail[] = [
  {
    id: TARGET_ID,
    from: "Annemie Claes",
    fromKey: "claes",
    toMe: true,
    subject: "Opdracht 1 Marketing — briefing",
    preview: "In bijlage de pdf met de case en de deadline van 30 september.",
    when: "wo 3 sep",
    bucket: "last-week",
    unread: true,
    flagged: true,
    hasAttachment: true,
    attachmentName: "briefing-opdracht1.pdf",
    folder: "lesmateriaal",
    invite: false,
  },
  {
    id: "m-claes-rooster",
    from: "Annemie Claes",
    fromKey: "claes",
    toMe: true,
    subject: "Lesrooster Marketing gewijzigd",
    preview: "Woensdag start om 10:00 in lokaal B.2.14, niet B.1.08.",
    when: "vandaag",
    bucket: "today",
    unread: true,
    flagged: false,
    hasAttachment: false,
    folder: "inbox",
    invite: false,
  },
  {
    id: "m-kring",
    from: "Studentenkring BM",
    fromKey: "kring",
    toMe: false,
    subject: "Cantus vrijdag — inschrijven",
    preview: "Schrijf je in vóór donderdag. Geen lesmateriaal, wel feest.",
    when: "gisteren",
    bucket: "last-week",
    unread: true,
    flagged: false,
    hasAttachment: false,
    folder: "inbox",
    invite: false,
  },
  {
    id: "m-lien",
    from: "Lien Peeters",
    fromKey: "lien",
    toMe: true,
    subject: "Projectgroep — Excel-planning",
    preview: "Ik zette de taken in het bestand. Check kolom C.",
    when: "vr 4 sep",
    bucket: "last-week",
    unread: false,
    flagged: false,
    hasAttachment: true,
    attachmentName: "planning.xlsx",
    folder: "project",
    invite: false,
  },
  {
    id: "m-acker",
    from: "Karel Van Acker",
    fromKey: "acker",
    toMe: true,
    subject: "Oefeningen boekhouden H3",
    preview: "Maak oefening 12 tot 15. Geen bijlage deze keer, staat op Toledo.",
    when: "di 1 sep",
    bucket: "last-week",
    unread: false,
    flagged: false,
    hasAttachment: false,
    folder: "lesmateriaal",
    invite: false,
  },
  {
    id: "m-stage",
    from: "Stagebureau",
    fromKey: "stage",
    toMe: true,
    subject: "Infoavond stages 2de jaar",
    preview: "Dinsdag 12:30 in de aula. Bevestig je aanwezigheid.",
    when: "vandaag",
    bucket: "today",
    unread: true,
    flagged: false,
    hasAttachment: false,
    folder: "inbox",
    invite: true,
  },
  {
    id: "m-invite",
    from: "Lien Peeters",
    fromKey: "lien",
    toMe: true,
    subject: "Projectgroep Marketing",
    preview: "Uitnodiging voor een wekelijkse vergadering, woensdag 16:00.",
    when: "ma 31 aug",
    bucket: "last-week",
    unread: false,
    flagged: false,
    hasAttachment: false,
    folder: "inbox",
    invite: true,
  },
  {
    id: "m-claes-old",
    from: "Annemie Claes",
    fromKey: "claes",
    toMe: true,
    subject: "Welkom in Marketing",
    preview: "Syllabus staat op Toledo. Geen bijlage in deze mail.",
    when: "24 aug",
    bucket: "older",
    unread: false,
    flagged: false,
    hasAttachment: false,
    folder: "lesmateriaal",
    invite: false,
  },
  {
    id: "m-deadline",
    from: "Coördinatie BM",
    fromKey: "coord",
    toMe: true,
    subject: "Deadline verslag professionele vaardigheden",
    preview: "Inleveren via Toledo, geen mail naar de docent.",
    when: "vandaag",
    bucket: "today",
    unread: true,
    flagged: true,
    hasAttachment: false,
    folder: "inbox",
    invite: false,
  },
  {
    id: "m-pdf-other",
    from: "Karel Van Acker",
    fromKey: "acker",
    toMe: true,
    subject: "Slides H3",
    preview: "Pdf van de slides, ter info.",
    when: "vandaag",
    bucket: "today",
    unread: false,
    flagged: false,
    hasAttachment: true,
    attachmentName: "H3-slides.pdf",
    folder: "inbox",
    invite: false,
  },
  {
    id: "m-cc",
    from: "Lien Peeters",
    fromKey: "lien",
    toMe: false,
    subject: "Vraag aan de docent over de case",
    preview: "Je staat in CC. De vraag ging naar Claes, jij mag meelezen.",
    when: "do 2 sep",
    bucket: "last-week",
    unread: true,
    flagged: false,
    hasAttachment: false,
    folder: "inbox",
    invite: false,
  },
];

const FOLDERS: { id: FolderId; label: string }[] = [
  { id: "inbox", label: "Postvak IN" },
  { id: "lesmateriaal", label: "Lesmateriaal" },
  { id: "project", label: "Projectgroep" },
];

type Parsed = {
  from?: string;
  subject?: string;
  hasAttachment?: boolean;
  unread?: boolean;
  received?: Bucket | "this-week";
  words: string[];
  phrases: string[];
};

function parseQuery(raw: string): Parsed {
  let rest = raw.trim();
  const parsed: Parsed = { words: [], phrases: [] };

  const take = (re: RegExp, assign: (v: string) => void) => {
    rest = rest.replace(re, (_, v: string) => {
      assign(v);
      return " ";
    });
  };

  take(/\breceived:"([^"]+)"/gi, (v) => {
    const t = v.toLowerCase();
    if (t.includes("today")) parsed.received = "today";
    else if (t.includes("last")) parsed.received = "last-week";
    else if (t.includes("week")) parsed.received = "this-week";
  });
  take(/\breceived:(\S+)/gi, (v) => {
    const t = v.toLowerCase().replace(/_/g, " ");
    if (t.includes("today")) parsed.received = "today";
    else if (t.includes("last")) parsed.received = "last-week";
    else if (t.includes("week")) parsed.received = "this-week";
  });
  take(/\bfrom:(\S+)/gi, (v) => {
    parsed.from = v.toLowerCase();
  });
  take(/\bsubject:(\S+)/gi, (v) => {
    parsed.subject = v.toLowerCase();
  });
  take(/\bhasattachment:(yes|true|no|false)/gi, (v) => {
    parsed.hasAttachment = /yes|true/i.test(v);
  });
  take(/\bread:(no|false|yes|true)/gi, (v) => {
    parsed.unread = /no|false/i.test(v);
  });

  rest = rest.replace(/"([^"]+)"/g, (_, p: string) => {
    parsed.phrases.push(p.toLowerCase());
    return " ";
  });

  parsed.words = rest
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .filter((w) => w && w !== "and");
  return parsed;
}

function bucketOk(mail: Mail, received?: Parsed["received"]) {
  if (!received) return true;
  if (received === "today") return mail.bucket === "today";
  if (received === "last-week") return mail.bucket === "last-week";
  if (received === "this-week")
    return mail.bucket === "today" || mail.bucket === "this-week";
  return true;
}

function matches(
  mail: Mail,
  parsed: Parsed,
  filters: { unread: boolean; files: boolean; toMe: boolean; invite: boolean },
  folder: FolderId,
  scope: Scope,
  searching: boolean,
) {
  if ((!searching || scope === "current") && mail.folder !== folder) return false;
  if (filters.unread && !mail.unread) return false;
  if (filters.files && !mail.hasAttachment) return false;
  if (filters.toMe && !mail.toMe) return false;
  if (filters.invite && !mail.invite) return false;
  if (!searching) return true;

  if (parsed.from && !mail.fromKey.includes(parsed.from) && !mail.from.toLowerCase().includes(parsed.from))
    return false;
  if (parsed.subject && !mail.subject.toLowerCase().includes(parsed.subject))
    return false;
  if (parsed.hasAttachment === true && !mail.hasAttachment) return false;
  if (parsed.hasAttachment === false && mail.hasAttachment) return false;
  if (parsed.unread && !mail.unread) return false;
  if (!bucketOk(mail, parsed.received)) return false;

  const hay = `${mail.from} ${mail.subject} ${mail.preview} ${mail.attachmentName ?? ""}`.toLowerCase();
  for (const p of parsed.phrases) {
    if (!hay.includes(p)) return false;
  }
  for (const w of parsed.words) {
    if (!hay.includes(w)) return false;
  }
  return true;
}

export function InboxSimulator() {
  const mission1Done = useSearchProgress((s) => s.mission1);
  const mission2Done = useSearchProgress((s) => s.mission2);
  const setMission1 = useSearchProgress((s) => s.setMission1);
  const setMission2 = useSearchProgress((s) => s.setMission2);

  const [mission, setMission] = useState<1 | 2>(mission1Done ? 2 : 1);
  const [folder, setFolder] = useState<FolderId>("inbox");
  const [scope, setScope] = useState<Scope>("current");
  const [query, setQuery] = useState("");
  const [committed, setCommitted] = useState("");
  const [filters, setFilters] = useState({
    unread: false,
    files: false,
    toMe: false,
    invite: false,
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [hint, setHint] = useState("");
  const [shake, setShake] = useState(false);

  const searching = committed.trim().length > 0;
  const parsed = useMemo(() => parseQuery(committed), [committed]);

  const results = useMemo(
    () =>
      MAILS.filter((m) =>
        matches(m, parsed, filters, folder, scope, searching),
      ),
    [parsed, filters, folder, scope, searching],
  );

  useEffect(() => {
    if (mission1Done && mission === 1) setMission(2);
  }, [mission1Done, mission]);

  function flash(msg: string) {
    setHint(msg);
    setShake(true);
    window.setTimeout(() => setShake(false), 220);
  }

  function runSearch(value = query) {
    setCommitted(value.trim());
    setSelected(null);
    setHint("");
  }

  function clearSearch() {
    setQuery("");
    setCommitted("");
    setSelected(null);
    setHint("");
  }

  function insertToken(token: string) {
    const next = query.trim() ? `${query.trim()} ${token}` : token;
    setQuery(next);
  }

  function onSelect(mail: Mail) {
    setSelected(mail.id);
    if (mission === 1) {
      if (mail.id === TARGET_ID) {
        setMission1();
        setMission(2);
        setHint("");
        return;
      }
      flash(
        "Dat is niet de briefing. Zoek de pdf van Claes — opdracht 1, vorige week.",
      );
    }
  }

  useEffect(() => {
    if (mission !== 2 || mission2Done) return;
    if (searching || folder !== "inbox" || !filters.unread) return;
    const unreadInbox = MAILS.filter((m) => m.folder === "inbox" && m.unread);
    if (results.length === unreadInbox.length) {
      setMission2();
    }
  }, [
    mission,
    mission2Done,
    searching,
    folder,
    filters.unread,
    results.length,
    setMission2,
  ]);

  const filterCount = Object.values(filters).filter(Boolean).length;
  const done = mission1Done && mission2Done;

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-elevated)]">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            Oefeninbox · hogeschoolaccount
          </p>
          <h3 className="mt-1 font-display text-xl font-medium text-fg">
            {done
              ? "Beide opdrachten klaar"
              : mission === 1
                ? "Opdracht 1 — vind de pdf"
                : "Opdracht 2 — alleen ongelezen"}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
            {done
              ? "Je hebt het bereik verruimd, een operator gebruikt, en een lijstfilter gezet."
              : mission === 1
                ? "Zoek de briefing van Annemie Claes: opdracht 1 Marketing, met pdf, vorige week. Ze ligt niet in Postvak IN."
                : "Wis de zoekopdracht. Open Postvak IN. Zet Filter op Ongelezen."}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-md bg-event-soft px-3 py-2 text-sm text-primary">
          <Search className="size-4" aria-hidden />
          <span>
            {done
              ? "Klaar"
              : mission === 1
                ? "Zoeken + bereik"
                : "Lijstfilter"}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[13.5rem_minmax(0,1fr)_18rem]">
        <aside className="border-b border-border bg-surface-2 p-3 lg:border-r lg:border-b-0">
          <p className="px-2 pb-2 text-xs font-medium tracking-wide text-muted uppercase">
            Mappen
          </p>
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFolder(f.id);
                setSelected(null);
              }}
              className={cn(
                "flex h-11 w-full items-center rounded-sm px-3 text-left text-sm",
                folder === f.id
                  ? "bg-event-soft text-primary"
                  : "text-muted hover:bg-bg-warm hover:text-fg",
              )}
            >
              {f.label}
            </button>
          ))}
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 border-b border-border p-3">
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") runSearch();
                  }}
                  placeholder="Zoeken"
                  aria-label="Zoeken"
                  className="h-11 w-full rounded-sm bg-bg px-10 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-ring"
                />
                {query && (
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-muted hover:bg-bg-warm"
                    aria-label="Zoekopdracht wissen"
                    onClick={clearSearch}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setScopeOpen((o) => !o)}
                  className="flex h-11 items-center gap-1 rounded-sm bg-bg px-3 text-sm shadow-[var(--shadow-border)]"
                >
                  {scope === "all" ? "Alle mappen" : "Huidige map"}
                  <ChevronDown className="size-4 text-muted" />
                </button>
                {scopeOpen && (
                  <div className="absolute top-12 right-0 z-10 w-44 rounded-md bg-surface p-1 shadow-[var(--shadow-elevated)]">
                    <button
                      type="button"
                      className="flex h-10 w-full items-center rounded-sm px-3 text-left text-sm hover:bg-bg-warm"
                      onClick={() => {
                        setScope("current");
                        setScopeOpen(false);
                      }}
                    >
                      Huidige map
                    </button>
                    <button
                      type="button"
                      className="flex h-10 w-full items-center rounded-sm px-3 text-left text-sm hover:bg-bg-warm"
                      onClick={() => {
                        setScope("all");
                        setScopeOpen(false);
                      }}
                    >
                      Alle mappen
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                "from:Claes",
                "hasattachment:yes",
                "received:\"last week\"",
                "read:no",
                "subject:opdracht",
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => insertToken(t)}
                  className="h-9 rounded-sm bg-bg-warm px-2.5 font-mono text-xs text-fg"
                >
                  {t}
                </button>
              ))}
              <Button type="button" size="sm" onClick={() => runSearch()}>
                Zoeken
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
            <p className="text-xs text-muted">
              {searching
                ? `${results.length} resultaten`
                : `${results.length} in ${FOLDERS.find((f) => f.id === folder)?.label}`}
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((o) => !o)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-sm px-3 text-sm",
                  filterCount
                    ? "bg-event-soft text-primary"
                    : "text-muted hover:bg-bg-warm",
                )}
              >
                <Filter className="size-4" />
                Filter
                {filterCount > 0 && (
                  <span className="tabular-nums">{filterCount}</span>
                )}
              </button>
              {filterOpen && (
                <div className="absolute top-11 right-0 z-10 w-52 rounded-md bg-surface p-1 shadow-[var(--shadow-elevated)]">
                  {(
                    [
                      ["unread", "Ongelezen"],
                      ["files", "Heeft bestanden"],
                      ["toMe", "Aan mij"],
                      ["invite", "Agenda-uitnodiging"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setFilters((f) => ({ ...f, [key]: !f[key] }))
                      }
                      className={cn(
                        "flex h-10 w-full items-center rounded-sm px-3 text-left text-sm",
                        filters[key]
                          ? "bg-event-soft text-primary"
                          : "hover:bg-bg-warm",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ul className="max-h-[28rem] divide-y divide-border overflow-y-auto">
            {results.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-muted">
                Geen berichten. Controleer het zoekbereik of wis een filter.
              </li>
            ) : (
              results.map((mail) => (
                <li key={mail.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(mail)}
                    className={cn(
                      "flex w-full gap-3 px-3 py-3 text-left hover:bg-bg-warm",
                      selected === mail.id && "bg-event-soft",
                      mail.unread && "font-medium",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        mail.unread ? "bg-primary" : "bg-transparent",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm text-fg">
                          {mail.from}
                        </span>
                        <span className="shrink-0 text-xs text-subtle">
                          {mail.when}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 truncate text-sm">
                        {mail.hasAttachment && (
                          <Paperclip className="size-3.5 shrink-0 text-muted" />
                        )}
                        {mail.flagged && (
                          <Star className="size-3.5 shrink-0 text-warn" />
                        )}
                        <span className="truncate">{mail.subject}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {mail.preview}
                      </span>
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <aside className="border-t border-border bg-surface-2 p-4 lg:border-t-0 lg:border-l">
          <div className={cn("space-y-3", shake && "shake")}>
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              Coach
            </p>
            {done ? (
              <>
                <p className="font-display text-lg text-fg">
                  Zoeken én filteren: beide zitten.
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  De pdf stond in Lesmateriaal — daarom Alle mappen. Ongelezen
                  is een bril op de lijst, geen zoekopdracht.
                </p>
                <div className="flex items-center gap-2 rounded-md bg-success-soft px-3 py-2 text-sm text-success">
                  <Check className="size-4" />
                  Opgeslagen in je voortgang
                </div>
              </>
            ) : mission === 1 ? (
              <>
                <p className="font-display text-lg text-fg">
                  Stapel operators, verruim het bereik.
                </p>
                <ol className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>1. Zet Alle mappen</li>
                  <li>2. Klik from:Claes en hasattachment:yes</li>
                  <li>3. Zoeken, daarna de briefing aanklikken</li>
                </ol>
                <p className="text-xs leading-relaxed text-subtle">
                  received:"last week" is optioneel maar snijdt extra
                  ruis weg.
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-lg text-fg">
                  Nu de bril, niet de zoekbalk.
                </p>
                <ol className="space-y-2 text-sm leading-relaxed text-muted">
                  <li>1. Kruisje: zoekopdracht wissen</li>
                  <li>2. Map: Postvak IN</li>
                  <li>3. Filter → Ongelezen</li>
                </ol>
              </>
            )}
            {hint && (
              <p className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
                {hint}
              </p>
            )}
            {selected && (
              <SelectedPane
                mail={MAILS.find((m) => m.id === selected) ?? null}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SelectedPane({ mail }: { mail: Mail | null }) {
  if (!mail) return null;
  const folder = FOLDERS.find((f) => f.id === mail.folder)?.label;
  return (
    <div className="rounded-md bg-surface p-3 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium text-fg">{mail.subject}</p>
      <p className="mt-1 text-xs text-muted">
        {mail.from} · {folder}
      </p>
      {mail.hasAttachment && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
          <Paperclip className="size-3.5" />
          {mail.attachmentName}
        </p>
      )}
    </div>
  );
}
