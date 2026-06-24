# Brand catalogues

Drop each brand's catalogue PDF in **this folder**, named exactly as listed
below (lowercase, no spaces). The "Catalogue" button on each brand card links
to the matching file.

| Brand | File to add here | From the client |
|-------|------------------|-----------------|
| Paseo | `paseo.pdf` | PASEO Product Catalogue.pdf |
| Origami | `origami.pdf` | Origami Catalogue.pdf |
| Kressa | `kressa.pdf` | (pending) |
| Premier | `premier.pdf` | (pending) |
| Opik | `opik.pdf` | (pending) |
| Milton | `milton.pdf` | (pending) |

## How to add one

1. Rename the PDF the client sent to the exact name above (e.g.
   `PASEO Product Catalogue.pdf` → `paseo.pdf`).
2. Put it in this `public/catalogues/` folder.
3. That's it — the button starts working after the next `npm run dev` / build.

## If a brand has no catalogue yet

The "Catalogue" button only needs the file to exist. Until a brand's PDF is
added, its button will lead to a "not found" page. To hide the button for a
brand entirely, remove that brand's `catalogue:` line in
`src/data/products.js`.
