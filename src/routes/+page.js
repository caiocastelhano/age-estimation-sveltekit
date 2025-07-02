// Define a função load
// É executada toda vez que a página é acessada ou a URL muda
export async function load({ url, fetch }) {
  // Extrai o parâmetro "name" da querystring da URL, se houver
  const name = url.searchParams.get('name');

  // Se não houver parâmetro "name" (ou se for só espaços em branco), não faz requisição
  // Evita chamadas desnecessárias à API
  if (!name || name.trim() === "") {
    return { ageData: null };
  }

  // Faz requisição para a API, enviando o nome como parâmetro na URL
  // A resposta é armazenada na variável "res"
  const res = await fetch(`https://api.agify.io?name=${name}`);

  // Converte o corpo da resposta (que está em JSON) para um objeto JavaScript
  // O resultado é armazenado na variável "data"
  const data = await res.json();

  // Retorna os dados como "ageData", que será recebido no +page.svelte
  return {
    ageData: data
  };
}
