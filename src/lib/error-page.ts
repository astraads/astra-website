export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>ASTRA — No pudimos cargar esta página</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #0b0b0f; color: #f5f5f7; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      .brand { font-weight: 700; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
      .brand span { color: #6c63ff; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #a1a1aa; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 999px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #fff; color: #0b0b0f; }
      .secondary { background: transparent; color: #f5f5f7; border-color: rgba(255,255,255,0.16); }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="brand">ASTRA<span>™</span></div>
      <h1>No pudimos cargar esta página</h1>
      <p>Ocurrió un error inesperado. Puedes reintentar o volver al inicio.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Reintentar</button>
        <a class="secondary" href="/">Ir al inicio</a>
      </div>
    </div>
  </body>
</html>`;
}
