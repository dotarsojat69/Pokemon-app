# Pokemon App

<p className="text-justify">
  Explore the digital realm of Pokémon on this website, where an extensive database awaits you. Dive into detailed profiles showcasing each Pokémon's name, stats, abilities, and more. Feel the thrill of catching your favorite Pokémon as you build your collection. Track your progress on the "My Pokémon" page and witness the results of your endeavors in capturing and nurturing these creatures.
</p>

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Link: https://new-pokemon-app.vercel.app/