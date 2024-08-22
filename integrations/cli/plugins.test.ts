import { candidate, css, html, json, test } from '../utils'

test(
  'builds the typography plugin utilities',
  {
    fs: {
      'package.json': json`
        {
          "dependencies": {
            "@tailwindcss/typography": "^0.5.14",
            "tailwindcss": "workspace:^",
            "@tailwindcss/cli": "workspace:^"
          }
        }
      `,
      'index.html': html`
        <div className="prose">
          <h1>Headline</h1>
          <p>
            Until now, trying to style an article, document, or blog post with Tailwind has been a
            tedious task that required a keen eye for typography and a lot of complex custom CSS.
          </p>
        </div>
      `,
      'src/index.css': css`
        @import 'tailwindcss';
        @plugin '@tailwindcss/typography';
      `,
    },
  },
  async ({ fs, exec }) => {
    await exec('pnpm tailwindcss --input src/index.css --output dist/out.css')

    await fs.expectFileToContain('dist/out.css', [
      candidate`prose`,
      ':where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *))',
      ':where(tbody td, tfoot td):not(:where([class~="not-prose"],[class~="not-prose"] *))',
    ])
  },
)

test(
  'builds the forms plugin utilities',
  {
    fs: {
      'package.json': json`
        {
          "dependencies": {
            "@tailwindcss/forms": "^0.5.7",
            "tailwindcss": "workspace:^",
            "@tailwindcss/cli": "workspace:^"
          }
        }
      `,
      'index.html': html`
        <input type="text" class="form-input" />
        <textarea class="form-textarea"></textarea>
      `,
      'src/index.css': css`
        @import 'tailwindcss';
        @plugin '@tailwindcss/forms';
      `,
    },
  },
  async ({ fs, exec }) => {
    await exec('pnpm tailwindcss --input src/index.css --output dist/out.css')

    await fs.expectFileToContain('dist/out.css', [
      //
      candidate`form-input`,
      candidate`form-textarea`,
    ])
    await fs.expectFileNotToContain('dist/out.css', [
      //
      candidate`form-radio`,
    ])
  },
)