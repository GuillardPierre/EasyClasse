export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
