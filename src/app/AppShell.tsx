import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>Ehrenamtsnetz</div>

        <nav className={styles.nav}>
          <a href="#news">News</a>
          <a href="#vereine">Vereine</a>
          <a href="#gesuche">Gesuche</a>
          <a href="#helfen">Helfen</a>
          <a href="#account">Account</a>
          <a href="#impressum">Impressum</a>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer} id="impressum">
        <div>Impressum • Kontakt • Datenschutz</div>
      </footer>
    </div>
  );
}
