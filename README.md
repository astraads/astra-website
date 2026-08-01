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
| `VITE_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `VITE_SUPABASE_ANON_KEY` | Anon/public key de Supabase | Sí (pública; RLS protege datos) |

**Nunca** pongas la `service_role` key, tokens de servidor o contraseñas en variables `VITE_*` (se embeben en el frontend).

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

## Despliegue (Vercel + Supabase)

### 1. Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com/dashboard) (organización ASTRA).
2. En **SQL Editor**, ejecuta el contenido de `supabase/migrations/20260322000000_leads.sql`.
3. En **Project Settings → API**, copia `Project URL` y `anon` `public` key.
4. Pégalas en `.env.local` como `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

Los leads del formulario quedan en la tabla `leads` (solo insert público; lectura solo desde el dashboard).

### 2. Vercel

1. En [vercel.com/new](https://vercel.com/new), importa el repo `astraads/astra-website`.
2. Framework: Vite (auto). Build: `npm run build`. No pongas Output Directory manual.
3. Añade las mismas variables `VITE_*` (WhatsApp, Instagram, Site URL, Supabase).
4. Deploy. Conecta el dominio y actualiza `VITE_SITE_URL`, `public/sitemap.xml` y `public/robots.txt`.
5. Verifica `/`, `/privacidad`, `/terminos` y que el formulario guarde en Supabase + abra WhatsApp.

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
- Logo: `public/logo-astra.png` y `src/assets/logo-astra.png`

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
**No** force-push ni reescribas historial en ramas ya publicadas.

## Rollback

```bash
git checkout main
git tag               # localiza v1.0.0 u otra release
git checkout v1.0.0   # inspección
# O revertir el último deploy desde el panel del hosting
```

## Legal

Las páginas legales viven en `/privacidad`, `/terminos`, `/tratamiento-datos` y `/cookies`.

## Scripts

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo |
| `npm run build` | Build producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint |
