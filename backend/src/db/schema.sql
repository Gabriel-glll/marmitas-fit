create table if not exists onboarding (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  idade int not null,
  sexo text not null check (sexo in ('masculino', 'feminino', 'outro')),
  peso_kg numeric not null,
  altura_cm numeric not null,

  objetivo text not null check (objetivo in ('perda_de_peso', 'manutencao', 'ganho_de_massa')),

  modalidade_atividade text not null check (
    modalidade_atividade in ('academia', 'boxe', 'futebol', 'corrida', 'nenhuma', 'outra')
  ),
  frequencia_semanal int not null,

  restricoes_alimentares text[] not null default '{}',
  alimentos_excluidos text[] not null default '{}',

  orcamento_semanal numeric,

  aceitou_termos boolean not null,

  -- triagem de segurança (respostas brutas, para auditoria)
  gravidez boolean not null default false,
  condicao_medica_relevante boolean not null default false,
  sinais_transtorno_alimentar boolean not null default false,

  bloqueado_por_triagem boolean not null default false
);

alter table onboarding enable row level security;
