/**
 * HTML Templates for Quote Summary - Optimized Version with Coberturas Fix
 * Unified spacing system that works consistently across both templates
 */

export const GNP_TEMPLATE_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Cotización de seguro de gastos médicos - Plan Intermedio GNP"
    />
    <title>Cotización Seguro Médico - Plan Intermedio GNP</title>
    <style>
      /* Variables CSS globales */
      :root {
        --primary-blue: #1e3c72;
        --secondary-blue: #376fa0;
        --accent-cyan: #00bcd4;
        --light-blue: #2196f3;
        --background-gray: #f9f8f9;
        --border-gray: #dfe1e4;
        --text-gray: #666;
        --text-dark: #376fa0;
        --white: #ffffff;
        --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --border-radius: 13px;
        --border-radius-small: 8px;
      }

      @page {
        size: letter;
        margin: 0;
      }

      /* Reset y estilos base */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: var(--text-dark);
        background-color: #053a66;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        /* AGREGADO: Mejorar el manejo de páginas */
        page-break-before: auto;
        page-break-after: auto;
      }

      /* Contenedor principal y utilidades */
      .wrapper {
        background-color: var(--background-gray);
        border-radius: var(--border-radius);
        width: 100%;
        position: relative;
      }

      .quote-container {
        padding: 10px;
        overflow: hidden;
        background-color: var(--background-gray);
      }

      .border-top {
        border-top: 3px solid var(--primary-blue);
      }

      /* Contenido principal y secciones - Sin espaciados hardcodeados */
      .main-content {
        background: var(--background-gray);
        display: flex;
        flex-direction: column;
        align-items: center;
        /* AGREGADO: Espaciado mejorado para evitar solapamiento con header */
        padding-top: 20px;
        padding-bottom: 80px !important; /* Espacio extra al final */
        min-height: calc(100vh - 200px) !important;
        /* Los espaciados se aplicarán vía JavaScript */
      }

      .content-section {
        border-radius: var(--border-radius);
        width: 100%;
        max-width: 900px;
        display: block !important;
        position: relative !important;
        overflow: visible !important;
        /* Los márgenes y padding se aplicarán vía JavaScript */
      }

      /* Estilos específicos para la sección de coberturas principales */
      .content-section:last-child {
        /* Forzar visibilidad de la última sección */
        position: relative !important;
        z-index: 10 !important;
        background-color: var(--white) !important;
        border: 1px solid var(--border-gray) !important;
        border-radius: var(--border-radius) !important;
        box-shadow: var(--shadow) !important;
        
        /* Espaciado garantizado */
        margin-bottom: 50px !important;
        min-height: 120px !important;
        
        /* Evitar que se corte */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-before: auto !important;
        break-before: auto !important;
        
        /* Asegurar que no se oculte */
        overflow: visible !important;
        display: block !important;
      }

      /* Asegurar espaciado apropiado entre secciones */
      .content-section + .content-section {
        margin-top: 25px !important;
      }

      .plan-info {
        padding: 20px 30px;
        width: 100%;
        max-width: 900px;
        /* Los márgenes se aplicarán vía JavaScript */
        page-break-after: avoid;
        break-after: avoid;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .plan-details {
        color: var(--secondary-blue);
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .plan-details span {
        flex: 1;
        font-size: 30px;
      }

      .section-title {
        background: var(--primary-blue);
        color: var(--white);
        padding: 12px 20px;
        border-radius: 13px 13px 0 0;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
      }

      /* Mejorar el título de la sección de coberturas */
      .content-section:last-child .section-title {
        background: var(--primary-blue) !important;
        color: var(--white) !important;
        padding: 12px 20px !important;
        border-radius: 13px 13px 0 0 !important;
        font-size: 18px !important;
        font-weight: bold !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 0 !important;
        z-index: 20 !important;
        position: relative !important;
      }

      .section-icon {
        width: 20px;
        height: 20px;
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-blue);
        font-size: 12px;
        font-weight: bold;
      }

      /* Layouts responsivos */
      .layout-60-40 {
        display: flex;
        background-color: white;
        min-height: 200px;
        align-items: stretch;
        /* AGREGADO: Evitar saltos en layouts */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .layout-60-40 > *:first-child {
        flex: 0 0 40%;
      }

      .layout-60-40 > *:last-child {
        flex: 0 0 60%;
      }

      .layout-costs {
        display: flex;
        background-color: white;
        width: 100%;
        gap: 20px;
        min-height: 250px;
        align-items: stretch;
        /* AGREGADO: Evitar saltos en layouts */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .layout-costs > *:first-child {
        flex: 1;
        min-width: 0;
      }

      .layout-costs > *:last-child {
        width: 200px;
        flex-shrink: 0;
      }

      /* Detalles del contratante */
      .contractor-details {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        justify-content: center;
        background-color: var(--white);
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
      }

      .detail-item img {
        width: 45px;
        height: auto;
      }

      .detail-label {
        font-weight: bold;
        color: var(--secondary-blue);
      }

      /* Estilos de tablas */
      .data-table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--white);
        border: 1px solid var(--border-gray);
        table-layout: fixed;
        /* AGREGADO: Control de salto de página */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .protected-persons-table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--white);
        border: 1px solid var(--border-gray);
      }

      .data-table th,
      .data-table td {
        /* El padding se aplicará vía JavaScript */
        border-right: 1px solid var(--border-gray);
      }

      .data-table th:last-child,
      .data-table td:last-child {
        border-right: none;
      }

      .data-table th:first-child,
      .data-table td:first-child {
        width: 45%;
      }

      .data-table th:not(:first-child),
      .data-table td:not(:first-child) {
        width: 27.5%;
        text-align: center;
      }

      .data-table th {
        background: var(--white);
        color: var(--text-dark);
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid var(--border-gray);
        white-space: normal;
        word-wrap: break-word;
      }

      .data-table th.data-table-th {
        text-align: center;
      }

      .data-table td {
        color: var(--text-dark);
        border-bottom: 1px solid var(--border-gray);
      }

      .protected-persons-table td {
        padding: 10px;
        color: var(--text-dark);
        border-bottom: 1px solid var(--border-gray);
      }

      .protected-persons-table td:first-child {
        width: 80%;
        border-right: 1px solid var(--border-gray);
      }

      .protected-persons-table td:last-child {
        width: 20%;
        text-align: center;
      }

      .table-name {
        color: var(--secondary-blue);
        font-weight: 500;
      }

      .table-price {
        font-weight: bold;
        color: var(--secondary-blue);
        text-align: center;
      }

      /* Resumen de costos */
      .cost-summary {
        padding: 10px;
        border-radius: var(--border-radius-small);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--white);
      }

      .summary-box {
        text-align: center;
        padding: 12px;
        margin-bottom: 8px;
      }

      .summary-label {
        color: var(--secondary-blue);
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .summary-amount {
        font-size: 24px;
        font-weight: bold;
        color: var(--text-dark);
        text-decoration: underline;
      }

      /* Estilos de coberturas - CORREGIDOS */
      .coverage-item {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 20px !important;
        border-bottom: 1px solid var(--border-gray) !important;
        background-color: var(--white) !important;
        min-height: 60px !important;
        
        /* Evitar saltos problemáticos */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        
        /* Asegurar visibilidad */
        position: relative !important;
        z-index: 15 !important;
        overflow: visible !important;
        /* El padding se aplicará vía JavaScript */
      }

      .coverage-item:last-child {
        border-bottom: none !important;
        border-radius: 0 0 13px 13px !important;
        margin-bottom: 0 !important;
      }

      .coverage-item:first-child {
        border-top: none !important;
      }

      .coverage-name {
        color: var(--secondary-blue) !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        flex: 1 !important;
        text-align: left !important;
      }

      .coverage-amount {
        color: var(--secondary-blue) !important;
        font-weight: bold !important;
        font-size: 18px !important;
        text-align: right !important;
        white-space: nowrap !important;
      }

      /* Mejorar el div con border-top dentro de coberturas */
      .content-section:last-child .border-top {
        border-top: 3px solid var(--primary-blue) !important;
        background-color: var(--white) !important;
        border-radius: 0 0 13px 13px !important;
        overflow: visible !important;
        min-height: 80px !important;
        display: block !important;
      }

      /* Tabla de deducibles */
      .deductible-table th {
        text-align: center;
        font-size: 16px;
      }

      .deductible-table td {
        text-align: center;
        font-weight: 500;
      }

      .level-column {
        font-weight: bold;
        color: var(--secondary-blue);
      }

      .price-cell {
        color: var(--secondary-blue);
        font-weight: bold;
      }

      /* Prevención de saltos de página inadecuados */
      .page-group {
        page-break-inside: avoid;
        break-inside: avoid;
        /* Evitar huérfanos y viudas */
        orphans: 3;
        widows: 3;
      }

      /* Prevención adicional de problemas de impresión */
      @media print {
        body {
          background: var(--white);
          padding: 0;
          /* AGREGADO: Asegurar que el body tenga altura suficiente */
          min-height: 11in !important; /* Altura completa de página carta */
          padding-bottom: 1in !important;
        }

        .quote-container {
          box-shadow: none;
          max-width: none;
        }
        
        .content-section:last-child {
          /* Forzar que aparezca en impresión */
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          
          /* Asegurar espacio */
          margin-bottom: 50px !important;
          padding-bottom: 30px !important;
        }
        
        .coverage-item {
          /* Asegurar visibilidad en impresión */
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <main class="quote-container">
        <div class="quote-content">
          <section class="plan-info">
            <div class="plan-details">
              <span>{{plan}} • {{company}}</span>
              <img src="{{emmaLogoPath}}" alt="EMMA Logo" />
            </div>
          </section>

          <div class="main-content">
            <!-- Información de personas a proteger -->
            <section class="content-section page-group">
              <h2 class="section-title">
                PERSONAS A PROTEGER
              </h2>
              <div class="border-top layout-60-40">
                <div class="contractor-details">
                  <div class="detail-item">
                    <img src="{{userIconPath}}" alt="Icono de usuario" />
                    <div>
                      <div class="detail-label">Contratante</div>
                      <div>{{contractorName}}</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <img src="{{cpIconPath}}" alt="icono codigo postal" />
                    <div>
                      <div class="detail-label">Código Postal</div>
                      <div>{{postalCode}}</div>
                    </div>
                  </div>
                </div>
                <table class="protected-persons-table">
                  <tbody>
                    {{#each members}}
                    <tr>
                      <td>{{type}}</td>
                      <td>{{age}}</td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Resumen de costos -->
            <section class="content-section page-group">
              <h2 class="section-title">
                <img src="{{moneyIconPath}}" alt="Icono Dinero" />
                RESUMEN DE COSTOS
              </h2>
              <div class="border-top layout-costs">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Asegurado</th>
                      <th scope="col" class="data-table-th">
                        Prima anual individual
                      </th>
                      <th scope="col" class="data-table-th">
                        Prima mensual individual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {{#each members}}
                    <tr>
                      <td class="table-name">
                        {{#if name}}{{name}}{{else}}{{type}}{{/if}}
                      </td>
                      <td class="table-price">
                        {{formatCurrency (multiply price 12)}}
                      </td>
                      <td class="table-price">{{formatCurrency price}}</td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
                <div class="cost-summary">
                  <div class="summary-box annual-total">
                    <div class="summary-label">Prima Total Anual</div>
                    <div class="summary-amount">
                      {{formatCurrency (multiply coverageFee 12)}}
                    </div>
                  </div>
                  <div class="summary-box monthly-total">
                    <div class="summary-label">Prima Total Mensual</div>
                    <div class="summary-amount">
                      {{formatCurrency coverageFee}}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Coberturas principales -->
            <section class="content-section page-group">
              <h2 class="section-title">
                <img src="{{checkIconPath}}" alt="Icono Check" />
                COBERTURAS PRINCIPALES
              </h2>
              <div class="coverage-item border-top">
                <span class="coverage-name">Suma Asegurada</span>
                <span class="coverage-amount">{{formatCurrency sumInsured}}</span>
              </div>
            </section>

            <!-- Deducibles y coaseguros -->
            <section class="content-section page-group">
              <h2 class="section-title">
                <img src="{{medicalIconPath}}" alt="Icono Medico" />
                DEDUCIBLES Y COASEGUROS
              </h2>
              <table class="data-table deductible-table border-top">
                <thead>
                  <tr>
                    <th>Nivel Hospitalario</th>
                    <th>< de 45 años</th>
                    <th>> de 45 años</th>
                    <th>Coaseguro</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each processedDeductibles}}
                  <tr>
                    <td class="table-name">{{nivel}}</td>
                    <td class="table-price">{{formatCurrency menoresDe45}}</td>
                    <td class="table-price">{{formatCurrency mayoresDe45}}</td>
                    <td class="table-price">{{coInsurance}}%</td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>`;

export const HDI_TEMPLATE_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Cotización de seguro de gastos médicos - HDI Seguros"
    />
    <title>Cotización Seguro Médico - HDI Seguros</title>
    <style>
      /* Variables CSS globales */
      :root {
        --primary-blue: #1e3c72;
        --secondary-blue: #376fa0;
        --accent-cyan: #00bcd4;
        --light-blue: #2196f3;
        --background-gray: #f9f8f9;
        --border-gray: #dfe1e4;
        --text-gray: #666;
        --text-dark: #376fa0;
        --white: #ffffff;
        --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --border-radius: 13px;
        --border-radius-small: 8px;
      }

      @page {
        size: letter;
        margin: 0;
      }

      /* Reset y estilos base */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: var(--text-dark);
        background-color: #053a66;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        /* AGREGADO: Mejorar el manejo de páginas */
        page-break-before: auto;
        page-break-after: auto;
      }

      /* Contenedor principal y utilidades */
      .wrapper {
        background-color: var(--background-gray);
        border-radius: var(--border-radius);
        width: 100%;
        position: relative;
      }

      .quote-container {
        padding: 10px;
        overflow: hidden;
        background-color: var(--background-gray);
      }

      .quote-content {
        display: flex;
        flex-direction: column;
      }

      .border-top {
        border-top: 3px solid var(--primary-blue);
      }

      /* Contenido principal y secciones - Sin espaciados hardcodeados */
      .main-content {
        background: var(--background-gray);
        display: flex;
        flex-direction: column;
        align-items: center;
        /* AGREGADO: Espaciado mejorado para evitar solapamiento con header */
        padding-top: 20px;
        padding-bottom: 80px !important; /* Espacio extra al final */
        min-height: calc(100vh - 200px) !important;
        /* Los espaciados se aplicarán vía JavaScript */
      }

      .content-section {
        border-radius: var(--border-radius);
        width: 100%;
        max-width: 900px;
        display: block !important;
        position: relative !important;
        overflow: visible !important;
        /* Los márgenes y padding se aplicarán vía JavaScript */
      }

      /* Estilos específicos para la sección de coberturas principales */
      .content-section:last-child {
        /* Forzar visibilidad de la última sección */
        position: relative !important;
        z-index: 10 !important;
        background-color: var(--white) !important;
        border: 1px solid var(--border-gray) !important;
        border-radius: var(--border-radius) !important;
        box-shadow: var(--shadow) !important;
        
        /* Espaciado garantizado */
        margin-bottom: 50px !important;
        min-height: 120px !important;
        
        /* Evitar que se corte */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-before: auto !important;
        break-before: auto !important;
        
        /* Asegurar que no se oculte */
        overflow: visible !important;
        display: block !important;
      }

      /* Asegurar espaciado apropiado entre secciones */
      .content-section + .content-section {
        margin-top: 25px !important;
      }

      .plan-info {
        padding: 20px 30px;
        width: 100%;
        max-width: 900px;
        /* Los márgenes se aplicarán vía JavaScript */
        page-break-after: avoid;
        break-after: avoid;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .plan-details {
        color: var(--secondary-blue);
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .plan-details span {
        flex: 1;
        font-size: 30px;
      }

      .section-title {
        background: var(--primary-blue);
        color: var(--white);
        padding: 12px 20px;
        border-radius: 13px 13px 0 0;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
      }

      /* Mejorar el título de la sección de coberturas */
      .content-section:last-child .section-title {
        background: var(--primary-blue) !important;
        color: var(--white) !important;
        padding: 12px 20px !important;
        border-radius: 13px 13px 0 0 !important;
        font-size: 18px !important;
        font-weight: bold !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 0 !important;
        z-index: 20 !important;
        position: relative !important;
      }

      .section-icon {
        width: 20px;
        height: 20px;
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-blue);
        font-size: 12px;
        font-weight: bold;
      }

      /* Layouts responsivos */
      .layout-60-40 {
        display: flex;
        background-color: white;
        min-height: 200px;
        align-items: stretch;
        /* AGREGADO: Evitar saltos en layouts */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .layout-60-40 > *:first-child {
        flex: 0 0 40%;
      }

      .layout-60-40 > *:last-child {
        flex: 0 0 60%;
      }

      .layout-costs {
        display: flex;
        background-color: white;
        width: 100%;
        gap: 20px;
        min-height: 300px;
        align-items: stretch;
        /* AGREGADO: Evitar saltos en layouts */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .layout-costs > *:first-child {
        flex: 1;
        min-width: 0;
      }

      .layout-costs > *:last-child {
        width: 200px;
        flex-shrink: 0;
      }

      /* Detalles del contratante */
      .contractor-details {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        justify-content: center;
        background-color: var(--white);
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
      }

      .detail-item img {
        width: 45px;
        height: auto;
      }

      .detail-label {
        font-weight: bold;
        color: var(--secondary-blue);
      }

      /* Estilos de tablas - HDI tiene 4 columnas */
      .data-table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--white);
        border: 1px solid var(--border-gray);
        table-layout: fixed;
        /* AGREGADO: Control de salto de página */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .protected-persons-table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--white);
        border: 1px solid var(--border-gray);
      }

      .data-table th,
      .data-table td {
        /* El padding se aplicará vía JavaScript */
        border-right: 1px solid var(--border-gray);
      }

      .data-table th:last-child,
      .data-table td:last-child {
        border-right: none;
      }

      /* Para HDI - 4 columnas */
      .data-table th:first-child,
      .data-table td:first-child {
        width: 35%;
      }

      .data-table th:not(:first-child),
      .data-table td:not(:first-child) {
        width: 21.67%;
        text-align: center;
      }

      .data-table th {
        background: var(--white);
        color: var(--text-dark);
        text-align: left;
        font-size: 14px; /* Más pequeño para HDI */
        font-weight: bold;
        border-bottom: 1px solid var(--border-gray);
        white-space: normal;
        word-wrap: break-word;
      }

      .data-table th.data-table-th {
        text-align: center;
        font-size: 12px; /* Aún más pequeño para los headers largos */
      }

      .data-table td {
        color: var(--text-dark);
        border-bottom: 1px solid var(--border-gray);
      }

      .protected-persons-table td {
        padding: 10px;
        color: var(--text-dark);
        border-bottom: 1px solid var(--border-gray);
      }

      .protected-persons-table td:first-child {
        width: 80%;
        border-right: 1px solid var(--border-gray);
      }

      .protected-persons-table td:last-child {
        width: 20%;
        text-align: center;
      }

      .table-name {
        color: var(--secondary-blue);
        font-weight: 500;
      }

      .table-price {
        font-weight: bold;
        color: var(--secondary-blue);
        text-align: center;
      }

      /* Resumen de costos - HDI tiene 3 totales */
      .cost-summary {
        padding: 8px;
        border-radius: var(--border-radius-small);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--white);
      }

      .summary-box {
        text-align: center;
        padding: 8px;
        margin-bottom: 6px;
      }

      .summary-label {
        color: var(--secondary-blue);
        font-weight: 600;
        font-size: 12px;
        margin-bottom: 4px;
      }

      .summary-amount {
        font-size: 18px; /* Más pequeño para HDI */
        font-weight: bold;
        color: var(--text-dark);
        text-decoration: underline;
      }

      /* Estilos de coberturas - CORREGIDOS */
      .coverage-item {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 20px !important;
        border-bottom: 1px solid var(--border-gray) !important;
        background-color: var(--white) !important;
        min-height: 60px !important;
        
        /* Evitar saltos problemáticos */
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        
        /* Asegurar visibilidad */
        position: relative !important;
        z-index: 15 !important;
        overflow: visible !important;
        /* El padding se aplicará vía JavaScript */
      }

      .coverage-item:last-child {
        border-bottom: none !important;
        border-radius: 0 0 13px 13px !important;
        margin-bottom: 0 !important;
      }

      .coverage-item:first-child {
        border-top: none !important;
      }

      .coverage-name {
        color: var(--secondary-blue) !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        flex: 1 !important;
        text-align: left !important;
        white-space: nowrap;
      }

      .coverage-amount {
        color: var(--secondary-blue) !important;
        font-weight: bold !important;
        font-size: 18px !important;
        text-align: right !important;
        white-space: nowrap !important;
      }

      /* Mejorar el div con border-top dentro de coberturas */
      .content-section:last-child .border-top {
        border-top: 3px solid var(--primary-blue) !important;
        background-color: var(--white) !important;
        border-radius: 0 0 13px 13px !important;
        overflow: visible !important;
        min-height: 80px !important;
        display: block !important;
      }

      /* Prevención de saltos de página inadecuados */
      .page-group {
        page-break-inside: avoid;
        break-inside: avoid;
        /* Evitar huérfanos y viudas */
        orphans: 3;
        widows: 3;
      }

      /* Prevención adicional de problemas de impresión */
      @media print {
        body {
          background: var(--white);
          padding: 0;
          /* AGREGADO: Asegurar que el body tenga altura suficiente */
          min-height: 11in !important; /* Altura completa de página carta */
          padding-bottom: 1in !important;
        }

        .quote-container {
          box-shadow: none;
          max-width: none;
        }
        
        .content-section:last-child {
          /* Forzar que aparezca en impresión */
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          
          /* Asegurar espacio */
          margin-bottom: 50px !important;
          padding-bottom: 30px !important;
        }
        
        .coverage-item {
          /* Asegurar visibilidad en impresión */
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <main class="quote-container">
        <div class="quote-content">
          <section class="plan-info">
            <div class="plan-details">
              <span>{{plan}} • {{company}}</span>
              <img src="{{emmaLogoPath}}" alt="EMMA Logo" />
            </div>
          </section>

          <div class="main-content">
            <!-- Información de personas a proteger -->
            <section class="content-section page-group">
              <h2 class="section-title">
                PERSONAS A PROTEGER
              </h2>
              <div class="border-top layout-60-40">
                <div class="contractor-details">
                  <div class="detail-item">
                    <img src="{{userIconPath}}" alt="Icono de usuario" />
                    <div>
                      <div class="detail-label">Contratante</div>
                      <div>{{contractorName}}</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <img src="{{cpIconPath}}" alt="icono codigo postal" />
                    <div>
                      <div class="detail-label">Código Postal</div>
                      <div>{{postalCode}}</div>
                    </div>
                  </div>
                </div>
                <table class="protected-persons-table">
                  <tbody>
                    {{#each members}}
                    <tr>
                      <td>{{type}}</td>
                      <td>{{age}}</td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Resumen de costos HDI con 4 columnas -->
            <section class="content-section page-group">
              <h2 class="section-title">
                <img src="{{moneyIconPath}}" alt="Icono Dinero" />
                RESUMEN DE COSTOS
              </h2>
              <div class="border-top layout-costs">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Asegurado</th>
                      <th scope="col" class="data-table-th">Anual</th>
                      <th scope="col" class="data-table-th">
                        Pago inicial (Primer Mes)
                      </th>
                      <th scope="col" class="data-table-th">
                        Pago mensual (Mes 2 al 12)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {{#each members}}
                    <tr>
                      <td class="table-name">
                        {{#if name}}{{name}}{{else}}{{type}}{{/if}}
                      </td>
                      <td class="table-price">
                        {{formatCurrency anual}}
                      </td>
                      <td class="table-price">
                        {{formatCurrency primerMes}}
                      </td>
                      <td class="table-price">
                        {{formatCurrency segundoMesADoce}}
                      </td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
                <div class="cost-summary">
                  <div class="summary-box annual-total">
                    <div class="summary-label">Total Anual</div>
                    <div class="summary-amount">
                      {{formatCurrency totalAnual}}
                    </div>
                  </div>
                  <div class="summary-box monthly-total">
                    <div class="summary-label">Primer Mes</div>
                    <div class="summary-amount">
                      {{formatCurrency totalPrimerMes}}
                    </div>
                  </div>
                  <div class="summary-box monthly-total">
                    <div class="summary-label">Mes 2 al 12</div>
                    <div class="summary-amount">
                      {{formatCurrency totalSegundoMesADoce}}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Coberturas principales -->
            <section class="content-section page-group">
              <h2 class="section-title">
                <img src="{{checkIconPath}}" alt="Icono Check" />
                COBERTURAS PRINCIPALES
              </h2>
              <div class="coverage-item border-top">
                <span class="coverage-name">Suma Asegurada</span>
                <span class="coverage-amount">{{formatCurrency sumInsured}}</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>`;

// Type definitions for template variables
export interface GNPTemplateVariables {
  plan: string;
  company: string;
  emmaLogoPath: string;
  userIconPath: string;
  contractorName: string;
  cpIconPath: string;
  postalCode: string;
  members: Array<{
    type: string;
    age: number;
    name?: string;
    price: number;
  }>;
  coverageFee: number;
  sumInsured: number;
  processedDeductibles: Array<{
    nivel: string;
    menoresDe45: number;
    mayoresDe45: number;
    coInsurance: number;
  }>;
}

export interface HDITemplateVariables {
  plan: string;
  company: string;
  emmaLogoPath: string;
  userIconPath: string;
  contractorName: string;
  cpIconPath: string;
  postalCode: string;
  members: Array<{
    type: string;
    age: number;
    name?: string;
    anual: number;
    primerMes: number;
    segundoMesADoce: number;
  }>;
  totalAnual: number;
  totalPrimerMes: number;
  totalSegundoMesADoce: number;
  sumInsured: number;
}

export type HTMLTemplate = typeof GNP_TEMPLATE_HTML | typeof HDI_TEMPLATE_HTML;
export type TemplateVariables = GNPTemplateVariables | HDITemplateVariables;
