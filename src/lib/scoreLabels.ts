// Score labels for different test types

export interface ScoreLabel {
  min: number;
  max: number;
  label: string;
  description: string;
  emoji: string;
}

const iqLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Em Desenvolvimento', description: 'Continue praticando para melhorar suas habilidades cognitivas.', emoji: '🌱' },
  { min: 40, max: 59, label: 'Básico', description: 'Boa base, com espaço para crescimento.', emoji: '📚' },
  { min: 60, max: 74, label: 'Moderado', description: 'Capacidade cognitiva sólida.', emoji: '🎯' },
  { min: 75, max: 89, label: 'Acima da Média', description: 'Excelente raciocínio lógico!', emoji: '⭐' },
  { min: 90, max: 100, label: 'Superior', description: 'Capacidade cognitiva excepcional!', emoji: '🧠' },
];

const eqLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Em Desenvolvimento', description: 'Foque em reconhecer e entender suas emoções.', emoji: '🌱' },
  { min: 40, max: 59, label: 'Consciente', description: 'Você está no caminho certo para a inteligência emocional.', emoji: '💭' },
  { min: 60, max: 74, label: 'Equilibrado', description: 'Boa capacidade de lidar com emoções.', emoji: '⚖️' },
  { min: 75, max: 89, label: 'Empático', description: 'Excelente conexão emocional!', emoji: '💝' },
  { min: 90, max: 100, label: 'Mestre Emocional', description: 'Inteligência emocional excepcional!', emoji: '🌟' },
];

const personalityLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Introvertido', description: 'Você valoriza momentos de reflexão e conexões profundas.', emoji: '🦋' },
  { min: 40, max: 59, label: 'Ambivalente', description: 'Equilibra bem introversão e extroversão.', emoji: '🌗' },
  { min: 60, max: 74, label: 'Sociável', description: 'Aprecia interações sociais mantendo sua individualidade.', emoji: '🤝' },
  { min: 75, max: 89, label: 'Extrovertido', description: 'Energizado por conexões sociais!', emoji: '🎉' },
  { min: 90, max: 100, label: 'Super Social', description: 'Naturalmente carismático e comunicativo!', emoji: '⚡' },
];

const vocationalLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Explorador', description: 'Ainda descobrindo seu caminho profissional.', emoji: '🧭' },
  { min: 40, max: 59, label: 'Curioso', description: 'Interesses variados aguardando foco.', emoji: '🔍' },
  { min: 60, max: 74, label: 'Direcionado', description: 'Clareza crescente sobre sua carreira.', emoji: '🎯' },
  { min: 75, max: 89, label: 'Focado', description: 'Visão clara do seu caminho profissional!', emoji: '🚀' },
  { min: 90, max: 100, label: 'Determinado', description: 'Propósito profissional definido!', emoji: '🏆' },
];

const neuroLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Em Treinamento', description: 'Continue exercitando sua mente.', emoji: '🏋️' },
  { min: 40, max: 59, label: 'Ativo', description: 'Boa atividade neural em desenvolvimento.', emoji: '⚡' },
  { min: 60, max: 74, label: 'Afiado', description: 'Processamento mental eficiente.', emoji: '🎯' },
  { min: 75, max: 89, label: 'Rápido', description: 'Excelente velocidade de processamento!', emoji: '⚡' },
  { min: 90, max: 100, label: 'Brilhante', description: 'Performance neural excepcional!', emoji: '💡' },
];

const psychLabels: ScoreLabel[] = [
  { min: 0, max: 39, label: 'Atenção', description: 'Considere buscar apoio profissional.', emoji: '🤗' },
  { min: 40, max: 59, label: 'Alerta', description: 'Cuide da sua saúde mental.', emoji: '💭' },
  { min: 60, max: 74, label: 'Estável', description: 'Bem-estar psicológico moderado.', emoji: '⚖️' },
  { min: 75, max: 89, label: 'Saudável', description: 'Ótimo estado psicológico!', emoji: '🌻' },
  { min: 90, max: 100, label: 'Florescendo', description: 'Excelente saúde mental!', emoji: '🌟' },
];

const testLabels: Record<string, ScoreLabel[]> = {
  iq: iqLabels,
  eq: eqLabels,
  personality: personalityLabels,
  vocational: vocationalLabels,
  neuro: neuroLabels,
  psych: psychLabels,
};

export function getScoreLabel(testType: string, score: number): ScoreLabel {
  const labels = testLabels[testType.toLowerCase()] || iqLabels;
  const label = labels.find((l) => score >= l.min && score <= l.max);
  return label || labels[labels.length - 1];
}

export function getScoreLabelText(testType: string, score: number): string {
  const { label, emoji } = getScoreLabel(testType, score);
  return `${emoji} ${label}`;
}
