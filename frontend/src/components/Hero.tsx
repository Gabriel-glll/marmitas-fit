import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} />
      <div className={styles.inner}>
        <div className={styles.badge}>🌱 100% Natural · Feito pra você</div>
        <h1>
          Coma bem,<br />
          <span>viva melhor.</span>
        </h1>
        <p>
          Responda algumas perguntas e receba um plano alimentar personalizado de 7 dias —
          com marmitas montáveis, sugestões de exercício e evolução esperada.
        </p>
        <div className={styles.actions}>
          <a href="#plano" className={styles.btnPrimary}>Montar meu plano grátis</a>
          <a href="#como-funciona" className={styles.btnOutline}>Como funciona</a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>+500</strong>
            <span>planos gerados</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>7 dias</strong>
            <span>de cardápio variado</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>personalizado</span>
          </div>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <div className={styles.imageCard}>
          <div className={styles.imagePlaceholder}>
            <span>🥗</span>
            <p>Marmitas Fit</p>
          </div>
          <div className={styles.floatBadge1}>🔥 -500 kcal/dia</div>
          <div className={styles.floatBadge2}>✅ Plano da semana pronto</div>
        </div>
      </div>
    </section>
  );
}
