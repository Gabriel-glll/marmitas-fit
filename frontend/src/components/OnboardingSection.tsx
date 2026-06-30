import { useState } from 'react';
import type { ModalidadeAtividade, Objetivo, OnboardingFormData, Sexo } from '../types/onboarding';
import { enviarOnboarding } from '../lib/api';
import styles from './OnboardingSection.module.css';

const INICIAL: OnboardingFormData = {
  idade: 30, sexo: 'feminino', pesoKg: 70, alturaCm: 170,
  objetivo: 'perda_de_peso', modalidadeAtividade: 'nenhuma', frequenciaSemanal: 0,
  restricoesAlimentares: [], alimentosExcluidos: [],
  orcamentoSemanal: undefined, aceitouTermos: false,
  gravidez: false, condicaoMedicaRelevante: false, sinaisTranstornoAlimentar: false,
};

type Step = 0 | 1 | 2 | 3;

export function OnboardingSection() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<OnboardingFormData>(INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{ bloqueado: boolean; mensagem?: string } | null>(null);

  function set<K extends keyof OnboardingFormData>(campo: K, valor: OnboardingFormData[K]) {
    setForm(a => ({ ...a, [campo]: valor }));
  }

  function csvToArray(v: string) {
    return v.split(',').map(s => s.trim()).filter(Boolean);
  }

  async function enviar() {
    setErro(null);
    if (!form.aceitouTermos) { setErro('Aceite os termos para continuar.'); return; }
    setEnviando(true);
    try {
      const r = await enviarOnboarding(form);
      setResultado({ bloqueado: r.bloqueado, mensagem: r.mensagem });
    } catch {
      setErro('Não conseguimos enviar agora. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <section className={styles.section} id="plano">
        <div className={styles.resultCard}>
          {resultado.bloqueado ? (
            <>
              <div className={styles.resultIcon}>💛</div>
              <h2>Vamos com cuidado</h2>
              <p>{resultado.mensagem}</p>
            </>
          ) : (
            <>
              <div className={styles.resultIcon}>🎉</div>
              <h2>Dados recebidos!</h2>
              <p>Seu plano personalizado está sendo preparado. Em breve você poderá visualizá-lo e escolher suas marmitas.</p>
            </>
          )}
        </div>
      </section>
    );
  }

  const totalSteps = 4;
  const progress = ((step) / (totalSteps - 1)) * 100;

  return (
    <section className={styles.section} id="plano">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Crie seu plano</div>
          <h2>Personalizado pra <span>você</span></h2>
          <p>Preencha as etapas abaixo — leva menos de 3 minutos.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.stepLabel}>Etapa {step + 1} de {totalSteps}</div>

          {step === 0 && (
            <div className={styles.stepContent}>
              <h3>📏 Seus dados físicos</h3>
              <div className={styles.row}>
                <label>
                  Idade
                  <input type="number" min={13} max={100} value={form.idade}
                    onChange={e => set('idade', +e.target.value)} />
                </label>
                <label>
                  Sexo
                  <select value={form.sexo} onChange={e => set('sexo', e.target.value as Sexo)}>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="outro">Outro</option>
                  </select>
                </label>
              </div>
              <div className={styles.row}>
                <label>
                  Peso (kg)
                  <input type="number" step="0.1" value={form.pesoKg}
                    onChange={e => set('pesoKg', +e.target.value)} />
                </label>
                <label>
                  Altura (cm)
                  <input type="number" value={form.alturaCm}
                    onChange={e => set('alturaCm', +e.target.value)} />
                </label>
              </div>
              <div className={styles.objetivoGrid}>
                {([
                  { v: 'perda_de_peso', label: '⬇️ Perder peso' },
                  { v: 'manutencao', label: '⚖️ Manter peso' },
                  { v: 'ganho_de_massa', label: '⬆️ Ganhar massa' },
                ] as { v: Objetivo; label: string }[]).map(o => (
                  <button key={o.v} type="button"
                    className={`${styles.objetivoBtn} ${form.objetivo === o.v ? styles.selected : ''}`}
                    onClick={() => set('objetivo', o.v)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={styles.stepContent}>
              <h3>🏃 Atividade física</h3>
              <div className={styles.modalGrid}>
                {([
                  { v: 'nenhuma', label: '🛋️ Sedentário' },
                  { v: 'academia', label: '🏋️ Academia' },
                  { v: 'corrida', label: '🏃 Corrida' },
                  { v: 'futebol', label: '⚽ Futebol' },
                  { v: 'boxe', label: '🥊 Boxe' },
                  { v: 'outra', label: '✨ Outra' },
                ] as { v: ModalidadeAtividade; label: string }[]).map(m => (
                  <button key={m.v} type="button"
                    className={`${styles.modalBtn} ${form.modalidadeAtividade === m.v ? styles.selected : ''}`}
                    onClick={() => set('modalidadeAtividade', m.v)}>
                    {m.label}
                  </button>
                ))}
              </div>
              {form.modalidadeAtividade !== 'nenhuma' && (
                <label className={styles.fullLabel}>
                  Quantos dias por semana você treina?
                  <div className={styles.daysRow}>
                    {[1,2,3,4,5,6,7].map(d => (
                      <button key={d} type="button"
                        className={`${styles.dayBtn} ${form.frequenciaSemanal === d ? styles.selected : ''}`}
                        onClick={() => set('frequenciaSemanal', d)}>
                        {d}x
                      </button>
                    ))}
                  </div>
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <h3>🥦 Preferências alimentares</h3>
              <label className={styles.fullLabel}>
                Restrições ou dieta (ex: vegetariano, sem glúten)
                <input type="text" placeholder="Separe por vírgula"
                  onChange={e => set('restricoesAlimentares', csvToArray(e.target.value))} />
              </label>
              <label className={styles.fullLabel}>
                Alimentos que não come
                <input type="text" placeholder="Ex: brócolis, fígado"
                  onChange={e => set('alimentosExcluidos', csvToArray(e.target.value))} />
              </label>
              <label className={styles.fullLabel}>
                Orçamento semanal para marmitas (R$) — opcional
                <input type="number" min={0} placeholder="Ex: 150"
                  onChange={e => set('orcamentoSemanal', e.target.value ? +e.target.value : undefined)} />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <h3>🔒 Triagem de segurança</h3>
              <p className={styles.triagemInfo}>
                Para gerar um plano seguro, precisamos saber se algum dos itens abaixo se aplica a você:
              </p>
              <div className={styles.checks}>
                {[
                  { campo: 'gravidez' as const, label: 'Estou gestante' },
                  { campo: 'condicaoMedicaRelevante' as const, label: 'Tenho condição médica relevante (diabetes, doença renal/cardíaca etc.)' },
                  { campo: 'sinaisTranstornoAlimentar' as const, label: 'Já tive ou suspeito de transtorno alimentar' },
                ].map(c => (
                  <label key={c.campo} className={styles.checkLabel}>
                    <input type="checkbox" checked={form[c.campo] as boolean}
                      onChange={e => set(c.campo, e.target.checked)} />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={form.aceitouTermos}
                  onChange={e => set('aceitouTermos', e.target.checked)} />
                <span>
                  Entendo que este conteúdo é <strong>educacional</strong> e não substitui acompanhamento de nutricionista (CRN) ou educador físico (CREF).
                </span>
              </label>
              {erro && <p className={styles.erro}>{erro}</p>}
            </div>
          )}

          <div className={styles.navBtns}>
            {step > 0 && (
              <button type="button" className={styles.btnBack}
                onClick={() => setStep((step - 1) as Step)}>
                ← Voltar
              </button>
            )}
            {step < 3 ? (
              <button type="button" className={styles.btnNext}
                onClick={() => setStep((step + 1) as Step)}>
                Continuar →
              </button>
            ) : (
              <button type="button" className={styles.btnSubmit}
                onClick={enviar} disabled={enviando}>
                {enviando ? 'Enviando...' : '🚀 Gerar meu plano'}
              </button>
            )}
          </div>
        </div>

        <p className={styles.disclaimer}>
          ⚠️ Conteúdo educacional. Não substitui orientação de nutricionista (CRN) ou educador físico (CREF).
        </p>
      </div>
    </section>
  );
}
