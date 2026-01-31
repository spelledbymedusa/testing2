window.HELP_BUCKETS = [
  {
    id: "vor_ort",
    title: "Helfen vor Ort",
    description: "Direkt anpacken, Menschen begegnen und vor Ort Wirkung erleben.",
    subOptions: [
      {
        id: "freiwilliger",
        title: "Als Freiwilliger",
        description: "Einstieg mit festen Aufgaben und klaren Zeitfenstern.",
        reportId: "freiwilliger",
        filters: { mode: "vor_ort", type: "freiwilliger", bucket: "vor_ort" },
      },
      {
        id: "aushilfe-gast",
        title: "Als Aushilfe / Gast",
        description: "Kurz reinschnuppern, spontan helfen, flexibel bleiben.",
        reportId: "aushilfe-gast",
        filters: { mode: "vor_ort", type: "aushilfe-gast", bucket: "vor_ort" },
      },
      {
        id: "mitglied",
        title: "Als Mitglied",
        description: "Langfristig dazugehören und gemeinsam Strukturen tragen.",
        reportId: "mitglied",
        filters: { mode: "vor_ort", type: "mitglied", bucket: "vor_ort" },
      },
      {
        id: "urlaub",
        title: "Im Urlaub",
        description: "Engagement mit Reiseerlebnis verbinden und neue Orte erleben.",
        reportId: "urlaub",
        filters: { mode: "vor_ort", type: "urlaub", bucket: "vor_ort" },
      },
      {
        id: "fsj",
        title: "Als FSJ",
        description: "Ein Jahr Orientierung, Verantwortung und neue Perspektiven.",
        reportId: "fsj",
        filters: { mode: "vor_ort", type: "fsj", bucket: "vor_ort" },
      },
      {
        id: "pflegestelle",
        title: "Als Pflegestelle",
        description: "Schutz bieten und Übergänge für Menschen oder Tiere begleiten.",
        reportId: "pflegestelle",
        filters: { mode: "vor_ort", type: "pflegestelle", bucket: "vor_ort" },
      },
    ],
  },
  {
    id: "online",
    title: "Helfen Online",
    description: "Digitale Unterstützung, die Teams entlastet und Wissen zugänglich macht.",
    subOptions: [
      {
        id: "digitalisieren",
        title: "Digitalisieren & Dokumente übertragen",
        description: "Akten und Abläufe schlank machen – Schritt für Schritt.",
        reportId: "digitalisieren",
        filters: { mode: "online", type: "digitalisieren", bucket: "online" },
      },
      {
        id: "tech",
        title: "IT / Webseiten & Tools",
        description: "Technik erklären, Websites stabilisieren, Tools einführen.",
        reportId: "tech",
        filters: { mode: "online", type: "tech", bucket: "online" },
      },
      {
        id: "design-content",
        title: "Design & Content",
        description: "Materialien gestalten, Geschichten erzählen, Wirkung sichtbar machen.",
        reportId: "design-content",
        filters: { mode: "online", type: "design-content", bucket: "online" },
      },
      {
        id: "uebersetzen",
        title: "Übersetzen & Korrekturlesen",
        description: "Zugänge schaffen, Verständlichkeit verbessern, Vertrauen stärken.",
        reportId: "uebersetzen",
        filters: { mode: "online", type: "uebersetzen", bucket: "online" },
      },
      {
        id: "mentoring",
        title: "Mentoring / Lernen",
        description: "Wissen teilen, Fragen beantworten, Lernwege begleiten.",
        reportId: "mentoring",
        filters: { mode: "online", type: "mentoring", bucket: "online" },
      },
      {
        id: "community",
        title: "Community Support / Moderation",
        description: "Sichere Räume schaffen und Austausch ermöglichen.",
        reportId: "community",
        filters: { mode: "online", type: "community", bucket: "online" },
      },
    ],
  },
  {
    id: "alltag",
    title: "Im Alltag",
    description: "Niedrigschwellig helfen – oft reicht eine Stunde oder ein kurzer Weg.",
    subOptions: [
      {
        id: "nachbarschaft",
        title: "Nachbarschaftshilfe",
        description: "Kleine Gesten, große Wirkung im direkten Umfeld.",
        reportId: "nachbarschaft",
        filters: { mode: "vor_ort", type: "nachbarschaft", bucket: "alltag" },
      },
      {
        id: "zuhoeren",
        title: "Begleiten & Zuhören",
        description: "Zeit schenken, Gespräche ermöglichen, Vertrauen aufbauen.",
        reportId: "zuhoeren",
        filters: { mode: "vor_ort", type: "zuhoeren", bucket: "alltag" },
      },
      {
        id: "besorgungen",
        title: "Fahrten & Besorgungen",
        description: "Erledigungen abnehmen, Mobilität sichern, Alltag entlasten.",
        reportId: "besorgungen",
        filters: { mode: "vor_ort", type: "besorgungen", bucket: "alltag" },
      },
      {
        id: "kinder",
        title: "Kinder / Vorlesen / Hausaufgaben",
        description: "Kinder stärken, Lernfreude teilen, Eltern entlasten.",
        reportId: "kinder",
        filters: { mode: "vor_ort", type: "kinder", bucket: "alltag" },
      },
      {
        id: "tiere",
        title: "Tiere: Gassi / Pflege",
        description: "Verantwortung übernehmen und Tierliebe praktisch zeigen.",
        reportId: "tiere",
        filters: { mode: "vor_ort", type: "tiere", bucket: "alltag" },
      },
      {
        id: "handwerk",
        title: "Handwerk im Kleinen",
        description: "Reparieren, aufbauen, mit Werkzeugen unterstützen.",
        reportId: "handwerk",
        filters: { mode: "vor_ort", type: "handwerk", bucket: "alltag" },
      },
    ],
  },
  {
    id: "spenden",
    title: "Geld / Spenden",
    description: "Geld ist Wirkung: Mit klarem Ziel und Strategie kannst du Organisationen spürbar voranbringen.",
    subOptions: [
      {
        id: "einmalig",
        title: "Einmalige Spende",
        description: "Gezielt helfen, wenn gerade schnelle Wirkung gebraucht wird.",
        reportId: "einmalig",
        filters: { mode: "vor_ort", type: "einmalig", bucket: "spenden" },
      },
      {
        id: "monatlich",
        title: "Monatlich unterstützen",
        description: "Planungssicherheit geben und langfristige Projekte ermöglichen.",
        reportId: "monatlich",
        filters: { mode: "vor_ort", type: "monatlich", bucket: "spenden" },
      },
      {
        id: "patenschaft",
        title: "Patenschaft / gezielte Hilfe",
        description: "Deinen Willen in konkrete Ziele und Menschen investieren.",
        reportId: "patenschaft",
        filters: { mode: "vor_ort", type: "patenschaft", bucket: "spenden" },
      },
      {
        id: "aktion",
        title: "Spendenaktion starten",
        description: "Mit anderen mobilisieren und den Impact multiplizieren.",
        reportId: "aktion",
        filters: { mode: "vor_ort", type: "aktion", bucket: "spenden" },
      },
      {
        id: "sachspenden",
        title: "Sachspenden sinnvoll geben",
        description: "Bedarfsgerecht spenden statt Lager füllen.",
        reportId: "sachspenden",
        filters: { mode: "vor_ort", type: "sachspenden", bucket: "spenden" },
      },
      {
        id: "statt-geschenke",
        title: "Spenden statt Geschenke",
        description: "Feiern mit Sinn und gemeinsam Wirkung schaffen.",
        reportId: "statt-geschenke",
        filters: { mode: "vor_ort", type: "statt-geschenke", bucket: "spenden" },
      },
    ],
  },
  {
    id: "reichweite",
    title: "Verbreitung / Firmen",
    description: "Unternehmen können Reichweite, Ressourcen und Teams gezielt einsetzen.",
    subOptions: [
      {
        id: "reichweite",
        title: "Teilen & Reichweite geben",
        description: "Netzwerke öffnen und Aufmerksamkeit gezielt nutzen.",
        reportId: "reichweite",
        filters: { mode: "vor_ort", type: "reichweite", bucket: "reichweite" },
      },
      {
        id: "sponsoring",
        title: "Partnerschaften / Sponsoring",
        description: "Langfristige Kooperationen, die Projekte tragen.",
        reportId: "sponsoring",
        filters: { mode: "vor_ort", type: "sponsoring", bucket: "reichweite" },
      },
      {
        id: "corporate",
        title: "Corporate Volunteering",
        description: "Teams zusammenbringen und gleichzeitig Gutes tun.",
        reportId: "corporate",
        filters: { mode: "vor_ort", type: "corporate", bucket: "reichweite" },
      },
      {
        id: "sachleistungen",
        title: "Sachleistungen bereitstellen",
        description: "Mit Know-how, Räumen oder Hardware unterstützen.",
        reportId: "sachleistungen",
        filters: { mode: "vor_ort", type: "sachleistungen", bucket: "reichweite" },
      },
      {
        id: "fundraising",
        title: "Fundraising-Kampagnen",
        description: "Gemeinsam Mobilisierung und Mittelbeschaffung planen.",
        reportId: "fundraising",
        filters: { mode: "vor_ort", type: "fundraising", bucket: "reichweite" },
      },
      {
        id: "jobs",
        title: "Jobs / Praktika ermöglichen",
        description: "Chancen schaffen und Perspektiven eröffnen.",
        reportId: "jobs",
        filters: { mode: "vor_ort", type: "jobs", bucket: "reichweite" },
      },
    ],
  },
];

window.HELP_REPORTS = {
  freiwilliger: {
    title: "Als Freiwilliger vor Ort helfen",
    intro:
      "Regelmäßige Einsätze, klare Aufgaben und ein Team, das dich mitnimmt – so fühlt sich der Einstieg als Freiwilliger an.",
    sections: [
      {
        title: "Warum ich mich dafür entschieden habe",
        text: "Ich wollte einen festen Rahmen, in dem ich zuverlässig helfen kann. Eine wiederkehrende Aufgabe gibt Struktur und macht Wirkung messbar.",
      },
      {
        title: "Was konkret anfällt",
        text: "Je nach Organisation sind es Begleitungen, Ausflüge, Betreuung oder organisatorische Aufgaben. Das Team teilt die Aufgaben fair auf.",
      },
      {
        title: "So startest du",
        text: "Ein kurzes Kennenlernen, ein Probetermin und dann geht es los. Oft gibt es Einführungen oder kleine Schulungen.",
      },
    ],
  },
  "aushilfe-gast": {
    title: "Als Aushilfe oder Gast unterstützen",
    intro:
      "Manchmal reichen schon ein paar Stunden: kurzfristig unterstützen, flexibel bleiben und trotzdem etwas bewegen.",
    sections: [
      {
        title: "Was den Reiz ausmacht",
        text: "Du kannst spontan unterstützen, ohne dich langfristig zu binden. Das passt gut, wenn du wenig planbare Zeit hast.",
      },
      {
        title: "Typische Aufgaben",
        text: "Aktionen, Veranstaltungen, Material schleppen, Betreuung vor Ort oder kurzfristige Vertretungen.",
      },
      {
        title: "Einstieg",
        text: "Schau nach Gesuchen mit flexiblem Zeitbedarf und melde dich mit deinen freien Slots.",
      },
    ],
  },
  mitglied: {
    title: "Als Mitglied langfristig wirken",
    intro: "Mitgliedschaft heißt: Verantwortung teilen, Strukturen aufbauen und gemeinsam etwas Dauerhaftes gestalten.",
    sections: [
      {
        title: "Langfristige Wirkung",
        text: "Durch regelmäßige Treffen und klare Rollen entsteht Vertrauen – bei den Menschen vor Ort und im Team.",
      },
      {
        title: "Was du einbringst",
        text: "Kontinuität, Ideen und die Bereitschaft, mitzugestalten. Viele Organisationen freuen sich über neue Perspektiven.",
      },
      {
        title: "So wirst du Mitglied",
        text: "Infoabend besuchen, erste Aufgaben übernehmen und dann gemeinsam entscheiden, wie tief du einsteigen willst.",
      },
    ],
  },
  urlaub: {
    title: "Im Urlaub helfen",
    intro: "Engagement auf Reisen verbindet neue Orte mit sinnvollen Einsätzen – oft in Projekten mit klarer Dauer.",
    sections: [
      {
        title: "Was dich erwartet",
        text: "Kurzzeitprojekte, die klare Aufgabenpakete haben. So kannst du deine Zeit gut planen.",
      },
      {
        title: "Rahmen und Vorbereitung",
        text: "Meist gibt es Vorabinfos, kurze Briefings vor Ort und eine feste Ansprechperson.",
      },
      {
        title: "Tipp",
        text: "Plane genug Zeit für Anreise und Einweisung ein – dann fühlst du dich direkt sicher.",
      },
    ],
  },
  fsj: {
    title: "Als FSJ: ein Jahr, das bleibt",
    intro: "Ein Freiwilliges Soziales Jahr gibt dir Zeit, Verantwortung zu übernehmen und echte Einblicke in soziale Arbeit zu gewinnen.",
    sections: [
      {
        title: "Warum FSJ?",
        text: "Ich wollte Praxis statt Theorie und herausfinden, wo ich langfristig wirken kann. Das FSJ bietet genau diese Orientierung.",
      },
      {
        title: "Wie der Alltag aussieht",
        text: "Feste Schichten, klare Aufgaben und viel Teamarbeit. Ich war nah an den Menschen und konnte direkt unterstützen.",
      },
      {
        title: "Was ich gelernt habe",
        text: "Empathie, Selbstorganisation und Gelassenheit. Besonders wertvoll waren die kleinen Fortschritte im Alltag der Menschen.",
      },
      {
        title: "Zeitaufwand & Rahmen",
        text: "Vollzeit mit klaren Urlaubsregelungen, begleitende Seminartage und feste Ansprechpartner.",
      },
      {
        title: "Mein Tipp",
        text: "Sprich mit der Einsatzstelle offen über Erwartungen. So entsteht ein Jahr, das dich wirklich weiterbringt.",
      },
    ],
  },
  pflegestelle: {
    title: "Als Pflegestelle begleiten",
    intro: "Pflegestellen geben Schutz und Stabilität auf Zeit. Es geht um Nähe, Verantwortung und klare Absprachen.",
    sections: [
      {
        title: "Was mich motiviert",
        text: "Ich wollte direkt helfen und einen sicheren Ort bieten. Die Übergangszeit ist oft entscheidend.",
      },
      {
        title: "Der Alltag",
        text: "Struktur, Geduld und klare Routinen. Ob Mensch oder Tier – Sicherheit entsteht durch verlässliche Abläufe.",
      },
      {
        title: "Unterstützung",
        text: "Organisationen begleiten Pflegestellen mit Ansprechpartnern, Materialien und klaren Leitlinien.",
      },
      {
        title: "Herausforderungen",
        text: "Loslassen gehört dazu. Es hilft, wenn du dich gut mit der Organisation abstimmst und deine Grenzen kennst.",
      },
      {
        title: "So startest du",
        text: "Sprich mit der zuständigen Stelle, kläre Rahmenbedingungen und starte mit einem Kennenlerngespräch.",
      },
    ],
  },
  digitalisieren: {
    title: "Digitalisieren & Dokumente übertragen",
    intro: "Digitale Hilfe schafft Freiraum: Wer Prozesse vereinfacht, gibt Teams Zeit für das Wesentliche.",
    sections: [
      {
        title: "Warum das wichtig ist",
        text: "Viele Organisationen arbeiten noch mit Papier oder alten Dateien. Kleine Digitalisierungsprojekte sparen sofort Zeit.",
      },
      {
        title: "Was ich konkret tue",
        text: "Scannen, strukturieren, einfache Ordnerlogik aufsetzen und zentrale Dokumente zugänglich machen.",
      },
      {
        title: "Tools & Aufwand",
        text: "Oft reichen Standard-Tools wie Google Drive oder Office. Zwei Stunden pro Woche können bereits viel bewegen.",
      },
      {
        title: "So gelingt der Einstieg",
        text: "Mit einem kurzen Gespräch den größten Engpass finden, dann ein kleines Pilotprojekt starten.",
      },
      {
        title: "Wirkung",
        text: "Sichtbar wird sie, wenn Teams schneller finden, was sie brauchen – und weniger Zeit mit Suchen verlieren.",
      },
    ],
  },
  tech: {
    title: "IT / Webseiten & Tools",
    intro: "Technik verständlich machen, Websites stabil halten und Teams bei digitalen Werkzeugen begleiten.",
    sections: [
      {
        title: "Typische Aufgaben",
        text: "Website-Checks, kleine Anpassungen, Tool-Einführungen oder Support für das Team.",
      },
      {
        title: "Was du brauchst",
        text: "Grundkenntnisse reichen oft. Wichtig ist, dass du Dinge verständlich erklären kannst.",
      },
      {
        title: "Einstieg",
        text: "Starte mit einem klaren Zeitfenster und einer kurzen Bestandsaufnahme der wichtigsten Tools.",
      },
    ],
  },
  "design-content": {
    title: "Design & Content",
    intro: "Gute Gestaltung macht Wirkung sichtbar – ob Social Posts, Flyer oder Storytelling.",
    sections: [
      {
        title: "Worum es geht",
        text: "Teams brauchen oft Unterstützung bei Layout, Bildsprache oder konsistenten Vorlagen.",
      },
      {
        title: "Was du einbringen kannst",
        text: "Gestaltungssinn, Textgefühl und Ideen, wie Botschaften klarer werden.",
      },
      {
        title: "Startpunkt",
        text: "Fang mit einem konkreten Material an, das bald benötigt wird – so entsteht sofort Nutzen.",
      },
    ],
  },
  uebersetzen: {
    title: "Übersetzen & Korrekturlesen",
    intro: "Mehrsprachigkeit schafft Zugang. Mit Korrekturen und Übersetzungen wird Hilfe verständlich.",
    sections: [
      {
        title: "Dein Beitrag",
        text: "Texte glätten, Übersetzungen prüfen, Anleitungen vereinfachen – damit sie wirklich ankommen.",
      },
      {
        title: "Typische Inhalte",
        text: "Webseiten-Texte, Flyer, Formulare oder E-Mails an Zielgruppen.",
      },
      {
        title: "Einstieg",
        text: "Klärt Sprachumfang, Zielgruppen und Termin – danach kannst du direkt loslegen.",
      },
    ],
  },
  mentoring: {
    title: "Mentoring / Lernen",
    intro: "Wissen teilen, Lernwege begleiten und Fragen beantworten – oft reichen kurze Sessions.",
    sections: [
      {
        title: "Was du machst",
        text: "Lernziele definieren, Aufgaben erklären, Motivation geben.",
      },
      {
        title: "Zeitaufwand",
        text: "Meist 30–90 Minuten pro Woche. Regelmäßigkeit zählt mehr als Dauer.",
      },
      {
        title: "Start",
        text: "Ein erstes Kennenlernen und klare Ziele schaffen Sicherheit für beide Seiten.",
      },
    ],
  },
  community: {
    title: "Community Support / Moderation",
    intro: "Online-Communities brauchen sichere Räume und klare Regeln – Moderation macht den Unterschied.",
    sections: [
      {
        title: "Deine Rolle",
        text: "Fragen beantworten, Diskussionen begleiten und auf respektvollen Umgang achten.",
      },
      {
        title: "Was du brauchst",
        text: "Geduld, klare Kommunikation und ein gutes Gespür für Konflikte.",
      },
      {
        title: "Einstieg",
        text: "Starte mit festen Zeiten, in denen du aktiv bist, und kläre Zuständigkeiten.",
      },
    ],
  },
  nachbarschaft: {
    title: "Nachbarschaftshilfe",
    intro: "Direkt im Viertel helfen – mit kleinen Aufgaben, die einen großen Unterschied machen.",
    sections: [
      {
        title: "Was du tust",
        text: "Kurz vorbeischauen, unterstützen, mitdenken – oft sind es praktische Dinge.",
      },
      {
        title: "Warum es wirkt",
        text: "Nähe schafft Vertrauen. Viele Menschen sind dankbar für einfache, verlässliche Hilfe.",
      },
      {
        title: "So startest du",
        text: "Sprich mit einer lokalen Initiative oder schau nach Gesuchen in deinem Kiez.",
      },
    ],
  },
  zuhoeren: {
    title: "Begleiten & Zuhören",
    intro: "Zeit und Aufmerksamkeit sind oft das Wertvollste, was du geben kannst.",
    sections: [
      {
        title: "Worum es geht",
        text: "Begleitungen zu Terminen, Gespräche oder einfach da sein – ohne Druck.",
      },
      {
        title: "Wirkung",
        text: "Zuhören reduziert Einsamkeit und schafft Vertrauen, das lange nachwirkt.",
      },
      {
        title: "Einstieg",
        text: "Ein Kennenlernen mit der Organisation klärt Erwartungen und Rahmen.",
      },
    ],
  },
  besorgungen: {
    title: "Fahrten & Besorgungen",
    intro: "Mobilität und Erledigungen sichern – oft braucht es nur ein Auto und etwas Zeit.",
    sections: [
      {
        title: "Typische Aufgaben",
        text: "Einkäufe, Apothekenwege, Fahrten zu Terminen oder kleine Transporte.",
      },
      {
        title: "Was hilfreich ist",
        text: "Zuverlässigkeit, klare Absprachen und etwas Flexibilität.",
      },
      {
        title: "Start",
        text: "Kläre Fahrtstrecken und Zeiten im Voraus, dann läuft es reibungslos.",
      },
    ],
  },
  kinder: {
    title: "Kinder / Vorlesen / Hausaufgaben",
    intro: "Kinder stärken, Lernfreude wecken und Familien entlasten.",
    sections: [
      {
        title: "Was du machst",
        text: "Vorlesen, Spielen, Hausaufgaben begleiten oder kleine Lernimpulse setzen.",
      },
      {
        title: "Wirkung",
        text: "Kinder gewinnen Selbstvertrauen und bekommen zusätzliche Aufmerksamkeit.",
      },
      {
        title: "So startest du",
        text: "Kläre Rahmen und Zeiten – und bring Geduld und Neugier mit.",
      },
    ],
  },
  tiere: {
    title: "Tiere: Gassi / Pflege",
    intro: "Tierhilfe ist konkret: Gassi gehen, Pflege übernehmen und Verantwortung teilen.",
    sections: [
      {
        title: "Typische Aufgaben",
        text: "Spaziergänge, Füttern, Pflege oder Unterstützung bei Tierheimterminen.",
      },
      {
        title: "Was du brauchst",
        text: "Zuverlässigkeit, Ruhe im Umgang mit Tieren und klare Absprachen.",
      },
      {
        title: "Start",
        text: "Viele Tierheime bieten Einführungen – nutze sie, um dich sicher zu fühlen.",
      },
    ],
  },
  handwerk: {
    title: "Handwerk im Kleinen",
    intro: "Kleine Reparaturen, Aufbauten und praktische Hilfe – schnell, greifbar, wirksam.",
    sections: [
      {
        title: "Was gefragt ist",
        text: "Montagehilfe, kleine Renovierungen oder Unterstützung bei Reparaturcafés.",
      },
      {
        title: "Wirkung",
        text: "Mit wenigen Handgriffen entsteht direkte Entlastung und langfristiger Nutzen.",
      },
      {
        title: "Einstieg",
        text: "Kläre Werkzeug und Rahmenbedingungen, dann kannst du sofort loslegen.",
      },
    ],
  },
  einmalig: {
    title: "Einmalige Spende",
    intro: "Gezielt geben, wenn es zählt – einmalig, klar und mit spürbarer Wirkung.",
    sections: [
      {
        title: "Dein Hebel",
        text: "Eine Einmalspende kann einen Engpass lösen: Material, Miete oder eine akute Aktion.",
      },
      {
        title: "Strategischer Tipp",
        text: "Frag nach dem konkreten Bedarf – so setzt du deinen Willen gezielt ein.",
      },
      {
        title: "Start",
        text: "Wähle ein Gesuch mit klarer Zielbeschreibung und kurzer Laufzeit.",
      },
    ],
  },
  monatlich: {
    title: "Monatlich unterstützen",
    intro: "Regelmäßige Spenden geben Organisationen Planungssicherheit und Stabilität.",
    sections: [
      {
        title: "Warum monatlich?",
        text: "Gleichmäßige Einnahmen ermöglichen langfristige Projekte und verlässliche Hilfe.",
      },
      {
        title: "Deine Wirkung",
        text: "Du unterstützt strategisch – mit kalkulierbarer, nachhaltiger Wirkung.",
      },
      {
        title: "Einstieg",
        text: "Wähle ein Projekt mit langfristigem Ziel und verlässlicher Kommunikation.",
      },
    ],
  },
  patenschaft: {
    title: "Patenschaft / gezielte Hilfe",
    intro: "Mit einer Patenschaft lenkst du deine Unterstützung gezielt dorthin, wo sie gebraucht wird.",
    sections: [
      {
        title: "Gezielte Wirkung",
        text: "Patenschaften schaffen klare Ziele, messbare Fortschritte und persönliche Bindung.",
      },
      {
        title: "Was wichtig ist",
        text: "Transparenz und regelmäßige Updates helfen dir, deinen Willen strategisch einzusetzen.",
      },
      {
        title: "Start",
        text: "Wähle ein Gesuch mit konkretem Bedarf und klarer Erfolgsmessung.",
      },
    ],
  },
  aktion: {
    title: "Spendenaktion starten",
    intro: "Gemeinsam mobilisieren und mehr Menschen mitnehmen – so wächst der Impact.",
    sections: [
      {
        title: "Was du bewirkst",
        text: "Eine Aktion macht ein Thema sichtbar und zieht Unterstützer an.",
      },
      {
        title: "So gelingt es",
        text: "Setze ein klares Ziel, erzähle die Geschichte dahinter und kommuniziere regelmäßig.",
      },
      {
        title: "Einstieg",
        text: "Starte mit einem kleinen Ziel und erweitere, sobald die Aktion Fahrt aufnimmt.",
      },
    ],
  },
  sachspenden: {
    title: "Sachspenden sinnvoll geben",
    intro: "Sachspenden wirken am besten, wenn sie wirklich gebraucht werden und logistisch passen.",
    sections: [
      {
        title: "Warum gezielt?",
        text: "Unpassende Spenden verursachen Aufwand. Bedarfsgerechte Sachspenden sparen Ressourcen.",
      },
      {
        title: "Dein Beitrag",
        text: "Du kannst schnell helfen, wenn du direkt nach aktuellen Bedarfen fragst.",
      },
      {
        title: "Start",
        text: "Achte auf klare Bedarfslisten und abgestimmte Übergaben.",
      },
    ],
  },
  "statt-geschenke": {
    title: "Spenden statt Geschenke",
    intro: "Feiern mit Sinn: Deine Geschenke werden zu gezielter Unterstützung.",
    sections: [
      {
        title: "Der Gedanke",
        text: "Du lenkst Aufmerksamkeit und Mittel auf ein wichtiges Anliegen.",
      },
      {
        title: "Wirkung",
        text: "Auch kleine Beiträge summieren sich – vor allem, wenn viele mitmachen.",
      },
      {
        title: "Einstieg",
        text: "Wähle ein konkretes Projekt und erkläre den Anlass kurz und persönlich.",
      },
    ],
  },
  reichweite: {
    title: "Teilen & Reichweite geben",
    intro: "Unternehmen können Sichtbarkeit schaffen und Anliegen Reichweite geben.",
    sections: [
      {
        title: "Was möglich ist",
        text: "Unterstützung über Kanäle, Newsletter oder Veranstaltungen – gezielt und abgestimmt.",
      },
      {
        title: "Wirkung",
        text: "Mehr Sichtbarkeit bedeutet mehr Unterstützer, Bewerbungen und Spenden.",
      },
      {
        title: "Start",
        text: "Kläre Kernbotschaft, Timing und Zielgruppe mit der Organisation.",
      },
    ],
  },
  sponsoring: {
    title: "Partnerschaften / Sponsoring",
    intro: "Langfristige Kooperationen geben Projekten Stabilität und Planungssicherheit.",
    sections: [
      {
        title: "Wie es funktioniert",
        text: "Sponsoring kann finanziell, fachlich oder durch Ressourcen erfolgen.",
      },
      {
        title: "Wirkung",
        text: "Gemeinsam entstehen nachhaltige Projekte, die über einzelne Aktionen hinausgehen.",
      },
      {
        title: "Start",
        text: "Definiere gemeinsame Ziele und messbare Wirkung – dann wird die Partnerschaft belastbar.",
      },
    ],
  },
  corporate: {
    title: "Corporate Volunteering",
    intro: "Teams engagieren sich gemeinsam und stärken gleichzeitig den Zusammenhalt.",
    sections: [
      {
        title: "Warum es wirkt",
        text: "Gemeinsame Einsätze fördern Teamgeist und bringen spürbare Hilfe vor Ort.",
      },
      {
        title: "Organisation",
        text: "Klare Aufgabenpakete und ein definierter Zeitrahmen machen es für alle planbar.",
      },
      {
        title: "Start",
        text: "Wähle Projekte mit klarer Vorbereitung und abgestimmten Kapazitäten.",
      },
    ],
  },
  sachleistungen: {
    title: "Sachleistungen bereitstellen",
    intro: "Räume, Hardware oder Know-how – Sachleistungen können enorme Wirkung entfalten.",
    sections: [
      {
        title: "Was hilfreich ist",
        text: "Von Technik über Logistik bis zu Büroräumen: Was gebraucht wird, variiert stark.",
      },
      {
        title: "Wirkung",
        text: "Sachleistungen entlasten Budgets und beschleunigen Projekte.",
      },
      {
        title: "Start",
        text: "Kläre den Bedarf und die Übergabe frühzeitig, damit es reibungslos läuft.",
      },
    ],
  },
  fundraising: {
    title: "Fundraising-Kampagnen",
    intro: "Mit vereinten Kräften Kampagnen planen und Unterstützung bündeln.",
    sections: [
      {
        title: "Wie Unternehmen helfen",
        text: "Mit Planung, Kommunikation und Zugang zu Netzwerken wächst die Reichweite.",
      },
      {
        title: "Wirkung",
        text: "Professionelles Fundraising bringt nachhaltige Mittel für langfristige Projekte.",
      },
      {
        title: "Start",
        text: "Gemeinsam Ziele definieren, Story entwickeln und Kommunikationskanäle festlegen.",
      },
    ],
  },
  jobs: {
    title: "Jobs / Praktika ermöglichen",
    intro: "Perspektiven eröffnen: Unternehmen können Menschen den Einstieg erleichtern.",
    sections: [
      {
        title: "Worum es geht",
        text: "Praktika, Einstiegsjobs oder Mentoring öffnen Türen und stärken langfristig.",
      },
      {
        title: "Wirkung",
        text: "Chancen entstehen dort, wo Qualifikation und Unterstützung zusammenkommen.",
      },
      {
        title: "Start",
        text: "Kläre Zielgruppen und Unterstützungsmöglichkeiten, bevor du Angebote veröffentlichst.",
      },
    ],
  },
};
