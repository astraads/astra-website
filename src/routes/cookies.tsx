import { createFileRoute } from "@tanstack/react-router";

import { LegalNav, LegalPage } from "@/components/legal-page";
import { SEO, SITE_URL } from "@/config/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Política de Cookies | ${SEO.title}` },
      {
        name: "description",
        content:
          "Política de cookies de ASTRA: tipos de cookies, consentimiento y cómo gestionarlas.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:url", content: `${SITE_URL}/cookies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cookies` }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies">
      <LegalNav />

      <p>
        ASTRA utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el
        funcionamiento del sitio y, cuando corresponda, medir campañas publicitarias.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos o tecnologías similares que permiten almacenar o consultar determinada información
        en el dispositivo del usuario.
      </p>

      <h2>2. Tipos de cookies</h2>
      <p>
        <strong>Necesarias</strong>
      </p>
      <p>Permiten funciones esenciales del sitio.</p>
      <p>
        <strong>Analíticas</strong>
      </p>
      <p>Ayudan a comprender cómo los visitantes utilizan el sitio.</p>
      <p>
        <strong>Publicitarias</strong>
      </p>
      <p>Pueden utilizarse para medir campañas y publicidad cuando corresponda.</p>
      <p>
        <strong>Preferencias</strong>
      </p>
      <p>Permiten recordar determinadas configuraciones.</p>

      <h2>3. Consentimiento</h2>
      <p>
        Cuando la legislación aplicable lo requiera, las cookies no esenciales permanecerán desactivadas hasta
        obtener el consentimiento correspondiente.
      </p>
      <p>
        El usuario podrá modificar o retirar su consentimiento mediante las herramientas disponibles en el sitio.
      </p>

      <h2>4. Terceros</h2>
      <p>Dependiendo de las herramientas instaladas, pueden intervenir proveedores como:</p>
      <ul>
        <li>Meta.</li>
        <li>Google.</li>
        <li>Proveedores de hosting.</li>
        <li>Herramientas analíticas.</li>
        <li>Servicios integrados.</li>
      </ul>
      <p>Cada proveedor puede contar con sus propias políticas.</p>

      <h2>5. Desactivación</h2>
      <p>El usuario también puede administrar cookies desde la configuración de su navegador.</p>
      <p>La desactivación de algunas cookies podría afectar determinadas funciones.</p>

      <h2>6. Actualizaciones</h2>
      <p>
        ASTRA podrá actualizar esta política cuando incorpore nuevas tecnologías, proveedores o cuando cambien
        los requisitos aplicables.
      </p>
    </LegalPage>
  );
}
