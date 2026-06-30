export type Sexo = 'masculino' | 'feminino' | 'outro';
export type Objetivo = 'perda_de_peso' | 'manutencao' | 'ganho_de_massa';
export type ModalidadeAtividade = 'academia' | 'boxe' | 'futebol' | 'corrida' | 'nenhuma' | 'outra';

export type OnboardingFormData = {
  idade: number;
  sexo: Sexo;
  pesoKg: number;
  alturaCm: number;

  objetivo: Objetivo;

  modalidadeAtividade: ModalidadeAtividade;
  frequenciaSemanal: number;

  restricoesAlimentares: string[];
  alimentosExcluidos: string[];

  orcamentoSemanal?: number;

  aceitouTermos: boolean;

  gravidez: boolean;
  condicaoMedicaRelevante: boolean;
  sinaisTranstornoAlimentar: boolean;
};

export type OnboardingResponse = {
  id: string;
  bloqueado: boolean;
  motivo?: string;
  mensagem?: string;
};
