# ai-facade

Next.js shell hosting the **poc-companion** detik.com AI prototype. The HTML/CSS/JS prototypes live in `public/` and are served as static assets:

| Path | Page |
| --- | --- |
| `/` | redirects to `/index.html` |
| `/index.html` | detik.com home (with floating AI button) |
| `/index2.html` | home with scripted Tom Lembong AI scenario |
| `/article.html` | News article detail |
| `/article-finance.html` | detikFinance article detail |
| `/ai-chat.html` | full AI chat with user/session memory + workflow panel |
| `/ai-chat-tom.html` | scripted 3-turn Tom Lembong chat demo |

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- AI responses are scripted (per design intent); no Claude API call.
- The pages cross-link with bare relative paths (e.g. `index.html`, `article.html`), which resolve correctly when served from `public/`.
- Source design bundle is in `_design/poc-companion/`.
