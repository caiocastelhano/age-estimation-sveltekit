<script>
  // Importa o estado da página e a função para navegação programática
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Estado do input e debounce
  let name = "";
  let debouncedName = "";
  let debounceTimeout;

  // Dados vindos do load()
  export let data;
  $: ageData = data.ageData;

  // Flag para inicializar o valor do input com a URL (só na 1ª vez)
  let initialized = false;

  // Ao carregar a página, se houver ?name=, preenche o input com ele
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

  // Aplica debounce de 1000ms antes de atualizar a querystring
  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedName = name;
    }, 1000);
  }

  // Atualiza a URL com ?name=... sempre que o debouncedName mudar
  $: {
    const currentSearch = $page.url.searchParams.get("name");

    if (debouncedName && currentSearch !== debouncedName) {
      // Se tem nome → atualiza a querystring normalmente
      const newUrl = `/?name=${encodeURIComponent(debouncedName)}`;
      goto(newUrl, { replaceState: true });
    }

    if (debouncedName === "" && currentSearch) {
      // Se apagou tudo → remove ?name da URL
      goto("/", { replaceState: true });
    }
  }
</script>

<main>
  <h1>Descubra a idade estimada a partir de um nome</h1>

  <label for="nameInput">Digite um nome:</label>

  <input
    id="nameInput"
    type="text"
    bind:value={name}
    placeholder="Ex: Beatriz"
  />

  {#if name.trim() !== "" && ageData}
    <div class="result">
      <p>Nome: {ageData.name}</p>
      <p>Idade estimada: {ageData.age}</p>
      <p>Baseado em {ageData.count} registros</p>
    </div>
  {/if}
</main>

<style>
  /* Import da fonte Montserrat do Google Fonts */
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

  /* Estilo do label e do campo de input */
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 1rem;
    color: #444;
  }

  input {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  /* Estilo ao focar no input */
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

  .result p {
    margin: 0.3rem 0;
  }
</style>
