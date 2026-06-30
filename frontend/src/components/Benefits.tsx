import styles from './Benefits.module.css';

const items = [
  { icon: '🎯', title: 'Meta real', desc: 'Cada prato é calculado pro seu déficit ou superávit calórico.' },
  { icon: '🥦', title: 'Ingredientes acessíveis', desc: 'Sem itens exóticos ou caros. Comida de verdade, no seu orçamento.' },
  { icon: '🏃', title: 'Exercício no plano', desc: 'Sugestões de treino alinhadas à sua modalidade e frequência.' },
  { icon: '📅', title: '7 dias variados', desc: 'Cardápio diferente todo dia pra você não enjoar.' },
  { icon: '⚡', title: 'Gerado em segundos', desc: 'IA gera seu plano completo na hora, sem esperar.' },
  { icon: '🔒', title: 'Seus dados protegidos', desc: 'Dados de saúde tratados com cuidado, seguindo a LGPD.' },
];

export function Benefits() {
  return (
    <section className={styles.section} id="beneficios">
      <div className={styles.inner}>
        <div className={styles.label}>Por que escolher</div>
        <h2>Tudo que você precisa <span>num só lugar</span></h2>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
