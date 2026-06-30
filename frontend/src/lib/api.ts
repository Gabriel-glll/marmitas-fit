import type { OnboardingFormData, OnboardingResponse } from '../types/onboarding';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export async function enviarOnboarding(dados: OnboardingFormData): Promise<OnboardingResponse> {
  const resposta = await fetch(`${API_BASE_URL}/onboarding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível enviar seus dados. Tente novamente.');
  }

  return resposta.json();
}
