import { useState } from 'react';
import styles from './Navbar.module.css';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          🥗 <span>Marmitas<b>Fit</b></span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Como funciona</a>
          <a href="#beneficios" onClick={() => setOpen(false)}>Benefícios</a>
          <a href="#plano" onClick={() => setOpen(false)}>Meu Plano</a>
          <a href="#contato" onClick={() => setOpen(false)}>Contato</a>
        </nav>

        <a href="#plano" className={styles.cta}>Quero meu plano</a>

        <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
