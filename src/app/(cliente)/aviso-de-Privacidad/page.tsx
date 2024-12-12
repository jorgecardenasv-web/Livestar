import { HeaderSecondary } from "@/shared/components/layout/header-secondary";

export default async function HealthInsuranceComparison() {
  return (
    <div>
      <HeaderSecondary />
      <main className="p-12 max-w-7xl mx-auto bg-white m-6 space-y-6 prose lg:prose-lg">
        <h1 className="text-5xl font-bold text-center md:text-lef text-primary">
          Aviso de Privacidad
        </h1>
        <p className="mb-4 text-xl">
          En Livestar, sabemos lo importante que es para ti la privacidad y
          seguridad de tus datos. Queremos que te sientas tranquilo al utilizar
          nuestros servicios, y por eso hemos preparado este aviso de privacidad
          para explicarte, de manera clara y accesible, cómo protegemos tu
          información personal y qué hacemos con ella.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          1. ¿Qué información recabamos?
        </h3>
        <p className="mb-4 text-xl">
          Cuando interactúas con nosotros, ya sea a través de nuestro sitio web
          o por otros medios, es posible que nos compartas ciertos datos
          personales. Estos pueden incluir tu nombre, código postal, correo
          electrónico, teléfono y otra información relacionada, dependiendo de
          los servicios que solicites. Toda esta información se maneja con la
          mayor confidencialidad y cuidado.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          2. ¿Cómo utilizamos tu información?
        </h3>
        <p className="mb-4 text-xl">
          Los datos que nos proporcionas los usamos exclusivamente para mejorar
          tu experiencia con nosotros. Por ejemplo, podemos usarlos para
          ofrecerte una cotización personalizada, responder a tus consultas, o
          informarte sobre productos que puedan interesarte. Ten la certeza de
          que nunca compartimos tu información con terceros sin tu
          consentimiento, a menos que sea estrictamente necesario para brindarte
          el servicio que has solicitado o cumplir con las leyes aplicables.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          3. ¿Con quién compartimos tu información?
        </h3>
        <p className="mb-4 text-xl">
          Es posible que, en algunos casos, tengamos que compartir tus datos con
          terceros, como proveedores de servicios técnicos o administrativos que
          nos ayudan a operar el sitio o a procesar solicitudes. Siempre nos
          aseguramos de que estos terceros cumplan con estrictos estándares de
          seguridad para proteger tu información. ¡No te preocupes! Nunca
          vendemos tu información personal a ninguna empresa o persona.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          4. Derechos sobre tu información
        </h3>
        <p className="mb-4 text-xl">
          Recuerda que siempre tienes control sobre tus datos personales. Puedes
          solicitar el acceso, rectificación, cancelación o incluso la oposición
          al tratamiento de tus datos en cualquier momento. Si deseas ejercer
          alguno de estos derechos, solo tienes que contactarnos y con gusto
          atenderemos tu solicitud de manera rápida y eficiente.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          5. Seguridad de tus datos
        </h3>
        <p className="mb-4 text-xl">
          Para nosotros, tu seguridad es lo primero. Por eso, utilizamos medidas
          de seguridad físicas, técnicas y administrativas diseñadas para
          proteger tu información de accesos no autorizados, alteraciones,
          pérdidas o usos indebidos. Aunque hacemos todo lo posible por mantener
          tu información segura, te recomendamos que también tomes precauciones
          cuando navegas en internet para evitar posibles riesgos.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          6. Uso de cookies
        </h3>
        <p className="mb-4 text-xl">
          Nuestro sitio web utiliza cookies para ofrecerte una experiencia más
          personalizada y eficiente. Las cookies nos ayudan a entender cómo
          interactúas con nuestro sitio, permitiéndonos mejorar nuestras
          herramientas y servicios. Si no te sientes cómodo con el uso de
          cookies, puedes desactivarlas en tu navegador en cualquier momento.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          7. Cambios en el Aviso de Privacidad
        </h3>
        <p className="mb-4 text-xl">
          Nos comprometemos a mantener este aviso actualizado y alineado con
          cualquier cambio en nuestras prácticas o en las leyes que nos regulan.
          Si realizamos algún cambio importante, te lo haremos saber para que
          siempre estés informado sobre cómo cuidamos tu privacidad.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">
          8. ¿Tienes alguna duda? ¡Estamos para ayudarte!
        </h3>
        <p className="mb-4 text-xl">
          Si tienes alguna pregunta o inquietud sobre este aviso de privacidad o
          sobre cómo manejamos tu información personal, no dudes en ponerte en
          contacto con nosotros. Estamos aquí para asegurarnos de que tengas
          toda la información que necesitas y de que te sientas completamente
          seguro al confiar en nuestros servicios.
        </p>

        <h3 className="text-xl font-bold text-primary mb-2">9. Contacto</h3>
        <ul className="mb-4 text-xl">
          <li className="flex text-xl">
            <span className="font-bold">• Correo electrónico:</span>
            <span className="pl-3">contacto@livestar.mx</span>
          </li>
          <li className="flex text-xl">
            <span className="font-bold">• Teléfonos:</span>
            <span className="pl-3">33-31-10-11-22 y 33-18-10-11-18</span>
          </li>
          <li className="flex text-xl">
            <span className="font-bold">• Dirección:</span>
            <span className="pl-3">
              Plaza Concentro, Ave. Vallarta Pte. #6503, Local B5-5A. Ciudad
              Granja 45010, Zapopan, Jalisco, México.
            </span>
          </li>
        </ul>
      </main>
    </div>
  );
}
