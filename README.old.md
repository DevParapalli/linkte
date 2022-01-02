# Linkte

Everything to get your linktr.ee Clone up and running.

## Creating your project

> Note: You need `Node 17` and `Yarn` to build this project. Use `npm install -g yarn` to install it.

```bash
# Clone this repository.
npx --yes degit DevParapalli/linkte
cd linkte

# Install deps
yarn

# create .env file
touch .env
## Now add DWEET_KEY="<your_key>" to this file.

# Enter development mode.
yarn dev

# To build application
yarn build
# To preview the built app
yarn preview
```

## Porting to other platforms

The application is built using [SvelteKit](https://kit.svelte.dev/). You only need to install and change the adapter in `svelte.config.js`. Check the [SvelteKit documentation](https://kit.svelte.dev/docs#adapters) for more information.

## Adding your own links

The file `src/links.json` contains the list of links. You can add your own links by editing this file.

```bash
cp src/links.json src/links.json.bak
```

Now edit the links.json file, make sure to confirm to format of the file.

## Changing the styles

The site is written using [Tailwind CSS](https://tailwindcss.com/). You will have to change the styles in each file.

## Previewing your own links.json

Goto `https://devparapalli.netlify.app/external?file=<your_hosted_file>.json` to preview
