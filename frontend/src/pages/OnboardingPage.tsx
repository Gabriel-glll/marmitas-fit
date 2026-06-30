import { useState } from 'react';
import type { ModalidadeAtividade, Objetivo, OnboardingFormData, Sexo } from '../types/onboarding';
import { enviarOnboarding } from '../lib/api';

const ESTADO_INICIAL: OnboardingFormData = {
  idade: 30,
  sexo: 'feminino',
  pesoKg: 70,
  alturaCm: 170,
  objetivo: 'perda_de_peso',
  modalidadeAtividade: 'nenhuma',
  frequenciaSemanal: 0,
  restricoesAlimentares: [],
  alimentosExcluidos: [],
  orcamentoSemanal: undefined,
  aceitouTermos: false,
  gravidez: false,
  condicaoMedicaRelevante: false,
  sinaisTranstornoAlimentar: false,
};

export function OnboardingPage() {
  const [form, setForm] = useState<OnboardingFormData>(ESTADO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{ bloqueado: boolean; mensagem?: string } | null>(null);

  function atualizarCampo<K extends keyof OnboardingFormData>(campo: K, valor: OnboardingFormData[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function listaDeStringPorVirgula(valor: string): string[] {
    return valor
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  async function aoSubmeter(evento: React.FormEvent) {
    evento.preventDefault();
    setErro(null);

    if (!form.aceitouTermos) {
      setErro('É necessário aceitar os termos para continuar.');
      return;
    }

    setEnviando(true);
    try {
      const resposta = await enviarOnboarding(form);
      setResultado({ bloqueado: resposta.bloqueado, mensagem: resposta.mensagem });
    } catch {
      setErro('Não foi possível enviar seus dados agora. Tente novamente em alguns instantes.');
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <main style={{ maxWidth: 640, margin: '40px auto', padding: 16, fontFamily: 'sans-serif' }}>
        {resultado.bloqueado ? (
          <>
            <h1>Vamos com cuidado</h1>
            <p>{resultado.mensagem}</p>
          </>
        ) : (
          <>
            <h1>Recebemos seus dados!</h1>
            <p>Seu plano será gerado em breve. (Geração do plano chega na próxima fase.)</p>
          </>
        )}
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Monte seu plano alimentar</h1>
      <p style={{ color: '#555', fontSize: 14 }}>
        Conteúdo educacional, não substitui acompanhamento de nutricionista (CRN) ou educador físico (CREF).
      </p>

      <form onSubmit={aoSubmeter} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <fieldset>
          <legend>Sobre você</legend>

          <label>
            Idade
            <input
              type="number"
              min={13}
              max={100}
              value={form.idade}
              onChange={(e) => atualizarCampo('idade', Number(e.target.value))}
              required
            />
          </label>

          <label>
            Sexo
            <select value={form.sexo} onChange={(e) => atualizarCampo('sexo', e.target.value as Sexo)}>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </label>

          <label>
            Peso (kg)
            <input
              type="number"
              step="0.1"
              value={form.pesoKg}
              onChange={(e) => atualizarCampo('pesoKg', Number(e.target.value))}
              required
            />
          </label>

          <label>
            Altura (cm)
            <input
              type="number"
              value={form.alturaCm}
              onChange={(e) => atualizarCampo('alturaCm', Number(e.target.value))}
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Objetivo</legend>
          <select value={form.objetivo} onChange={(e) => atualizarCampo('objetivo', e.target.value as Objetivo)}>
            <option value="perda_de_peso">Perda de peso</option>
            <option value="manutencao">Manutenção</option>
            <option value="ganho_de_massa">Ganho de massa</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Atividade física</legend>

          <label>
            Modalidade
            <select
              value={form.modalidadeAtividade}
              onChange={(e) => atualizarCampo('modalidadeAtividade', e.target.value as ModalidadeAtividade)}
            >
              <option value="nenhuma">Nenhuma</option>
              <option value="academia">Academia</option>
              <option value="boxe">Boxe</option>
              <option value="futebol">Futebol</option>
              <option value="corrida">Corrida</option>
              <option value="outra">Outra</option>
            </select>
          </label>

          <label>
            Frequência semanal (dias)
            <input
              type="number"
              min={0}
              max={14}
              value={form.frequenciaSemanal}
              onChange={(e) => atualizarCampo('frequenciaSemanal', Number(e.target.value))}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Restrições alimentares</legend>

          <label>
            Restrições (ex: vegetariano, lactose) — separadas por vírgula
            <input
              type="text"
              onChange={(e) => atualizarCampo('restricoesAlimentares', listaDeStringPorVirgula(e.target.value))}
            />
          </label>

          <label>
            Alimentos que não come — separados por vírgula
            <input
              type="text"
              onChange={(e) => atualizarCampo('alimentosExcluidos', listaDeStringPorVirgula(e.target.value))}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Orçamento (opcional)</legend>
          <label>
            Orçamento semanal para marmitas (R$)
            <input
              type="number"
              min={0}
              onChange={(e) =>
                atualizarCampo('orcamentoSemanal', e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Triagem de segurança</legend>
          <p style={{ fontSize: 13, color: '#555' }}>
            Essas respostas garantem que só geramos planos quando é seguro fazer isso de forma automática.
          </p>

          <label>
            <input
              type="checkbox"
              checked={form.gravidez}
              onChange={(e) => atualizarCampo('gravidez', e.target.checked)}
            />
            Estou gestante
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.condicaoMedicaRelevante}
              onChange={(e) => atualizarCampo('condicaoMedicaRelevante', e.target.checked)}
            />
            Tenho uma condição médica diagnosticada relevante (ex: diabetes, doença renal ou cardíaca)
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.sinaisTranstornoAlimentar}
              onChange={(e) => atualizarCampo('sinaisTranstornoAlimentar', e.target.checked)}
            />
            Já tive ou suspeito de transtorno alimentar
          </label>
        </fieldset>

        <label>
          <input
            type="checkbox"
            checked={form.aceitouTermos}
            onChange={(e) => atualizarCampo('aceitouTermos', e.target.checked)}
          />
          Entendo que este conteúdo é educacional e não substitui acompanhamento profissional.
        </label>

        {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </main>
  );
}
