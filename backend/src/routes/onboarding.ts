import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../db/supabaseClient.js';
import { avaliarTriagemSeguranca } from '../services/triagemSeguranca.js';

export const onboardingRouter = Router();

const onboardingSchema = z.object({
  idade: z.number().int().min(13).max(100),
  sexo: z.enum(['masculino', 'feminino', 'outro']),
  pesoKg: z.number().positive(),
  alturaCm: z.number().positive(),

  objetivo: z.enum(['perda_de_peso', 'manutencao', 'ganho_de_massa']),

  modalidadeAtividade: z.enum(['academia', 'boxe', 'futebol', 'corrida', 'nenhuma', 'outra']),
  frequenciaSemanal: z.number().int().min(0).max(14),

  restricoesAlimentares: z.array(z.string()).default([]),
  alimentosExcluidos: z.array(z.string()).default([]),

  orcamentoSemanal: z.number().positive().optional(),

  aceitouTermos: z.literal(true),

  gravidez: z.boolean(),
  condicaoMedicaRelevante: z.boolean(),
  sinaisTranstornoAlimentar: z.boolean(),
});

onboardingRouter.post('/', async (req, res) => {
  const parsed = onboardingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ erro: 'dados_invalidos', detalhes: parsed.error.flatten() });
  }

  const dados = parsed.data;
  const triagem = avaliarTriagemSeguranca(dados);

  const { data, error } = await supabase
    .from('onboarding')
    .insert({
      idade: dados.idade,
      sexo: dados.sexo,
      peso_kg: dados.pesoKg,
      altura_cm: dados.alturaCm,
      objetivo: dados.objetivo,
      modalidade_atividade: dados.modalidadeAtividade,
      frequencia_semanal: dados.frequenciaSemanal,
      restricoes_alimentares: dados.restricoesAlimentares,
      alimentos_excluidos: dados.alimentosExcluidos,
      orcamento_semanal: dados.orcamentoSemanal ?? null,
      aceitou_termos: dados.aceitouTermos,
      gravidez: dados.gravidez,
      condicao_medica_relevante: dados.condicaoMedicaRelevante,
      sinais_transtorno_alimentar: dados.sinaisTranstornoAlimentar,
      bloqueado_por_triagem: triagem.bloqueado,
    })
    .select('id')
    .single();

  if (error) {
    return res.status(500).json({ erro: 'falha_ao_salvar' });
  }

  if (triagem.bloqueado) {
    return res.status(200).json({
      id: data.id,
      bloqueado: true,
      motivo: triagem.motivo,
      mensagem:
        'Pelas informações fornecidas, recomendamos buscar acompanhamento de um profissional (nutricionista CRN e/ou médico) antes de seguir com um plano alimentar. Não geramos um plano automático nesse caso.',
    });
  }

  return res.status(201).json({ id: data.id, bloqueado: false });
});
