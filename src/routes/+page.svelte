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
  <label for="nameInput">Digite um nome:</label>

  <input
    id="nameInput"
    type="text"
    bind:value={name}
    placeholder="Ex: Alberto"
  />

  {#if name.trim() !== "" && ageData}
    <p>Nome: {ageData.name}</p>
    <p>Idade estimada: {ageData.age}</p>
    <p>Baseado em {ageData.count} registros</p>

  {:else if name.trim() !== "" && $page.url.searchParams.get('name')}
    <p>Carregando...</p>
  {/if}
</main>
