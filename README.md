Next Auth
===

[VEJA A DEMO ONLINE AQUI](https://next-auth-angelorubin.vercel.app/auth)

## Descrição
Estrutura inicial de um sistema web (frontend e API) com autenticação básica (email e password) integrada.

## Tecnologias utilizadas
* Node
* Yarn
* NextJS
* Next-Auth
* MongoDB Atlas
* Mongoose
* Tailwind

## Instalação
> É preciso ter o Node.js instalado em seu sistema, veja como fazer isso [aqui](https://nodejs.org/pt-br/download).

> É preciso ter algum gerenciador de pacotes como yarn ou npm instalado em seu sistema. Veja como instalar o yarn [aqui](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) ou o npm [aqui](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

> Você pode clonar o projeto através do console diretamente para o seu computador, mas para isso é preciso ter o git instalado e configurado em seu computador, veja como fazer isso [aqui](https://docs.github.com/pt/get-started/quickstart/set-up-git).

Com o Git instalado, clone o projeto.
Para isso abra o console e digite o seguinte comando:

`git clone https://github.com/angelorubin/next-auth.git`

Com isso o projeto será clonado diretamente para o seu computador no diretório que você estiver com o console aberto.

Em caso de download do projeto, descompacte-o em uma pasta de sua preferência.

Com o projeto (descompactado ou clonado), abra o console de sua preferência e digite:

`yarn install` ou `npm install`

Com isso todas as dependências do projeto serão instaladas.

O próximo passo é preencher as variáveis de ambiente que se encontram na raíz do projeto no arquivo **.env.local**

> IMPORTANTE: É necessário criar uma conta no MongoDB atlas (gratuita) para poder criar um banco de dados para poder armazenar as informações do seu sistema online. Veja como fazer isso clicando [aqui](https://www.mongodb.com/docs/atlas/tutorial/create-atlas-account/).

Com tudo configurado e com as váriáveis de ambiente devidamente preenchidas, podemos iniciar o projeto em modo de desenvolvimento, para isso digite o seguinte comando no console:

`yarn dev`

Com isso ja teremos nossa aplicação rodando localmente.

Para acessar a aplicação abra o navegador e digite o seguinte endereço:

`http://localhost:3000`

Se tudo foi configurado corretamente, nesse momento será exibida a pagina inicial de autenticação do sistema.

## Create Next App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
