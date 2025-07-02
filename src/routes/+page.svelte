<script>
  // Permite acessar informações da URL atual
  import { page } from '$app/stores';
  // Atualiza a URL dinamicamente, sem recarregar a página
  import { goto } from '$app/navigation';

  // Nome digitado pelo usuário
  // Versão estabilizada do nome, que só muda 1 segundo depois que o usuário para de digitar
  // ID do setTimeout, usado para controlar o debounce manualmente
  let name = "";
  let debouncedName = "";
  let debounceTimeout;

  // Recebe os dados retornados pela função load()
  export let data;
  $: ageData = data.ageData;

  // Flag que garante que o valor do input será sincronizado com a URL apenas na primeira renderização
  let initialized = false;

  // Ao carregar a página, se houver ?name= na URL, preenche o input com esse valor
  $: {
    if (!initialized) {
      const searchName = $page.url.searchParams.get("name");
      if (searchName) {
        name = searchName;
        debouncedName = searchName;
      }
      initialized = true;
    }
  }

  // Quando "name" muda: cancela o timer anterior, inicia um novo e, após 1s sem digitar, atualiza o debouncedName
  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedName = name;
    }, 1000);
  }

  // Sincroniza a URL com o valor do input
  $: {
    const currentSearch = $page.url.searchParams.get("name");

    if (debouncedName && currentSearch !== debouncedName) {
      // Se tem nome, atualiza a querystring normalmente
      const newUrl = `/?name=${encodeURIComponent(debouncedName)}`;
      goto(newUrl, { replaceState: true });
    }

    if (debouncedName === "" && currentSearch) {
      // Se o campo foi apagado, remove ?name da URL
      goto("/", { replaceState: true });
    }
  }
</script>

<main>
  <!-- Título da página -->
  <h1>Descubra a idade estimada a partir de um nome</h1>

  <!-- Rótulo do campo de input -->
  <label for="nameInput">Digite um nome:</label>

  <!-- Campo de input para o usuário digitar o nome, com sugestão visível -->
  <input
    id="nameInput"
    type="text"
    bind:value={name}
    placeholder="Ex: Beatriz"
  />

  <!-- Se o campo não estiver vazio e houver resposta da API (ageData), exibe os dados retornados pela requisição -->
  {#if name.trim() !== "" && ageData}
    <div class="result">
      <p>Nome: {ageData.name}</p>
      <p>Idade estimada: {ageData.age}</p>
      <p>Baseado em {ageData.count} registros</p>
    </div>
  {/if}
</main>

<style>
  /* Importa a fonte Montserrat do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

  /* Estilo global do corpo da página */
  :global(body) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #135329;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  /* Container principal da interface */
  main {
    max-width: 600px;
    width: 100%;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border: 1.5px solid black;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    font-family: sans-serif;
  }

  /* Título principal */
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
  }

  /* Estilo do label */
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 1rem;
    color: #444;
  }

  /* Campo de input */
  input {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  /* Estilo quando o input está em ativo */
  input:focus {
    border-color: #135329;
    outline: none;
  }

  /* Estilo do bloco de exibição do resultado da API */
  .result {
    width: 100%;
    background-color: #edebeb;
    border-left: 4px solid #c4d82d;
    padding: 1rem;
    border-radius: 8px;
    color: #222;
    box-sizing: border-box;
  }

  /* Estilo dos parágrafos dentro do bloco de resultado */
  .result p {
    margin: 0.3rem 0;
  }
</style>
