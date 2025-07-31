/**
 * Formata o status removendo hífens e colocando a primeira letra em maiúscula
 * @param status - O status do livro (ex: "não-lido", "quero-ler")
 * @returns O status formatado (ex: "Não lido", "Quero ler")
 */
export const formatStatus = (status: string): string => {
  return status
    .replace(/-/g, ' ') // Remove hífens
    .replace(/^\w/, (c) => c.toUpperCase()); // Primeira letra maiúscula
};
