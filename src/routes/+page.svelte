<!-- let name: cria a variável name com valor vazio, diretamente ligada ao input pelo bind:value. -->
<!-- let debouncedName: cria a variável debouncedName com valor vazio - só é atualizada depois da espera. -->
<!-- let debounceTimeout: cria a referência do tempo de espera -->

<!-- tempo de espera anterior é cancelado -->
<!-- novo timeout é criado com 1000ms -->
<!-- se o tempo passar e o usuário não digitar de novo, debouncedName é atualizado com o valor de name -->

<script>
  let name = "";
  let debouncedName = "";
  let debounceTimeout;

  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedName = name; 
    }, 1000);
  }
</script>

<!-- label: cria o texto associado ao campo do input -->
<!-- input: cria o campo em que o usuário vai digitar. valor será sincronizado com o variável name. -->
<!-- if: se debouncedName existir, <p> vai aparecer no navegador. -->
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


