export const CHECKLIST = [
  {
    id: "c1",
    text: "Ik open Agenda (niet Mail) en kies Nieuwe gebeurtenis.",
  },
  {
    id: "c2",
    text: "Ik vul titel, datum, start- en einduur in vóór ik herhalen aanzet.",
  },
  {
    id: "c3",
    text: "Ik kies het juiste patroon: wekelijks, werkdagen, tweewekelijks of aangepast.",
  },
  {
    id: "c4",
    text: "Ik zet altijd een einddatum of aantal keren — nooit ‘geen einddatum’ voor een semester.",
  },
  {
    id: "c5",
    text: "Ik nodig alleen mensen uit als het een vergadering is. Voor mijn eigen blok: geen deelnemers.",
  },
  {
    id: "c6",
    text: "Ik controleer de reeks in maandweergave voordat ik opslaan of verzenden kies.",
  },
  {
    id: "c7",
    text: "Als één keer uitvalt: Deze gebeurtenis. Als het uur wijzigt voor altijd: Hele reeks.",
  },
  {
    id: "c8",
    text: "Ik stuur een update van de bestaande reeks, nooit een tweede nieuwe uitnodiging.",
  },
] as const;

export const PITFALLS = [
  {
    title: "Geen einddatum",
    problem:
      "Je zet ‘Studieblok statistiek’ wekelijks zonder einde. Over twee jaar staat het nog in je agenda — en in die van je groepsgenoten.",
    fix: "Kies Eindigt op en zet de laatste lesweek of de examendatum. Voor een semester volstaat meestal eind januari of eind juni.",
  },
  {
    title: "Tweede uitnodiging in plaats van update",
    problem:
      "Je wijzigt het lokaal en maakt een nieuwe vergadering. Iedereen heeft nu twee reeksen.",
    fix: "Open de bestaande reeks → Hele reeks → pas aan → Update verzenden.",
  },
  {
    title: "Hele reeks gewist i.p.v. één keer",
    problem:
      "De les van 23 september valt uit. Je kiest Alle gebeurtenissen. Weg is het hele semester.",
    fix: "Klik de ene dag aan → Deze gebeurtenis → Verwijderen. De rest blijft staan.",
  },
  {
    title: "Afspraak i.p.v. vergadering (of omgekeerd)",
    problem:
      "Je plant de projectgroep alleen voor jezelf. Niemand anders ziet het. Of je nodigt per ongeluk de hele klas uit.",
    fix: "Alleen jij? Afspraak, geen deelnemers. Anderen erbij? Deelnemers uitnodigen — dan wordt het een vergadering.",
  },
  {
    title: "Verkeerde tijdzone of ‘hele dag’",
    problem:
      "Een online gastcollege staat als hele dag, of je telefoon staat op een andere tijdzone tijdens Erasmus.",
    fix: "Zet Hele dag uit voor uurblokken. Controleer de tijdzone onder Meer opties.",
  },
] as const;

export const SCENARIOS = [
  {
    title: "Wekelijkse projectgroep",
    when: "Elke woensdag 16:00–17:30 tot de deadline",
    pattern: "Wekelijks op woensdag",
    end: "Eindigt op de dag van de presentatie",
    tip: "Nodig groepsgenoten uit. Zet het Teams-gesprek of het lokaal in Locatie. Eén reeks voor iedereen.",
  },
  {
    title: "Vaste studieblokken",
    when: "Maandag tot donderdag 8:30–10:00 tijdens de blok",
    pattern: "Wekelijks, dagen ma–do aanvinken",
    end: "Eindigt op de dag van het laatste examen",
    tip: "Geen deelnemers — dit is een afspraak voor jezelf. Kies Toon als: Bezet zodat niemand je inplant.",
  },
  {
    title: "Tweewekelijkse stagecheck",
    when: "Om de twee weken op vrijdag 9:00 met je stagementor",
    pattern: "Aangepast → Wekelijks, elke 2 weken, vrijdag",
    end: "Eindigt op de laatste stagedag",
    tip: "Stuur als vergadering zodat de mentor accepteert. Zet een herinnering 15 minuten ervoor.",
  },
  {
    title: "Maandelijkse werkgroep BM",
    when: "Elke eerste maandag van de maand, 12:30–13:15",
    pattern: "Maandelijks · de eerste maandag",
    end: "Eindigt in juni, of na 10 keer",
    tip: "Kies niet ‘dag 1 van de maand’ — 1 oktober kan een woensdag zijn. Kies de weekdag.",
  },
] as const;

export const PATTERNS = [
  {
    id: "daily",
    name: "Dagelijks",
    use: "Korte sprint, bv. 10 dagen oefenen voor een toets.",
    how: "Niet herhalen → Dagelijks. Of Aangepast → elke 2 dagen.",
  },
  {
    id: "weekdays",
    name: "Werkdagen",
    use: "Ma–vr, nooit in het weekend. Ideaal voor studieblokken.",
    how: "Kies Werkdagen (ma–vr). Weekend blijft vrij.",
  },
  {
    id: "weekly",
    name: "Wekelijks",
    use: "Vaste les, projectgroep, jobstudent-shift op dezelfde dag.",
    how: "Wekelijks op [dag]. Vink extra dagen aan als het twee keer per week is.",
  },
  {
    id: "biweekly",
    name: "Tweewekelijks",
    use: "Om de andere week: intervisie, stage, sport.",
    how: "Aangepast → Wekelijks → elke 2 weken → juiste dag.",
  },
  {
    id: "monthly",
    name: "Maandelijks",
    use: "Raad van de studentenkring, maandelijkse check-in.",
    how: "De eerste / tweede / laatste [weekdag] van de maand — niet een vast dagnummer als de weekdag telt.",
  },
] as const;

export const QUIZ = [
  {
    id: "q1",
    question:
      "Je plant ‘Projectgroep Marketing’ en nodigt drie medestudenten uit. Wat maak je?",
    choices: [
      "Een afspraak — niemand anders ziet die",
      "Een vergadering — iedereen krijgt één uitnodiging voor de hele reeks",
      "Vier aparte afspraken, één per persoon",
    ],
    answer: 1,
    why: "Zodra je deelnemers toevoegt, wordt het een vergadering. Outlook stuurt één uitnodiging voor de hele reeks.",
  },
  {
    id: "q2",
    question:
      "De les van 23 september valt uit. De rest van het semester gaat door. Wat kies je?",
    choices: [
      "Deze gebeurtenis, daarna verwijderen",
      "Alle gebeurtenissen in de reeks",
      "Niet herhalen uitzetten op de hele reeks",
    ],
    answer: 0,
    why: "‘Deze gebeurtenis’ raakt alleen die dag. De rest van de reeks blijft staan.",
  },
  {
    id: "q3",
    question: "Je wilt om de twee weken op dinsdag samenkomen. Welk patroon?",
    choices: [
      "Wekelijks op dinsdag",
      "Maandelijks, dag 14",
      "Aangepast → Wekelijks → elke 2 weken → dinsdag",
    ],
    answer: 2,
    why: "Tweewekelijks zit onder Aangepast: interval 2 weken, juiste weekdag aanvinken.",
  },
  {
    id: "q4",
    question:
      "Het lokaal van de wekelijkse werkgroep wijzigt vanaf nu voor altijd. Wat doe je?",
    choices: [
      "Een nieuwe reeks maken en de oude laten staan",
      "Hele reeks openen, locatie aanpassen, Update verzenden",
      "Alleen de volgende keer wijzigen",
    ],
    answer: 1,
    why: "Wijzig de bestaande reeks en stuur een update. Een tweede reeks geeft dubbels in ieders agenda.",
  },
  {
    id: "q5",
    question:
      "Waarom zet je bij een semesterreeks altijd een einddatum?",
    choices: [
      "Anders blijft de reeks doorlopen, ook na examens of na je studies",
      "Outlook weigert opslaan zonder einddatum",
      "De hogeschool eist dat technisch",
    ],
    answer: 0,
    why: "Zonder einde blijft de reeks oneindig doorgaan — bij jou én bij iedereen die je uitnodigde.",
  },
  {
    id: "q6",
    question:
      "In de nieuwe Outlook-webagenda wil je vanaf april een ander uur, de eerdere keren blijven. Wat kies je?",
    choices: [
      "Deze gebeurtenis",
      "Deze en volgende gebeurtenissen",
      "Alle gebeurtenissen, en de oude uren manueel terugzetten",
    ],
    answer: 1,
    why: "‘Deze en volgende’ splitst de reeks vanaf die datum. Klassiek Outlook heeft die knop niet altijd — daar eindig je de oude reeks en start je een nieuwe.",
  },
] as const;

export type Platform = "web" | "new" | "classic";

export const PLATFORM_STEPS: Record<
  Platform,
  { title: string; steps: { title: string; body: string }[] }
> = {
  web: {
    title: "Outlook op het web",
    steps: [
      {
        title: "Open je schoolagenda",
        body: "Ga naar outlook.office.com en meld je aan met je hogeschoolaccount. Klik links op Agenda — niet op Mail.",
      },
      {
        title: "Nieuwe gebeurtenis",
        body: "Kies Nieuwe gebeurtenis. Vul titel, datum, start- en einduur in. Klik Meer opties als het venster te klein is.",
      },
      {
        title: "Zet herhalen aan",
        body: "Naast de datum staat Niet herhalen. Open dat menu. Kies een preset of Aangepast.",
      },
      {
        title: "Bepaal het einde",
        body: "In Aangepast kies je Eindigt op (datum) of na een aantal keren. Voor een semester: altijd een einde.",
      },
      {
        title: "Deelnemers of niet",
        body: "Alleen jij: niets invullen bij Deelnemers uitnodigen, daarna Opslaan. Anderen erbij: namen toevoegen en Verzenden.",
      },
    ],
  },
  new: {
    title: "Nieuwe Outlook (app)",
    steps: [
      {
        title: "Open Agenda",
        body: "Start Outlook en kies Agenda in de linkerbalk. Rechtsboven kun je controleren of je in de nieuwe Outlook zit.",
      },
      {
        title: "Nieuwe gebeurtenis",
        body: "Klik Nieuwe gebeurtenis. Vul titel in. Stel datum en uren in, of kies een voorstel via de Planningsassistent.",
      },
      {
        title: "Terugkerend",
        body: "Klik op Terugkerend (herhaal-icoon). In het venster Herhalen kies je het interval. Sla het patroon op.",
      },
      {
        title: "Locatie en Teams",
        body: "Vul een lokaal in of zet de Teams-vergadering-schakelaar aan. Dat blijft voor de hele reeks gelden.",
      },
      {
        title: "Verzenden of opslaan",
        body: "Met deelnemers: Verzenden. Zonder: Opslaan. De reeks verschijnt als herhaalde blokken in je agenda.",
      },
    ],
  },
  classic: {
    title: "Klassieke Outlook (Windows)",
    steps: [
      {
        title: "Nieuwe afspraak of vergadering",
        body: "In Agenda: Nieuwe afspraak (alleen jij) of Nieuwe vergadering (Ctrl+Shift+Q) als er anderen bij moeten.",
      },
      {
        title: "Vul de kop in",
        body: "Onderwerp, locatie, start en einde. Bij een vergadering: adressen in Aan, of gebruik de Planningsassistent.",
      },
      {
        title: "Herhaling",
        body: "Op het lint: Herhaling (rond pijltje) of Ctrl+G. Het venster Afspraakherhaling opent.",
      },
      {
        title: "Patroon en bereik",
        body: "Kies Dagelijks / Wekelijks / Maandelijks / Jaarlijks. Onder Bereik van herhaling: Eindigt op of Eindigt na N keer.",
      },
      {
        title: "OK en verzenden",
        body: "OK maakt van het tabblad Vergadering een Vergaderreeks. Daarna Verzenden of Opslaan en sluiten.",
      },
    ],
  },
};
