import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import boundaries from 'eslint-plugin-boundaries'

// Atomic design is ENFORCED here. Lower layers must never import higher layers.
//   atoms -> (nothing from components/)
//   molecules -> atoms
//   organisms -> atoms, molecules
//   templates -> atoms, molecules, organisms
//   pages -> any component layer
export default tseslint.config(
  { ignores: ['dist', 'ios', 'android', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, boundaries },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/elements': [
        { type: 'atoms', pattern: 'src/components/atoms' },
        { type: 'molecules', pattern: 'src/components/molecules' },
        { type: 'organisms', pattern: 'src/components/organisms' },
        { type: 'templates', pattern: 'src/components/templates' },
        { type: 'pages', pattern: 'src/pages' },
        { type: 'lib', pattern: 'src/lib' },
        { type: 'hooks', pattern: 'src/hooks' },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            { from: { element: { type: 'atoms' } }, disallow: { to: { element: { types: ['molecules', 'organisms', 'templates', 'pages'] } } }, message: 'Atoms may not import molecules/organisms/templates/pages.' },
            { from: { element: { type: 'molecules' } }, disallow: { to: { element: { types: ['molecules', 'organisms', 'templates', 'pages'] } } }, message: 'Molecules may only import atoms.' },
            { from: { element: { type: 'organisms' } }, disallow: { to: { element: { types: ['organisms', 'templates', 'pages'] } } }, message: 'Organisms may only import atoms and molecules.' },
            { from: { element: { type: 'templates' } }, disallow: { to: { element: { types: ['templates', 'pages'] } } }, message: 'Templates may not import pages or other templates.' },
            { from: { element: { types: ['lib', 'hooks'] } }, disallow: { to: { element: { types: ['atoms', 'molecules', 'organisms', 'templates', 'pages'] } } }, message: 'lib/hooks must not depend on UI components.' },
          ],
        },
      ],
    },
  },
)
