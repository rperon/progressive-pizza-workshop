# 03. Routing

Before doing any modification regarding the routes, remove Tailwind styling. The default Remix template comes with
Tailwind preconfigured.

Go to `app/tailwind.css` and remove all the content. We will put it again when we will need Tailwind, we promess!

Remix uses file based routing which means that the url is based on the file name. Each route is specified by a file located in `app/routes`. The route file needs at least a default exported function that returns a React Node.

For our pizza app, we need 2 pages: the first one is where the user specify the pizza size and toppings, the second is used to display a confirmation message.

Replace the template `app/routes/_index.tsx`

```jsx
export default function Index() {
  return (
    <main>
      <h2>Remixez votre pizza</h2>
      {/* TODO: size and toppings selection */}
    </main>
  );
}
```

Remove the `resources` variable, we won't need that. Also, you can remove the Remix logo images `public/logo-dark.png` and
`public/logo-light.png`.

create a file `app/routes/confirmation.tsx`

```jsx
export default function Confirmation() {
  return (
    <main>
      <h2>Merci pour votre commande</h2>
      <p>
        Votre pizza sera prête dans quelques minutes. Vous serez notifié une
        fois que c&apos;est pr&ecirc;t.
      </p>
      <a href="/">Lancer une nouvelle commande</a>
    </main>
  );
}
```

If you want to learn more about the convention used by Remix, you can check the
[visualization](https://interactive-remix-routing-v2.netlify.app) done by Dilum Sanjaya.
