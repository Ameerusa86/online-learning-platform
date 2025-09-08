# Online Learning Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design System Extensions

The project includes a lightweight design layer built atop Tailwind CSS (v4) using CSS custom properties defined in `app/globals.css`.

### Tokens

Colors (light/dark), radii, and gradients are exposed via CSS variables (`--primary`, `--gradient-start`, etc). Spacing scale tokens:

```text
--space-xs (0.5rem)
--space-sm (0.75rem)
--space-md (1rem)
--space-lg (1.5rem)
--space-xl (2rem)
--space-2xl (3rem)
--space-3xl (4rem)
```

### Utilities Added

- `text-gradient` – gradient text
- `bg-gradient-brand` – brand gradient background
- `glass` – translucent blurred panel
- `reveal`, `reveal-zoom`, `is-visible` – scroll reveal animation helpers
- `pad-x-page`, `pad-section-y` – consistent horizontal/vertical section spacing

### Components Added

- `Badge` (`components/ui/badge.tsx`): variants: `default | outline | glow | soft`
- `SectionHeading` (`components/marketing/section-heading.tsx`)

### Motion / Reveal

Hook: `useReveal` adds `is-visible` when element enters viewport. Combine with `.reveal` or `.reveal-zoom` classes for animation.

Example:

```tsx
const ref = useReveal();
return (
  <div ref={ref} className="reveal">
    Content
  </div>
);
```

### Theming

Modify brand colors by adjusting `--gradient-start`, `--gradient-mid`, `--gradient-end` in `:root` and `.dark`.

### Accessibility

Dark mode foreground/muted contrasts have been tuned; validate further with tooling (e.g. axe) if you change tokens.

---

For further UI refinement, consider extracting a dedicated `theme.ts` map or adding a figma token sync pipeline.
