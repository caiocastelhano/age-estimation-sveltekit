<!-- let: cria a variável name com valor vazio. -->
<script>
  let name = ""; 
</script>

<!-- label: cria o texto associado ao campo do input -->
<!-- input: cria o campo em que o usuário vai digitar. valor será sincronizado com o variável name. -->
<!-- if: se name tiver algum valor, <p> vai aparecer no navegador. -->
<main>
    
    <label for="nameInput">Digite um nome:</label> 

    <input
        id="nameInput"
        type="text"
        bind:value={name}
        placeholder="Ex: Alberto"
    />

    {#if name}
        <p>Você digitou: {name}</p>
    {/if}
</main>


