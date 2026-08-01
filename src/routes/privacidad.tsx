import { createFileRoute } from "@tanstack/react-router";

import { LegalNav, LegalPage } from "@/components/legal-page";
import { LEGAL, SEO, SITE_URL } from "@/config/site";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: `Política de Privacidad | ${SEO.title}` },
      {
        name: "description",
        content:
          "Política de privacidad de ASTRA: cómo recopilamos, usamos y protegemos la información de quienes nos contactan.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:url", content: `${SITE_URL}/privacidad` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidad` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad">
      <LegalNav />

      <p>
        En ASTRA respetamos la privacidad de las personas que visitan nuestro sitio web, solicitan información y
        utilizan nuestros servicios.
      </p>

      <h2>1. Responsable</h2>
      <ul>
        <li>
          <strong>Marca:</strong> {LEGAL.brand}
        </li>
        <li>
          <strong>País:</strong> {LEGAL.country}
        </li>
        <li>
          <strong>RUT / NIT:</strong> {LEGAL.nit}
        </li>
        <li>
          <strong>WhatsApp:</strong> {LEGAL.whatsappDisplay}
        </li>
      </ul>

      <h2>2. Información que podemos recopilar</h2>
      <p>Dependiendo de la interacción con ASTRA podemos recopilar:</p>
      <ul>
        <li>Nombre.</li>
        <li>Empresa o negocio.</li>
        <li>Número telefónico.</li>
        <li>WhatsApp.</li>
        <li>Correo electrónico.</li>
        <li>Información proporcionada mediante formularios.</li>
        <li>Información relacionada con el proyecto.</li>
        <li>Información técnica básica del dispositivo.</li>
        <li>Información de navegación.</li>
      </ul>
      <p>
        No solicitamos deliberadamente datos sensibles salvo que exista una necesidad legítima y una base legal
        adecuada.
      </p>

      <h2>3. Finalidades</h2>
      <p>Podemos utilizar la información para:</p>
      <ul>
        <li>Responder solicitudes.</li>
        <li>Contactar potenciales clientes.</li>
        <li>Elaborar propuestas.</li>
        <li>Prestar servicios.</li>
        <li>Gestionar proyectos.</li>
        <li>Proporcionar soporte.</li>
        <li>Mejorar nuestros servicios.</li>
        <li>Analizar el funcionamiento del sitio.</li>
        <li>Prevenir fraude y abuso.</li>
        <li>Cumplir obligaciones legales.</li>
      </ul>

      <h2>4. Comunicaciones comerciales</h2>
      <p>
        Cuando exista una autorización o base legal válida, ASTRA podrá enviar información comercial relacionada
        con nuestros servicios.
      </p>
      <p>El usuario podrá solicitar dejar de recibir estas comunicaciones.</p>

      <h2>5. Proveedores externos</h2>
      <p>ASTRA puede utilizar proveedores tecnológicos para:</p>
      <ul>
        <li>Hosting.</li>
        <li>Formularios.</li>
        <li>Email.</li>
        <li>WhatsApp.</li>
        <li>Meta.</li>
        <li>Google.</li>
        <li>CRM.</li>
        <li>Analítica.</li>
        <li>Almacenamiento.</li>
        <li>Servicios tecnológicos.</li>
      </ul>
      <p>Estos proveedores podrán tratar información según su función y condiciones aplicables.</p>

      <h2>6. Transferencias internacionales</h2>
      <p>Algunos proveedores pueden almacenar o procesar información fuera de Colombia.</p>
      <p>
        Cuando corresponda, ASTRA aplicará las medidas requeridas por la legislación aplicable para dichas
        transferencias.
      </p>

      <h2>7. Conservación</h2>
      <p>
        Conservaremos los datos durante el tiempo necesario para cumplir la finalidad para la cual fueron
        recopilados, obligaciones legales y posibles controversias.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        ASTRA implementará medidas técnicas y organizativas razonables destinadas a proteger la información
        contra acceso no autorizado, pérdida, alteración o divulgación.
      </p>
      <p>Ningún sistema conectado a Internet puede garantizar seguridad absoluta.</p>

      <h2>9. Derechos</h2>
      <p>Dependiendo de la legislación aplicable, el usuario podrá solicitar:</p>
      <ul>
        <li>Acceso.</li>
        <li>Corrección.</li>
        <li>Actualización.</li>
        <li>Eliminación.</li>
        <li>Oposición.</li>
        <li>Restricción.</li>
        <li>Portabilidad.</li>
        <li>Retiro del consentimiento.</li>
      </ul>
      <p>Las solicitudes podrán realizarse mediante:</p>
      <p>
        <strong>WhatsApp:</strong> {LEGAL.whatsappDisplay}
      </p>

      <h2>10. Cambios</h2>
      <p>ASTRA podrá actualizar esta política cuando resulte necesario.</p>
    </LegalPage>
  );
}
