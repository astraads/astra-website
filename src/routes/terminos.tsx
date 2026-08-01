import { createFileRoute } from "@tanstack/react-router";

import { LegalNav, LegalPage } from "@/components/legal-page";
import { LEGAL, SEO, SITE_URL } from "@/config/site";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: `Términos y Condiciones | ${SEO.title}` },
      {
        name: "description",
        content:
          "Términos y condiciones de uso del sitio web y servicios de ASTRA: web, Meta Ads, SaaS y estrategia digital.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:url", content: `${SITE_URL}/terminos` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terminos` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Términos y Condiciones">
      <LegalNav />

      <p>Bienvenido a ASTRA.</p>
      <p>
        Estos Términos y Condiciones regulan el acceso y uso de nuestro sitio web y las condiciones generales
        aplicables a los servicios ofrecidos por ASTRA.
      </p>
      <p>
        Al utilizar nuestro sitio, solicitar información, contactar a ASTRA o contratar alguno de nuestros
        servicios, aceptas estos términos.
      </p>

      <h2>1. Identificación</h2>
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
      <p>
        ASTRA ofrece servicios de diseño y desarrollo web, Landing Pages, publicidad digital, Meta Ads,
        estrategia digital y desarrollo de aplicaciones y soluciones SaaS.
      </p>

      <h2>2. Servicios</h2>
      <p>Según la propuesta comercial contratada, ASTRA puede prestar:</p>
      <ul>
        <li>Diseño y desarrollo de sitios web.</li>
        <li>Landing Pages.</li>
        <li>Diseño UX/UI.</li>
        <li>Estrategia digital.</li>
        <li>Administración y configuración de campañas en Meta Ads.</li>
        <li>Desarrollo de aplicaciones SaaS.</li>
        <li>Integraciones tecnológicas.</li>
        <li>Soporte y mantenimiento.</li>
        <li>Consultoría digital.</li>
      </ul>
      <p>
        El alcance específico será el establecido en la propuesta comercial, cotización, contrato u orden de
        servicio correspondiente.
      </p>
      <p>
        Cualquier funcionalidad, modificación, integración o servicio que no se encuentre expresamente incluido
        podrá ser cotizado por separado.
      </p>

      <h2>3. Propuestas y contratación</h2>
      <p>Las propuestas comerciales tendrán la vigencia indicada en cada documento.</p>
      <p>
        La contratación se entenderá aceptada cuando el cliente confirme su aprobación y, cuando corresponda,
        realice el pago inicial acordado.
      </p>
      <p>
        La aceptación de una propuesta implica la aceptación de su alcance, condiciones económicas, tiempos y
        responsabilidades.
      </p>

      <h2>4. Pagos</h2>
      <p>El cliente deberá realizar los pagos en las fechas y condiciones acordadas.</p>
      <p>
        Cuando existan pagos vencidos, ASTRA podrá suspender temporalmente los servicios que dependan de dichos
        pagos, previa comunicación al cliente cuando corresponda.
      </p>
      <p>
        Los retrasos ocasionados por falta de información, accesos, materiales, aprobaciones o decisiones del
        cliente podrán modificar los tiempos inicialmente estimados.
      </p>

      <h2>5. Meta Ads y publicidad digital</h2>
      <p>ASTRA podrá crear, configurar, administrar y optimizar campañas publicitarias en Meta.</p>
      <p>
        ASTRA no garantiza un número específico de ventas, clientes, leads, conversiones, ingresos o retorno de
        inversión, salvo que exista un acuerdo escrito que establezca expresamente lo contrario.
      </p>
      <p>
        El rendimiento de una campaña puede depender de factores que ASTRA no controla, incluyendo presupuesto,
        mercado, competencia, oferta, precio, producto, página de destino, creatividad, comportamiento del
        consumidor, algoritmos y políticas de Meta.
      </p>
      <p>
        El presupuesto destinado a publicidad en plataformas externas es independiente de los honorarios de
        ASTRA, salvo que la propuesta establezca expresamente lo contrario.
      </p>

      <h2>6. Plataformas de terceros</h2>
      <p>
        Los servicios pueden depender de plataformas como Meta, WhatsApp, Google, servicios de hosting,
        dominios, APIs, herramientas de analítica y otros proveedores.
      </p>
      <p>
        ASTRA no controla cambios de políticas, bloqueos, suspensiones, interrupciones, limitaciones o
        modificaciones realizadas por terceros.
      </p>

      <h2>7. Desarrollo web y SaaS</h2>
      <p>
        Las funcionalidades incluidas serán exclusivamente aquellas especificadas en la propuesta
        correspondiente.
      </p>
      <p>
        Nuevas funcionalidades o modificaciones que excedan el alcance contratado podrán generar costos
        adicionales.
      </p>
      <p>
        En proyectos SaaS, las condiciones de propiedad intelectual, licencia, hosting, mantenimiento, soporte,
        actualizaciones y demás aspectos técnicos deberán quedar definidos en la propuesta o contrato
        correspondiente.
      </p>

      <h2>8. Responsabilidades del cliente</h2>
      <p>
        El cliente se compromete a proporcionar información, materiales, accesos y aprobaciones necesarios.
      </p>
      <p>
        El cliente declara contar con los derechos necesarios sobre los textos, fotografías, videos, marcas,
        logos, bases de datos y demás materiales que proporcione a ASTRA.
      </p>
      <p>
        El cliente será responsable de la legalidad de los productos, servicios, afirmaciones comerciales y
        contenidos que solicite publicar.
      </p>

      <h2>9. Propiedad intelectual</h2>
      <p>
        Salvo pacto escrito diferente, ASTRA conserva los derechos sobre sus metodologías, procesos,
        conocimientos, componentes reutilizables, código preexistente, herramientas y recursos desarrollados
        previamente.
      </p>
      <p>
        La propiedad o licencia de los entregables específicos se determinará en la propuesta o contrato
        correspondiente.
      </p>

      <h2>10. Portafolio</h2>
      <p>
        Salvo acuerdo de confidencialidad o solicitud expresa del cliente, ASTRA podrá mostrar proyectos
        realizados como parte de su portafolio profesional.
      </p>

      <h2>11. Tiempos</h2>
      <p>Los tiempos proporcionados son estimados.</p>
      <p>
        El cronograma podrá verse afectado por retrasos en entrega de información, accesos, aprobaciones, pagos
        o materiales necesarios por parte del cliente.
      </p>

      <h2>12. Soporte y mantenimiento</h2>
      <p>El soporte y mantenimiento estarán incluidos únicamente cuando hayan sido contratados expresamente.</p>
      <p>
        El mantenimiento podrá comprender actualizaciones, correcciones, modificaciones de contenido, prevención
        y soporte técnico según el plan contratado.
      </p>
      <p>Las nuevas funcionalidades o desarrollos no incluidos podrán cotizarse adicionalmente.</p>

      <h2>13. Limitación de responsabilidad</h2>
      <p>ASTRA prestará sus servicios con diligencia profesional razonable.</p>
      <p>
        En la medida permitida por la legislación aplicable, ASTRA no será responsable por daños indirectos,
        pérdida de beneficios, oportunidades comerciales o interrupciones ocasionadas por terceros o
        circunstancias fuera de su control.
      </p>
      <p>Esta cláusula no pretende excluir responsabilidades que legalmente no puedan excluirse.</p>

      <h2>14. Terminación</h2>
      <p>
        La relación comercial podrá terminar conforme a las condiciones establecidas en el contrato o propuesta
        correspondiente.
      </p>
      <p>
        Los servicios ejecutados, compromisos adquiridos y costos no reembolsables se liquidarán según lo
        acordado.
      </p>

      <h2>15. Modificaciones</h2>
      <p>ASTRA podrá actualizar estos términos cuando sea necesario.</p>
      <p>La versión vigente será la publicada en este sitio web.</p>

      <h2>16. Ley aplicable</h2>
      <p>
        La legislación y jurisdicción aplicables serán las establecidas en el contrato comercial correspondiente.
      </p>
      <p>
        Cuando no exista disposición contractual específica, se aplicará la legislación que resulte legalmente
        procedente.
      </p>

      <h2>17. Contacto</h2>
      <p>
        <strong>WhatsApp:</strong> {LEGAL.whatsappDisplay}
      </p>
    </LegalPage>
  );
}
