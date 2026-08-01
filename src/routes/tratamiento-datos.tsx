import { createFileRoute } from "@tanstack/react-router";

import { LegalNav, LegalPage } from "@/components/legal-page";
import { LEGAL, SEO, SITE_URL } from "@/config/site";

export const Route = createFileRoute("/tratamiento-datos")({
  head: () => ({
    meta: [
      { title: `Tratamiento de Datos Personales | ${SEO.title}` },
      {
        name: "description",
        content:
          "Política de tratamiento de datos personales de ASTRA conforme a la legislación aplicable.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:url", content: `${SITE_URL}/tratamiento-datos` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/tratamiento-datos` }],
  }),
  component: DataTreatmentPage,
});

function DataTreatmentPage() {
  return (
    <LegalPage title="Política de Tratamiento de Datos Personales">
      <LegalNav />

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

      <h2>2. Tratamiento</h2>
      <p>
        ASTRA podrá recolectar, almacenar, utilizar, actualizar, consultar y, cuando corresponda, transmitir o
        transferir datos personales conforme a las finalidades autorizadas y la legislación aplicable.
      </p>

      <h2>3. Finalidades</h2>
      <p>Los datos podrán utilizarse para:</p>
      <ul>
        <li>Atender solicitudes.</li>
        <li>Contactar clientes y prospectos.</li>
        <li>Elaborar propuestas.</li>
        <li>Ejecutar contratos.</li>
        <li>Gestionar pagos.</li>
        <li>Prestar soporte.</li>
        <li>Administrar proyectos.</li>
        <li>Enviar comunicaciones relacionadas con nuestros servicios.</li>
        <li>Realizar actividades comerciales cuando exista autorización o base legal.</li>
        <li>Gestionar campañas publicitarias.</li>
        <li>Cumplir obligaciones legales.</li>
      </ul>

      <h2>4. Datos tratados</h2>
      <p>Podremos tratar:</p>
      <ul>
        <li>Nombre.</li>
        <li>Teléfono.</li>
        <li>WhatsApp.</li>
        <li>Correo electrónico.</li>
        <li>Empresa.</li>
        <li>Cargo.</li>
        <li>Información comercial.</li>
        <li>Información proporcionada voluntariamente.</li>
      </ul>

      <h2>5. Autorización</h2>
      <p>
        Cuando la legislación aplicable lo requiera, ASTRA solicitará la autorización correspondiente antes de
        realizar el tratamiento.
      </p>

      <h2>6. Derechos del titular</h2>
      <p>El titular podrá:</p>
      <ul>
        <li>Conocer sus datos.</li>
        <li>Solicitar actualización.</li>
        <li>Solicitar corrección.</li>
        <li>Conocer el uso dado a sus datos.</li>
        <li>Solicitar eliminación cuando legalmente proceda.</li>
        <li>Revocar la autorización cuando corresponda.</li>
        <li>Presentar consultas y reclamos.</li>
      </ul>

      <h2>7. Consultas y reclamos</h2>
      <p>Las solicitudes podrán realizarse mediante:</p>
      <p>
        <strong>WhatsApp:</strong> {LEGAL.whatsappDisplay}
      </p>
      <p>Las solicitudes serán atendidas dentro de los plazos establecidos por la legislación aplicable.</p>

      <h2>8. Seguridad</h2>
      <p>
        ASTRA implementará medidas razonables para proteger los datos personales y restringir el acceso a
        personas o proveedores que necesiten utilizarlos.
      </p>

      <h2>9. Encargados</h2>
      <p>
        ASTRA podrá contratar proveedores tecnológicos que procesen datos por cuenta de ASTRA cuando sea
        necesario para prestar los servicios.
      </p>

      <h2>10. Vigencia</h2>
      <p>Esta política estará vigente mientras ASTRA realice tratamiento de datos personales.</p>
    </LegalPage>
  );
}
