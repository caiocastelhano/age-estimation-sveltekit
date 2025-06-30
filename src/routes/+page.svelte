<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let name = "";
  let debouncedName = "";
  let debounceTimeout;

  $: {
    const searchName = $page.url.searchParams.get("name");
    if (searchName && name === "") {
      name = searchName;
      debouncedName = searchName;
    }
  }

  $: if (debouncedName) {
    const currentSearch = $page.url.searchParams.get("name");
    if (currentSearch !== debouncedName) {
      const newUrl = `/?name=${encodeURIComponent(debouncedName)}`;
      goto(newUrl, { replaceState: true });
    }
  }

  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedName = name; 
    }, 1000);
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

  {#if debouncedName}
    <p>Você digitou: {debouncedName}</p>
  {/if}
</main>
