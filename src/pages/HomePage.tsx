import styles from "./HomePage.module.css";
import { NewsCard } from "../components/cards/NewsCard";

const mockNews = [
  { id: "1", title: "Anstehendes Fest", text: "Kurzer Teaser…", meta: "Heute • Berlin" },
  { id: "2", title: "Neuer Verein", text: "Kurzer Teaser…", meta: "Gestern • Hamburg" },
];

export function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Finde Ehrenamt, das zu dir passt.</h1>
        <p>Vereine, Gesuche und Möglichkeiten – lokal und online.</p>

        <div className={styles.ctaRow}>
          <button className={styles.primary}>Ich möchte helfen</button>
          <button className={styles.secondary}>Wir suchen Hilfe</button>
          <button className={styles.secondary}>Weiterbilden</button>
        </div>
      </section>

      <section id="news" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>News</h2>

          <div className={styles.actions}>
            <button className={styles.chip}>Sortieren</button>
            <button className={styles.chip}>Filtern</button>
          </div>
        </div>

        <div className={styles.feed}>
          {mockNews.map((n) => (
            <NewsCard key={n.id} title={n.title} text={n.text} meta={n.meta} />
          ))}
        </div>
      </section>

      <section id="vereine" className={styles.section}>
        <h2>Vereine (Preview)</h2>
        <p>Hier kommt später das Grid + Filterpanel. Jetzt nur Design.</p>
      </section>

      <section id="gesuche" className={styles.section}>
        <h2>Gesuche (Preview)</h2>
        <p>Hier kommen später Karten wie im PDF „Aufbau Gesuch“.</p>
      </section>

      <section id="helfen" className={styles.section}>
        <h2>Wie kann ich helfen?</h2>
        <div className={styles.tileGrid}>
          <div className={styles.tile}>Helfen vor Ort</div>
          <div className={styles.tile}>Helfen online</div>
          <div className={styles.tile}>Im Alltag</div>
          <div className={styles.tile}>Spenden</div>
          <div className={styles.tile}>Firmen / Verbreitung</div>
        </div>
      </section>

      <section id="account" className={styles.section}>
        <h2>Account</h2>
        <p>Hier kommt später Login/Registrierung (statisch für Design).</p>
      </section>
    </div>
  );
}
