# Previsão de Idade por Nome

Esta é uma aplicação frontend desenvolvida com **SvelteKit**, que utiliza a API pública [agify.io](https://agify.io) para estimar a idade média de uma pessoa com base no nome digitado.

---

## Funcionalidades

- Consulta à API [agify.io](https://agify.io)
- Campo de input reativo com debounce de 1 segundo
- Sincronização da URL com a busca (`?name=...`)
- Exibição da idade média estimada e base de registros
- Layout responsivo com CSS puro (sem frameworks)
- Estilização inspirada na identidade visual da Voltera

---

## Tecnologias utilizadas

- [SvelteKit](https://kit.svelte.dev/)
- CSS puro com escopo local no `+page.svelte`
- API REST [agify.io](https://agify.io)

---

## Etapas do desenvolvimento

### 01 – Setup do Projeto
- Criação do projeto com SvelteKit
- Estrutura inicial e roteamento automático da página principal

### 02 – Entrada de Dados e Sincronização com a URL
- Campo de input criado com `bind:value`
- Sincronização da URL com `goto()` sempre que o nome muda
- Se a página for carregada com `?name=`, o input é preenchido automaticamente

### 03 – Integração com a API
- Implementação do `load()` para buscar dados da agify.io
- A resposta da API (`name`, `age`, `count`) é exibida na interface
- Tratamento do estado inicial e limpeza da URL se o campo for apagado

### 04 – Estilização com CSS puro
- Fonte Montserrat importada do Google Fonts
- Layout centralizado vertical e horizontalmente
- Paleta de cores inspirada no site da Voltera:
  - Verde escuro: `#135329`
  - Verde-limão: `#c4d82d`
- Input e resultado visualmente alinhados
- CSS no componente

---

## Como rodar o projeto localmente

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:5173 (ou a porta indicada no terminal).

---

## Desenvolvido por

[Caio Castelhano](https://www.caiocastelhano.com.br/)