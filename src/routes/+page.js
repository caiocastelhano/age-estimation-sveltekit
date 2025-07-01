/** @type {import('./$types').PageLoad} */
// Função de carregamento executada sempre que a URL muda
export async function load({ url, fetch }) {
  // Lê o parâmetro "name" da querystring da URL
  const name = url.searchParams.get('name');

  // Se não houver nome (ou só espaços), não faz requisição
  if (!name || name.trim() === "") {
    return { ageData: null };
  }

  // Faz requisição para a API agify.io com o nome
  const res = await fetch(`https://api.agify.io?name=${name}`);
  const data = await res.json();

  // Retorna os dados para o componente +page.svelte
  return {
    ageData: data
  };
}
