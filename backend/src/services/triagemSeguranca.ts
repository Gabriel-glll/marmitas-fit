type DadosTriagem = {
  gravidez: boolean;
  condicaoMedicaRelevante: boolean;
  sinaisTranstornoAlimentar: boolean;
};

type ResultadoTriagem = {
  bloqueado: boolean;
  motivo: string | null;
};

export function avaliarTriagemSeguranca(dados: DadosTriagem): ResultadoTriagem {
  if (dados.gravidez) {
    return { bloqueado: true, motivo: 'gravidez' };
  }
  if (dados.condicaoMedicaRelevante) {
    return { bloqueado: true, motivo: 'condicao_medica_relevante' };
  }
  if (dados.sinaisTranstornoAlimentar) {
    return { bloqueado: true, motivo: 'sinais_transtorno_alimentar' };
  }
  return { bloqueado: false, motivo: null };
}
