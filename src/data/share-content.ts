export const SHARE_CHECKLIST = [
  {
    id: "s1",
    text: "Ik open Agenda en zoek de juiste agenda in de linkerbalk.",
  },
  {
    id: "s2",
    text: "Ik klik rechts op de agendanaam en kies Delen.",
  },
  {
    id: "s3",
    text: "Ik voeg de e-mailadressen van de personen in die toegang moeten krijgen.",
  },
  {
    id: "s4",
    text: "Ik kies het juiste permissieniveau: Kan bekijken, Kan bewerken, of Gemachtigde.",
  },
  {
    id: "s5",
    text: "Ik stuur een delen-uitnodiging en ontvang een bevestiging.",
  },
  {
    id: "s6",
    text: "Ik kan de machtiging op elk moment wijzigen of intrekken.",
  },
] as const;

export const SHARE_PITFALLS = [
  {
    title: "Verkeerde agenda gedeeld",
    problem:
      "Je hebt meerdere agenda's (Persoonlijk, Werk, Studie) en deelt per ongeluk je privé-agenda met medestudenten.",
    fix: "Controleer altijd welke agenda je deelt. Je ziet dit bij Delen, boven de namen van de genodigden.",
  },
  {
    title: "Te veel rechten gegeven",
    problem:
      "Je maakt iemand 'Kan bewerken' omdat je niet exact weet wat dat betekent. Ze wijzigen je afspraken zonder toestemming.",
    fix: "Kan bekijken = alleen lezen. Kan bewerken = alles wijzigen. Gemachtigde = namens jou handelingen doen.",
  },
  {
    title: "Gemachtigde krijgt geen notificaties",
    problem:
      "Je maakt iemand gemachtigde, maar hij ziet je uitnodigingen niet of accepteert ze niet automatisch.",
    fix: "Een gemachtigde ziet je Inbox. Zorg dat zij de uitnodiging voor de vergadering accepteert voordat ze namens jou handelt.",
  },
  {
    title: "Delen intrekken vergeten",
    problem:
      "Na het project of stage vergeet je de toegang in te trekken. Oud teamlidenpraktiseren nog steeds in je agenda.",
    fix: "Ga naar Delen, selecteer de persoon, en klik Verwijderen. Klaar.",
  },
  {
    title: "Gemachtigde kan e-mail niet delegeren",
    problem:
      "Je maakt iemand gemachtigde van je agenda, maar ze kunnen ook niet je e-mail delegeren.",
    fix: "Delegatie van e-mail en agenda zijn gescheiden. Beide moet je apart instellen onder Instellingen → Delegaten.",
  },
] as const;

export const SHARE_SCENARIOS = [
  {
    title: "Projectgroepagenda delen",
    when: "Niemand vergeet meer de afspraken",
    permission: "Kan bekijken",
    why: "Groepsgenoten zien de geplande keren, maar kunnen niet zelf dingen toevoegen. Alleen jij (of de groepsleider) wijzigt.",
    tip: "Deel de agendanaam exact - niet je hele privé-agenda.",
  },
  {
    title: "Stagementor machtigen",
    when: "Je stagementor accepteert uitnodigingen namens jou",
    permission: "Gemachtigde",
    why: "Mentoren krijgen rechten om vergaderingen aan te nemen, te verplaatsen, en je mail te beheren.",
    tip: "Dit is sterk — gebruik het alleen voor vertrouwde contacten.",
  },
  {
    title: "Medestudent kan wijzigen",
    when: "Jullie beheren samen de werkgroepagenda",
    permission: "Kan bewerken",
    why: "Beide kunnen afspraken toevoegen, wijzigen en verwijderen.",
    tip: "Goed voor coördinatie, maar risico als iemand iets per ongeluk wist.",
  },
  {
    title: "Assistant krijgt volledige macht",
    when: "Je PA beheert je hele agenda en e-mail",
    permission: "Gemachtigde (agenda + e-mail)",
    why: "Alleen voor zeer vertrouwde personen. Ze kunnen namens jou alles doen.",
    tip: "Dit is voor kantoor — op school zelden nodig.",
  },
] as const;

export const SHARE_PERMISSIONS = [
  {
    name: "Kan bekijken",
    access: "Zien wanneer je bezet bent en details van afspraken",
    edit: "Nee",
    delegate: "Nee",
    use: "Medestudenten, groepsgenoten, publieke projectkalenders",
  },
  {
    name: "Kan bewerken",
    access: "Alle afspraken zien en wijzigen",
    edit: "Ja",
    delegate: "Nee",
    use: "Coauteurs van agenda, groepsleidersaantal",
  },
  {
    name: "Gemachtigde",
    access: "Volledige controle — kan ook namens jou handelen",
    edit: "Ja",
    delegate: "Ja (kan ook jouw mail beheren)",
    use: "Stagementor, assistent, ouders met toestemming",
  },
] as const;

export type SharePermission = "view" | "edit" | "delegate";

export const PLATFORM_SHARE_STEPS: Record<
  "web" | "new" | "classic",
  { title: string; steps: { title: string; body: string }[] }
> = {
  web: {
    title: "Outlook op het web",
    steps: [
      {
        title: "Open Agenda",
        body: "Ga naar outlook.office.com, meld je aan, en klik op Agenda in de linkerbalk.",
      },
      {
        title: "Zoek de agenda in de linkerbalk",
        body: "Je ziet je agenda's onder Mijn agenda's. Rechts ervan staat een puntenmenu (⋯).",
      },
      {
        title: "Klik op Delen",
        body: "Klik op het puntenmenu van de agenda die je wilt delen en selecteer Delen.",
      },
      {
        title: "Voeg contacten toe",
        body: "Vul de e-mailadressen in. Outlook stelt voor uit je contacten.",
      },
      {
        title: "Kies het permissieniveau",
        body: "Kan bekijken, Kan bewerken, of Gemachtigde. Lees de beschrijving goed.",
      },
      {
        title: "Verstuur",
        body: "Klik Delen of Uitnodigen. De persoon krijgt een e-mail met de uitnodiging.",
      },
    ],
  },
  new: {
    title: "Nieuwe Outlook (app)",
    steps: [
      {
        title: "Open Agenda",
        body: "Start Outlook en kies Agenda in de linkerbalk.",
      },
      {
        title: "Rechts op de agendanaam klikken",
        body: "Onder Mijn agenda's zie je je agenda's. Rechts staat een drie-puntenmenu.",
      },
      {
        title: "Kies Delen",
        body: "Klik het menu en selecteer Delen met andere personen.",
      },
      {
        title: "Voeg deelnemers toe",
        body: "Type e-mailadressen of selecteer uit je contacten.",
      },
      {
        title: "Stel rechten in",
        body: "Dropdown-menu: Kan bekijken, Kan bewerken, Gemachtigde.",
      },
      {
        title: "Verstuur en bevestig",
        body: "Klik Uitnodigen. De persoon ontvangt een uitnodiging via e-mail.",
      },
    ],
  },
  classic: {
    title: "Klassieke Outlook (Windows)",
    steps: [
      {
        title: "Open Agenda",
        body: "Klik op Agenda in de linkerbalk.",
      },
      {
        title: "Agenda openen met rechten",
        body: "Rechtsklik op de agendanaam of kies het lint: Delen.",
      },
      {
        title: "Kies Rechten",
        body: "Het venster Agenda-machtigingen opent. Hier voeg je personen toe.",
      },
      {
        title: "Voeg persoon toe",
        body: "Klik Toevoegen, zoek de persoon, en selecteer.",
      },
      {
        title: "Stel permissies in",
        body: "Kiest uit: Vrij/Bezet-alleen, Titels en locaties, Details of Gemachtigde.",
      },
      {
        title: "OK en verzenden",
        body: "Klik OK. Outlook stuurt een uitnodiging.",
      },
    ],
  },
};

export const SHARE_QUIZ = [
  {
    id: "sq1",
    question:
      "Je deelt je agenda met een medestudent. Welk permissieniveau kies je?",
    choices: [
      "Kan bekijken — ze zien je afspraken, maar kunnen ze niet wijzigen",
      "Kan bewerken — ze kunnen alles aanpassen",
      "Gemachtigde — ze kunnen namens jou handelen",
    ],
    answer: 0,
    why: "Voor medestudenten die alleen willen weten wanneer je beschikbaar bent, is 'Kan bekijken' veilig en standaard.",
  },
  {
    id: "sq2",
    question:
      "Je stagementor moet vergaderingen voor jou accepteren terwijl jij weg bent. Wat geef je?",
    choices: [
      "Kan bekijken",
      "Kan bewerken",
      "Gemachtigde",
    ],
    answer: 2,
    why: "Alleen een gemachtigde kan namens jou handelen en accepteert uitnodigingen. Dit is nodig voor volmacht.",
  },
  {
    id: "sq3",
    question:
      "Je hebt je privé-agenda gedeeld, maar je wilt die intrekken. Hoe?",
    choices: [
      "Je kunt niet terugtrekken — het is altijd gedeeld",
      "Ga naar Delen, selecteer de persoon, en klik Verwijderen",
      "Je moet een nieuwe agenda aanmaken",
    ],
    answer: 1,
    why: "Je kunt op elk moment naar Delen gaan en toegang intrekken. Daarna zien zij je agenda niet meer.",
  },
  {
    id: "sq4",
    question:
      "Je deelt je agenda met 'Kan bewerken'. Wat kan de ander doen?",
    choices: [
      "Alleen lezen",
      "Afspraken toevoegen, wijzigen en verwijderen",
      "Namens jou e-mails sturen",
    ],
    answer: 1,
    why: "'Kan bewerken' betekent volledige controle over de agenda. Alleen 'Gemachtigde' kan ook e-mail beheren.",
  },
  {
    id: "sq5",
    question:
      "Na het project vergeet je toegang in te trekken. Wat gebeurt er?",
    choices: [
      "Niets — automatisch verwijderd na 6 maanden",
      "Je oud teamlid kan nog steeds je agenda bekijken en wijzigen",
      "Outlook waarschuwt automatisch",
    ],
    answer: 1,
    why: "Toegang stopt niet automatisch. Jij moet naar Delen gaan en de persoon handmatig verwijderen.",
  },
  {
    id: "sq6",
    question:
      "Je maakt je PA gemachtigde van je agenda en e-mail. Wat kunnen ze?",
    choices: [
      "Alleen je agenda beheren",
      "Agenda en e-mail — alles wat jij kunt, namens jou",
      "Alles behalve je wachtwoord wijzigen",
    ],
    answer: 1,
    why: "Een gemachtigde krijgt volledige toegang tot agenda, e-mail en meer — alleen niet het wachtwoord. Zeer vertrouwelijk.",
  },
] as const;
