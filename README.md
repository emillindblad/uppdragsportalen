# Uppdragsportalen
> A project in DAT076 Web applications at Chalmers University of Technology
> The final report can be found [here](https://github.com/emillindblad/uppdragsportalen/blob/master/docs/final_report.pdf)

Uppdragsportalen is a portal where [Mottagningskommittén](https://mk.chs.chalmers.se) can mange Nolluppdrag in preperation for the reception weeks.

## Getting started
1. Install dependencies
```bash
npm install
```
2. Create a .env file and manually populate the variables
```bash
cp .env.example .env
```
> **Note**
> This project is configured to use a database provided by [CockroachDB](https://www.cockroachlabs.com/). In order to use a database, either create a free database on their
service or connect to a local postgresql instance like so:
>
> In `schema.prisma` change the provider to
>```ts
>provider="postgresql"
>```
> Note that a local sqlite database is not possible since sqlite does not support enums.

4. Push the schema to the db
```bash
npx prisma db push
```

3. Start the dev server
```bash
npm run dev
```
4. Run tests
```bash
npm run test # run all tests
npm run test:e2e # run only end-to-end test
npm run test:unit # run only unit tests
```
> **Note**
> After running all tests or e2e tests a node server is left running, This can cause future tests to fail. Make sure to kill all node instances after running the tests.


## File structure
Below is a file tree containing important files and folders for the application.

```bash
├── docs # contains the final report
├── e2e # contains End-to-end tests
├── prisma # contains the prisma schema, a dev db file and a script for seeding
│   ├── db.sqlite
│   ├── schema.prisma
│   └── seed.ts
├── public # static assets
│   ├── img
│   ├── favicon.ico
│   └── humans.txt
├── src
│   ├── components # React components
│   │   ├── AssignmentData.tsx
│   │   ├── ErrorText.tsx
│   │   ├── homepageSkeleton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── MainPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── Page.tsx
│   │   ├── SideButton.tsx
│   │   ├── SideMenu.tsx
│   │   └── UppdragComment.tsx
│   ├── env # files for validating environment variables
│   │   ├── client.mjs
│   │   ├── schema.mjs
│   │   └── server.mjs
│   ├── pages # pages, or client side "routes"
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth].ts # nextauth endpoint for client
│   │   │   └── trpc
│   │   │       └── [trpc].ts # trpc endpoint for client
│   │   ├── uppdrag
│   │   │   ├── edituppdrag
│   │   │   │   └── [id].tsx
│   │   │   ├── viewuppdrag
│   │   │   │   └── [id].tsx
│   │   │   └── newuppdrag.tsx
│   │   ├── accounts.tsx
│   │   ├── _app.tsx # app root
│   │   ├── archive.tsx
│   │   ├── chalmers.tsx
│   │   ├── home.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── review.tsx
│   │   └── user.tsx
│   ├── server # server side code
│   │   ├── api
│   │   │   ├── routers # trpc routers
│   │   │   │   ├── uppdragrouter.ts
│   │   │   │   └── userrouter.ts
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── hash.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── next-auth.d.ts
│   ├── utils
│   │   └── api.ts
│   └── middleware.ts # nextjs middleware, runs on each request from the client.
├── __tests__ # unit tests
│   ├── UppdragRouter.test.tsx
│   └── UserRouter.test.tsx
├── .env.example
├── .eslintrc.json
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
├── postcss.config.cjs
├── prettier.config.cjs
├── readme.md
├── README.md
├── T3.md
├── tailwind.config.cjs
├── tsconfig.json
└── vitest.config.ts
```

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
