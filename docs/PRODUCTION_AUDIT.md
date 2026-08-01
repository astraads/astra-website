# ASTRA — Auditoría de producción (v1.0.0)

Fecha: 2026-07-31  
Clasificación: CRÍTICO · IMPORTANTE · RECOMENDADO · OPCIONAL

---

## Resumen ejecutivo

El sitio **compila en producción** (`npm run build` OK), no tiene vulnerabilidades npm abiertas tras `npm audit fix`, y WhatsApp/Instagram están centralizados. **No está “listo para declarar lanzamiento absoluto”** hasta completar los puntos de intervención manual (dominio real, legal revisado, consent analytics, OG absoluto).

---

## Problemas críticos encontrados

| # | Problema | Estado |
|---|----------|--------|
| C1 | **No existía repositorio Git** — sin historial ni rollback | Parcial: `git init` + archivos staged. **Falta commit/tag**: configurar `user.name` / `user.email` y crear commit + tag `v1.0.0` |
| C2 | **2 vulnerabilidades high** (`brace-expansion`, `postcss`) | Corregido: `npm audit fix` → 0 vulnerabilidades |
| C3 | **Sin menú móvil** (nav solo `md:flex`) | Corregido: menú hamburguesa + CTA |
| C4 | **Sin headers de seguridad** en deploy | Corregido: `public/_headers` (CSP, HSTS, etc.) |

---

## Problemas corregidos (esta sesión)

- `.gitignore` refuerza `.env` / `.env.*` (mantiene `.env.example`)
- Formulario: honeypot, rate-limit cliente, sanitización, `maxLength`, validación teléfono, aviso privacidad
- Eventos analítica preparados (`trackEvent`) sin IDs inventados
- Favicon SVG, canonical, OG url, sitemap con /privacidad y /terminos
- Páginas legales borrador + footer
- 404 / error en español
- Fuentes Google reducidas (menos pesos)
- Lazy-load en imágenes de Trabajo
- README de operación
- Build Nitro/Cloudflare verificado

---

## Intervención manual requerida

### CRÍTICO

1. **Dominio real**  
   Actualiza `VITE_SITE_URL`, `public/sitemap.xml`, `public/robots.txt` al dominio definitivo (hoy: `https://astra.studio` — verificar si es el dominio correcto).

2. **Confirmar headers en el hosting**  
   Tras el primer deploy, inspecciona response headers. Si el proveedor no usa `_headers` de Cloudflare, replica CSP/HSTS en su panel.

3. **Textos legales**  
   `/privacidad` y `/terminos` son **borradores**. Hazlos revisar por un profesional según países de operación.

### IMPORTANTE

4. **OG image absoluta**  
   `og:image` usa el asset bundlado (ruta relativa/hashed). Para Facebook/LinkedIn conviene una URL absoluta HTTPS (p. ej. `https://tudominio.com/og.jpg`).

5. **Consentimiento cookies / Analytics**  
   Cuando actives GA4 / GTM / Meta Pixel, implementa banner de consentimiento según jurisdicción. Hoy **no se cargan** scripts si los IDs están vacíos (correcto).

6. **Datos en URL de WhatsApp**  
   El formulario pone nombre/negocio/teléfono en el query `text=` de `wa.me`. Es inherente a WhatsApp prefilled; no hay servidor propio. Informa al usuario (ya hay aviso) y valora acortar campos si quieres menos PII en URL.

7. **Remote Git**  
   Conecta `origin` (GitHub/GitLab/Lovable) y haz push de `main` + tag. Este entorno inició Git localmente.

8. **DNS / HTTPS / www**  
   Configura en el proveedor: HTTPS forzado, redirect www↔apex, no tocar SPF/DKIM/DMARC existentes sin inventario previo.

### RECOMENDADO

9. Comprimir `hero-bg.jpg` (~185 KB) a WebP/AVIF si LCP no es óptimo.  
10. Monitorización uptime (UptimeRobot / Cloudflare) + alertas.  
11. Preview/Staging environment separado de production.  
12. Probar coverflow en iPhone SE / Android pequeño en dispositivo real.

### OPCIONAL

13. Meta Conversions API (servidor) — solo cuando haya backend/eventos server-side.  
14. Cookie policy dedicada cuando actives trackers.

---

## Variables de entorno

```env
VITE_WHATSAPP_NUMBER=573006868841          # configurado
VITE_INSTAGRAM_URL=https://www.instagram.com/astra_ads_/
VITE_SITE_URL=https://astra.studio         # verificar dominio
VITE_META_PIXEL_ID=                        # vacío hasta ID real
VITE_GOOGLE_ANALYTICS_ID=
VITE_GOOGLE_TAG_MANAGER_ID=
```

Configúralas también en el panel del hosting.

---

## Dependencias

- `npm audit`: **0 vulnerabilities** (post-fix)
- No se hizo upgrade masivo de majors

---

## Estado por área

| Área | Estado | Notas |
|------|--------|------|
| Seguridad | Bueno / parcial | Headers listos; CSP puede necesitar ajuste post-deploy |
| Git | Listo local | Falta remote + push |
| Responsive | Mejorado | Menú móvil añadido; validar en devices reales |
| Performance | Aceptable | Build OK; hero ~185KB; analytics diferidos |
| SEO | Bueno | Title, desc, canonical, sitemap, robots, favicon |
| Accesibilidad | Mejorado | Labels, focus, reduced-motion (coverflow), aria menú |
| Analítica | Preparada | Sin IDs = sin scripts |
| WhatsApp / IG | OK | Centralizado en `src/config/site.ts` |
| Deployment | Build OK | Target Nitro Cloudflare |

---

## Checklist de lanzamiento

- [x] Build producción OK  
- [x] npm audit limpio  
- [x] WhatsApp + Instagram conectados  
- [x] Headers de seguridad en repo  
- [x] README + `.env.example`  
- [ ] Tag `v1.0.0` (pendiente: configurar identidad Git y crear commit) 
- [ ] Dominio + `VITE_SITE_URL` confirmados  
- [ ] Headers verificados en producción  
- [ ] OG image absoluta  
- [ ] Legal revisado por profesional  
- [ ] Consent analytics (si aplica)  
- [ ] Prueba real mobile WhatsApp + form  
- [ ] Push a remote + DNS/HTTPS  

---

## Post-lanzamiento (24h / 7 días)

Ver sección del brief: dominio, HTTPS, WhatsApp, formularios, consola, mobile; luego rendimiento real y conversiones.
