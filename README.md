# bettercommerce-next-app

Project starter for Next.js app enabled with BetterCommerce Auth.

## Getting Started

First, run the following command to create a new project:

```bash
npx create-next-app my-app -e https://github.com/better-commerce/bettercommerce-next-app
```

or if you're using yarn

```bash
yarn create next-app my-app -e https://github.com/better-commerce/bettercommerce-next-app
```

## App Configuration

Clone .env from .env.example and place it at the project root folder.

- **AUTH_CURRENT_MODULE** refers to the module name.
- **AUTH_COOKIE_VALIDATION_ENABLED** should be false in development mode only.
- **CIPHER_ENCRYPTION_KEY** is the 32-bit key used for encryption. This should be maintained uniquely per app/project.

## Running App
After the installation of the project, navigate to the project directory and run the following command to spin up the development server

```bash
npm run dev
```

or if you're using yarn

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Next.js 13.x.x, React 18.x.x, RTK, Tailwind CSS
- Organized structure for styles, components, pages, services, context & state management
- In-built components like Layout, Nav (left-navigation), Header, and Footer
- Extends BetterCommerceAuth feature for authentication
