import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="contato">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>🥗 Marmitas<b>Fit</b></div>
          <p>Alimentação personalizada com inteligência artificial. Coma bem, viva melhor.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <strong>Navegação</strong>
            <a href="#como-funciona">Como funciona</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#plano">Meu Plano</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#">Termos de uso</a>
            <a href="#">Privacidade (LGPD)</a>
            <a href="#">Aviso nutricional</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} MarmitasFit. Conteúdo educacional — não substitui nutricionista (CRN) ou educador físico (CREF).</p>
      </div>
    </footer>
  );
}
