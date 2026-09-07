export const SEARCH_CHECKLIST = [
  {
    id: "s1",
    text: "Ik klik in het zoekvak bovenaan (of druk Ctrl+E) — niet in een willekeurige map-zoekbalk.",
  },
  {
    id: "s2",
    text: "Ik kies het zoekbereik: Huidige map, Huidige postvak of Alle mappen.",
  },
  {
    id: "s3",
    text: "Ik gebruik een operator zonder spatie na de dubbele punt: from:Claes, niet from: Claes.",
  },
  {
    id: "s4",
    text: "Meerwoorden tussen aanhalingstekens: received:\"last week\" of \"opdracht 1\".",
  },
  {
    id: "s5",
    text: "AND, OR en NOT schrijf ik in hoofdletters.",
  },
  {
    id: "s6",
    text: "Filter (Ongelezen, Heeft bestanden) gebruik ik om de lijst te versmallen, zoeken om iets terug te vinden.",
  },
  {
    id: "s7",
    text: "Gericht / Overige is geen filter. Dat is een inbox-indeling — uitzetten als mails ‘verdwijnen’.",
  },
  {
    id: "s8",
    text: "Ik wis de zoekopdracht met het kruisje als ik klaar ben, anders blijft Outlook in zoekmodus.",
  },
] as const;

export const SEARCH_PITFALLS = [
  {
    title: "Verkeerd zoekbereik",
    problem:
      "Je zoekt in Postvak IN. De opdracht van de docent ligt in de map Lesmateriaal. Resultaat: 0 berichten.",
    fix: "Open het menu naast het zoekvak en kies Alle mappen (of de map waarin je denkt dat het zit).",
  },
  {
    title: "Spatie na de dubbele punt",
    problem:
      "from: Claes is voor Outlook twee losse woorden, geen operator. Je krijgt ruis of niets.",
    fix: "Plak vast: from:Claes of from:annemie.claes. Zonder spatie.",
  },
  {
    title: "Gericht-inbox verwarren met een filter",
    problem:
      "Nieuwsbrieven en sommige mails van de hogeschool belanden in Overige. Het lijkt alsof Outlook ze niet vindt.",
    fix: "Kijk naar Overige, of zoek in Alle mappen. Gericht is een indeling, geen zoekfilter.",
  },
  {
    title: "Enkel een vaag woord",
    problem:
      "Je typt marketing en krijgt 80 hits: lessen, nieuwsbrieven, de projectgroep.",
    fix: "Stapel: from:Claes subject:opdracht hasattachment:yes. Elke operator snijdt ruis weg.",
  },
  {
    title: "Zoekmodus niet afgesloten",
    problem:
      "Je inbox toont nog steeds de 3 zoekresultaten. Nieuwe mail lijkt niet binnen te komen.",
    fix: "Klik op het kruisje in het zoekvak. Dan ben je terug in de gewone map.",
  },
] as const;

export const SEARCH_SCENARIOS = [
  {
    title: "Opdracht van de docent met bijlage",
    when: "Je weet de naam, niet de map",
    query: "from:Claes hasattachment:yes",
    tip: "Zet het bereik op Alle mappen. Heeft de docent meerdere mails, voeg subject:opdracht toe.",
  },
  {
    title: "Ongelezen voor de les",
    when: "Tien minuten, Postvak IN puilt uit",
    query: "Filter → Ongelezen",
    tip: "Geen zoekopdracht nodig. Het Filter-menu boven de lijst toont alleen wat je nog niet opende.",
  },
  {
    title: "Pdf’s van deze maand",
    when: "Verslagen en slides terugzoeken",
    query: "hasattachment:yes received:\"this month\"",
    tip: "attachment:pdf is strenger als je alleen pdf’s wilt, niet Excel. Werkt in web en nieuwe Outlook.",
  },
  {
    title: "Agenda-uitnodiging kwijt",
    when: "Iemand stuurde een meeting, jij ziet ze niet in de agenda",
    query: "Filter → Heeft agenda-uitnodigingen  · of in Agenda: organizer:naam",
    tip: "Mail en agenda zijn aparte zoekvakken. In Agenda: is:recurring voor reeksen.",
  },
] as const;

export const OPERATORS = [
  {
    token: "from:",
    example: "from:Claes",
    use: "Alles van die afzender, ook als de naam in de mail zelf voorkomt.",
  },
  {
    token: "subject:",
    example: "subject:opdracht",
    use: "Alleen de onderwerpregel. Handig als het woord ook in handtekeningen zit.",
  },
  {
    token: "hasattachment:yes",
    example: "hasattachment:yes",
    use: "Berichten mét een bestand. Gelijk aan hasattachment:true.",
  },
  {
    token: "received:",
    example: "received:\"last week\"",
    use: "today, yesterday, last week, this month. Meerwoorden tussen aanhalingstekens.",
  },
  {
    token: "read:no",
    example: "read:no",
    use: "Ongelezen. Zelfde idee als het Filter-menu, maar combineerbaar met from:.",
  },
  {
    token: "\"…\"",
    example: "\"opdracht 1\"",
    use: "Exacte woordvolgorde. Zonder aanhalingstekens zoekt Outlook de woorden los.",
  },
] as const;

export const SEARCH_QUIZ = [
  {
    id: "sq1",
    question:
      "Je zoekt de pdf van prof. Claes. Je typt from: Claes (met spatie). Wat gebeurt er?",
    choices: [
      "Outlook gebruikt de operator Van en toont alleen haar mails",
      "De spatie breekt de operator: Outlook zoekt losse woorden",
      "Outlook weigert de zoekopdracht",
    ],
    answer: 1,
    why: "Geen spatie na de dubbele punt. Correct is from:Claes.",
  },
  {
    id: "sq2",
    question:
      "De opdracht zit in de map Lesmateriaal. Jij zoekt in Postvak IN en krijgt niets. Eerste check?",
    choices: [
      "Het zoekbereik: kies Alle mappen of open Lesmateriaal",
      "Je account is stuk, meld je af en aan",
      "Gebruik hoofdletters in de naam van de docent",
    ],
    answer: 0,
    why: "Zoeken is standaard beperkt tot de map die openstaat. Vergroot het bereik.",
  },
  {
    id: "sq3",
    question: "Wat is het verschil tussen Filter en Zoeken?",
    choices: [
      "Er is geen verschil",
      "Filter versmalt de open map (ongelezen, bijlagen). Zoeken vindt iets, ook met operators",
      "Filter werkt alleen in de klassieke Windows-app",
    ],
    answer: 1,
    why: "Filter is een bril op de lijst. Zoeken is een vraag aan het postvak.",
  },
  {
    id: "sq4",
    question: "Welke zoekopdracht vindt mails van vorige week mét bijlage?",
    choices: [
      "bijlage vorige week",
      "hasattachment:yes received:\"last week\"",
      "filter:pdf AND week-1",
    ],
    answer: 1,
    why: "Operators in het Engels, datums met meerdere woorden tussen aanhalingstekens. AND mag, maar is hier overbodig: spaties betekenen én.",
  },
  {
    id: "sq5",
    question:
      "Je ziet mails van de studentenkring niet in Postvak IN, wel soms in Overige. Oorzaak?",
    choices: [
      "De mails zijn verwijderd",
      "De indeling Gericht / Overige splitst je inbox — dat is geen zoekfilter",
      "hasattachment:yes staat per ongeluk aan",
    ],
    answer: 1,
    why: "Gericht is een inbox-weergave. Open Overige of zoek in alle mappen.",
  },
  {
    id: "sq6",
    question:
      "AND, OR en NOT in een zoekopdracht. Hoe moet je ze schrijven?",
    choices: [
      "In hoofdletters: opdracht AND bijlage NOT nieuwsbrief",
      "In kleine letters, anders negeert Outlook ze",
      "Alleen in de klassieke app, nooit op het web",
    ],
    answer: 0,
    why: "Logische operatoren moeten in hoofdletters. Kleine letters telt Outlook als gewone woorden.",
  },
] as const;

export type SearchPlatform = "web" | "new" | "classic";

export const SEARCH_PLATFORM_STEPS: Record<
  SearchPlatform,
  { title: string; steps: { title: string; body: string }[] }
> = {
  web: {
    title: "Outlook op het web",
    steps: [
      {
        title: "Zoekvak bovenaan",
        body: "Ga naar outlook.office.com. Het vak Zoeken staat in de middenbalk. Typ of druk niet per ongeluk in de mappenlijst.",
      },
      {
        title: "Bereik kiezen",
        body: "Klik in het vak. Kies Huidige map of een breder bereik. Docentenmail staat vaak niet in Postvak IN.",
      },
      {
        title: "Filters of operators",
        body: "Rechts in het zoekvak: Filters (trechter). Of typ from:naam hasattachment:yes en druk Enter.",
      },
      {
        title: "Lijstfilter",
        body: "Boven de berichtenlijst: Filter. Ongelezen, Gemarkeerd, Aan mij, Heeft bestanden, Vermeldt mij, agenda-uitnodigingen.",
      },
      {
        title: "Wissen",
        body: "Kruisje in het zoekvak. Anders blijf je in de resultaten en lijkt nieuwe mail weg.",
      },
    ],
  },
  new: {
    title: "Nieuwe Outlook (app)",
    steps: [
      {
        title: "Ctrl+E of klikken",
        body: "Het zoekvak zit bovenaan het venster. Recente zoekopdrachten en contacten verschijnen als suggesties.",
      },
      {
        title: "Server-side zoeken",
        body: "De nieuwe app zoekt op de server van Microsoft 365. Oude mail kan ontbreken als die niet meer in de cloud-index zit.",
      },
      {
        title: "Filters na de zoekactie",
        body: "Na Enter: knop Filters boven de resultaten. Afzender, datum, bijlagen, map. Chips kun je één voor één wegklikken.",
      },
      {
        title: "Geavanceerd",
        body: "Trechter of chevron rechts in het zoekvak opent velden: Van, Onderwerp, datum, heeft bijlagen — zonder syntax.",
      },
      {
        title: "Agenda apart",
        body: "Open Agenda en zoek daar. organizer:naam of is:recurring werkt alleen in een agendamap.",
      },
    ],
  },
  classic: {
    title: "Klassieke Outlook (Windows)",
    steps: [
      {
        title: "Zoekvak of Ctrl+E",
        body: "Bovenaan de map. Zodra je klikt, verschijnt het lint Zoeken met de groep Verfijnen.",
      },
      {
        title: "Verfijnen op het lint",
        body: "Van, Onderwerp, Heeft bijlagen, Ongelezen, Deze week — knoppen i.p.v. operators. Combineer ze.",
      },
      {
        title: "Geavanceerd zoeken",
        body: "Pijltje rechts in het zoekvak. Extra velden en locatie (huidige map / submappen / alle Outlook-items).",
      },
      {
        title: "Operators blijven werken",
        body: "Je mag nog altijd from: en hasattachment:yes typen. AND / OR / NOT in hoofdletters.",
      },
      {
        title: "Index",
        body: "Klassiek gebruikt een lokale zoekindex. Als resultaten ontbreken: Windows-zoekindex controleren, of wachten tot Outlook klaar is met indexeren.",
      },
    ],
  },
};
