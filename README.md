# ASTRA — sitio web

Partner tecnológico global: sitios web, Meta Ads, aplicaciones SaaS y estrategia digital.

## Requisitos

- Node.js 20+
- npm (o bun)

## Instalación

```bash
npm install
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales.

## Variables de entorno

| Variable | Descripción | Pública |
|----------|-------------|---------|
| `VITE_WHATSAPP_NUMBER` | Número con código de país, solo dígitos | Sí (contacto) |
| `VITE_INSTAGRAM_URL` | URL completa del perfil | Sí |
| `VITE_SITE_URL` | URL canónica de producción (https://…) | Sí |
| `VITE_META_PIXEL_ID` | Meta Pixel (opcional) | Sí |
| `VITE_GOOGLE_ANALYTICS_ID` | GA4 (opcional) | Sí |
| `VITE_GOOGLE_TAG_MANAGER_ID` | GTM (opcional) | Sí |

**Nunca** pongas API keys privadas, tokens de servidor o contraseñas en variables `VITE_*` (se embeben en el frontend).

## Desarrollo

```bash
npm run dev
```

Abre la URL local que imprime Vite (por defecto `http://localhost:8080`).

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

1. Configura las mismas variables `VITE_*` en el panel del hosting (Lovable / Cloudflare / Vercel / etc.).
2. Activa HTTPS y redirige HTTP → HTTPS.
3. Apunta el dominio a la app y actualiza `VITE_SITE_URL`, `public/sitemap.xml` y `public/robots.txt`.
4. Verifica `/`, `/privacidad`, `/terminos` y refresh sin 404.
5. Comprueba que `public/_headers` se aplique (security headers).

## Cambiar WhatsApp o Instagram

Edita `.env.local` (o el panel del hosting):

```env
VITE_WHATSAPP_NUMBER=573006868841
VITE_INSTAGRAM_URL=https://www.instagram.com/astra_ads_/
```

Los CTA leen `src/config/site.ts` — no hace falta tocar cada botón.

## Actualizar contenido

- Landing: `src/routes/index.tsx`
- Hero / coverflow: `src/components/hero-carousel.tsx`
- Config / mensajes WA: `src/config/site.ts`
- Estilos / tokens: `src/styles.css`

## Git (flujo recomendado)

```bash
git checkout develop
git checkout -b feat/mi-cambio
# …cambios…
git add -A
git commit -m "feat: describe el cambio"
git checkout develop
git merge feat/mi-cambio
# Tras pruebas → merge a main y tag
```

- `main` — producción estable  
- `develop` — integración y pruebas  

**No** subas `.env` / `.env.local`.  
**No** force-push ni reescribas historial en ramas ya publicadas (especialmente si el proyecto está conectado a Lovable).

## Rollback

```bash
git checkout main
git tag               # localiza v1.0.0 u otra release
git checkout v1.0.0   # inspección
# O revertir el último deploy desde el panel del hosting
```

## Legal

`/privacidad` y `/terminos` son **borradores**. Deben ser revisados por un profesional según los países donde opere ASTRA.

## Scripts

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo |
| `npm run build` | Build producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint |
