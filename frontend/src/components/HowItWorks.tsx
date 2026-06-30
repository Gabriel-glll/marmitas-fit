import styles from './HowItWorks.module.css';

const steps = [
  {
    icon: '📋',
    title: 'Preencha seu perfil',
    desc: 'Conte seus dados físicos, objetivo e preferências alimentares. Leva menos de 3 minutos.',
  },
  {
    icon: '🤖',
    title: 'A IA monta seu plano',
    desc: 'Nossa inteligência gera 7 dias de refeições personalizadas com as marmitas que vão exatamente na sua meta.',
  },
  {
    icon: '🥡',
    title: 'Receba suas marmitas',
    desc: 'Escolha as marmitas do seu plano, faça o pedido e receba em casa — práticas e deliciosas.',
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">
      <div className={styles.inner}>
        <div className={styles.label}>Como funciona</div>
        <h2>Do perfil ao prato em <span>3 passos</span></h2>
        <p className={styles.sub}>Simples assim. Sem complicação, sem planilha, sem dieta genérica.</p>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{i + 1}</div>
              <div className={styles.icon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {i < steps.length - 1 && <div className={styles.arrow}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
