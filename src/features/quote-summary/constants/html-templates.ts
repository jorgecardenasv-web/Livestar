/**
 * HTML Templates for Quote Summary - Optimized Version with Coberturas Fix
 * Unified spacing system that works consistently across both templates
 */

export const GNP_ANNUAL_TEMPLATE_HTML = `<!doctype html>
<html lang="es">
  <head>
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
        html {
          background-color: #f9f8f9;
        }

      /* IMPORTANTE: Reglas @page para manejar márgenes en todas las páginas */ 
      @page { 
        size: letter; 
        /* Margen superior optimizado para mejor distribución */ 
        margin-top: 130px; /* 120px header + 10px espacio */ 
        margin-bottom: 45px; /* 30px footer + 15px espacio */ 
        margin-left: 25px; 
        margin-right: 25px; 
        background-color: #f9f8f9;
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
        background-color: #f9f8f9; 
        /* No necesitamos padding-top en el body */ 
        padding: 0; 
        margin: 0; 
        page-break-before: auto; 
        page-break-after: auto; 
      }

      /* Contenedor principal */ 
      .wrapper { 
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

      /* Contenido principal */ 
      .main-content { 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        /* Padding optimizado para mejor uso del espacio */ 
        padding-top: 10px; 
        padding-bottom: 20px; 
      }

      /* Secciones con manejo mejorado de saltos de página */ 
      .content-section { 
        border-radius: var(--border-radius); 
        width: 100%; 
        max-width: 900px; 
        display: block; 
        position: relative; 
        overflow: visible; 
        /* Permitir división inteligente de secciones para mejor distribución */ 
        page-break-inside: auto; 
        break-inside: auto; 
        /* Control de líneas huérfanas y viudas */ 
        orphans: 2; 
        widows: 3; 
        /* Asegurar espacio después de saltos de página */ 
        page-break-before: auto; 
        page-break-after: auto; 
      }

      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }
      
      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }
      
      /* Asegurar espaciado apropiado entre secciones */
      .content-section + .content-section {
        margin-top: 18px !important;
      }

      .plan-info {
        padding: 10px 30px;
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
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .plan-details span {
        flex: 1;
        font-size: 26px;
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
        /* Evitar que el título se separe de su contenido */
        page-break-after: avoid;
        page-break-inside: avoid;
      }

      .section-title img {
        width: 40px;
        height: 40px;
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
        font-size: 14px;
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
        padding: 12px;
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
        padding: 12px;
        background: var(--white);
        color: var(--text-dark);
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid var(--border-gray);
        white-space: normal;
        word-wrap: break-word;
      }

      .data-table th.data-table-th {
        text-align: center;
      }

      .data-table td {
        padding: 12px;
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
        font-size: 20px;
        font-weight: bold;
        color: var(--text-dark);
        text-decoration: underline;
      }

      /* Estilos de coberturas - CORREGIDOS */
      .coverage-item {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 15px !important; /* Reducir padding fijo en lugar de dinámico */
        border-bottom: 1px solid var(--border-gray) !important;
        background-color: var(--white) !important;
        min-height: 50px !important; /* Reducir altura mínima */
        
        /* SIMPLIFICAR page-break rules */
        page-break-inside: auto; /* Cambiar de avoid a auto */
        break-inside: auto;
        
        position: relative !important;
        z-index: 15 !important;
        overflow: visible !important;
      }

      .coverage-name {
        color: var(--secondary-blue) !important;
        font-weight: 500 !important;
        font-size: 14px !important;
        flex: 1 !important;
        text-align: left !important;
      }

      .coverage-amount {
        color: var(--secondary-blue) !important;
        font-weight: bold !important;
        font-size: 16px !important;
        text-align: right !important;
        white-space: nowrap !important;
      }

      /* Mejorar el div con border-top dentro de coberturas */
      .content-section:last-child .border-top {
        border-top: 3px solid var(--primary-blue) !important;
        background-color: var(--white) !important;
        overflow: visible !important;
        min-height: 80px !important;
        display: block !important;
      }

      /* Tabla de deducibles */
      .data-table.deductible-table th {
        text-align: center;
        font-size: 14px;
        padding: 12px 8px;
        width: auto !important;
      }

      .data-table.deductible-table td {
        text-align: center;
        padding: 12px 8px;
        font-weight: 500;
        width: auto !important;
      }

      .data-table.deductible-table th:first-child,
      .data-table.deductible-table td:first-child {
        width: 20% !important;
      }

      .data-table.deductible-table th:not(:first-child),
      .data-table.deductible-table td:not(:first-child) {
        width: 20% !important;
      }

      /* Estilos para doble encabezado */
      .data-table.deductible-table .group-header {
        font-weight: bold;
        width: 40% !important;
      }

      .data-table.deductible-table .sub-header {
        font-size: 12px;
        font-weight: 600;
        width: 20% !important;
      }

      .data-table.deductible-table .align-middle {
        vertical-align: middle;
        font-weight: bold;
        width: 20% !important;
      }

      .tope-text {
        font-size: 10px;
        color: var(--text-gray);
        margin-top: 2px;
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

      .logo-emma {
        height: 250px;
        width: auto;
      }

      /* Evitar que los headers de tabla se separen del contenido */
      .data-table thead,
      .protected-persons-table thead {
        page-break-after: avoid;
        break-after: avoid;
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
              <img src="{{emmaLogoPath}}" alt="EMMA Logo" class="logo-emma" />
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
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
                <div class="cost-summary">
                  <div class="summary-box monthly-total">
                    <div class="summary-label">Prima Total Anual</div>
                    <div class="summary-amount">
                      {{formatCurrency totalAnual}}
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
            <section class="content-section">
              <h2 class="section-title">
                <img src="{{medicalIconPath}}" alt="Icono Dinero" />
                DEDUCIBLES Y COASEGURO
              </h2>
              <table class="data-table deductible-table border-top">
                <thead>
                  <tr>
                    <th rowspan="2" class="align-middle">Nivel de atención hospitalaria</th>
                    <th colspan="2" class="group-header">Menores de 45 años</th>
                    <th colspan="2" class="group-header">Mayores de 45 años</th>
                  </tr>
                  <tr>
                    <th class="sub-header">Deducible</th>
                    <th class="sub-header">Coaseguro (Tope)</th>
                    <th class="sub-header">Deducible</th>
                    <th class="sub-header">Coaseguro (Tope)</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each processedDeductibles}}
                  <tr>
                    <td class="table-name">{{nivel}}</td>
                    <td class="table-price">{{formatCurrency deductibleUnder45}}</td>
                    <td class="table-price">{{coInsuranceUnder45}}%<br><span class="tope-text">Tope: {{formatCurrency coInsuranceCapUnder45}}</span></td>
                    <td class="table-price">{{formatCurrency deductibleOver45}}</td>
                    <td class="table-price">{{coInsuranceOver45}}%<br><span class="tope-text">Tope: {{formatCurrency coInsuranceCapOver45}}</span></td>
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

export const GNP_MONTHLY_TEMPLATE_HTML = `<!doctype html>
<html lang="es">
  <head>
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
        html {
          background-color: #f9f8f9;
        }

      /* IMPORTANTE: Reglas @page para manejar márgenes en todas las páginas */ 
      @page { 
        size: letter; 
        /* Margen superior optimizado para mejor distribución */ 
        margin-top: 130px; /* 120px header + 10px espacio */ 
        margin-bottom: 45px; /* 30px footer + 15px espacio */ 
        margin-left: 25px; 
        margin-right: 25px; 
        background-color: #f9f8f9;
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
        background-color: #f9f8f9; 
        /* No necesitamos padding-top en el body */ 
        padding: 0; 
        margin: 0; 
        page-break-before: auto; 
        page-break-after: auto; 
      }

      /* Contenedor principal */ 
      .wrapper { 
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

      /* Contenido principal */ 
      .main-content { 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        /* Padding optimizado para mejor uso del espacio */ 
        padding-top: 10px; 
        padding-bottom: 20px; 
      }

      /* Secciones con manejo mejorado de saltos de página */ 
      .content-section { 
        border-radius: var(--border-radius); 
        width: 100%; 
        max-width: 900px; 
        display: block; 
        position: relative; 
        overflow: visible; 
        /* Permitir división inteligente de secciones para mejor distribución */ 
        page-break-inside: auto; 
        break-inside: auto; 
        /* Control de líneas huérfanas y viudas */ 
        orphans: 2; 
        widows: 3; 
        /* Asegurar espacio después de saltos de página */ 
        page-break-before: auto; 
        page-break-after: auto; 
      }

      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }
      
      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }
      
      /* Asegurar espaciado apropiado entre secciones */
      .content-section + .content-section {
        margin-top: 18px !important;
      }

      .plan-info {
        padding: 10px 30px;
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
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .plan-details span {
        flex: 1;
        font-size: 26px;
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
        /* Evitar que el título se separe de su contenido */
        page-break-after: avoid;
        page-break-inside: avoid;
      }

      .section-title img {
        width: 40px;
        height: 40px;
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
        font-size: 14px;
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
        padding: 12px;
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
        padding: 12px;
        background: var(--white);
        color: var(--text-dark);
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid var(--border-gray);
        white-space: normal;
        word-wrap: break-word;
      }

      .data-table th.data-table-th {
        text-align: center;
      }

      .data-table td {
        padding: 12px;
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
        font-size: 20px;
        font-weight: bold;
        color: var(--text-dark);
        text-decoration: underline;
      }

      /* Estilos de coberturas - CORREGIDOS */
      .coverage-item {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 15px !important; /* Reducir padding fijo en lugar de dinámico */
        border-bottom: 1px solid var(--border-gray) !important;
        background-color: var(--white) !important;
        min-height: 50px !important; /* Reducir altura mínima */
        
        /* SIMPLIFICAR page-break rules */
        page-break-inside: auto; /* Cambiar de avoid a auto */
        break-inside: auto;
        
        position: relative !important;
        z-index: 15 !important;
        overflow: visible !important;
      }

      .coverage-name {
        color: var(--secondary-blue) !important;
        font-weight: 500 !important;
        font-size: 14px !important;
        flex: 1 !important;
        text-align: left !important;
      }

      .coverage-amount {
        color: var(--secondary-blue) !important;
        font-weight: bold !important;
        font-size: 16px !important;
        text-align: right !important;
        white-space: nowrap !important;
      }

      /* Mejorar el div con border-top dentro de coberturas */
      .content-section:last-child .border-top {
        border-top: 3px solid var(--primary-blue) !important;
        background-color: var(--white) !important;
        overflow: visible !important;
        min-height: 80px !important;
        display: block !important;
      }

      /* Tabla de deducibles */
      .data-table.deductible-table th {
        text-align: center;
        font-size: 14px;
        padding: 12px 8px;
        width: auto !important;
      }

      .data-table.deductible-table td {
        text-align: center;
        padding: 12px 8px;
        font-weight: 500;
        width: auto !important;
      }

      .data-table.deductible-table th:first-child,
      .data-table.deductible-table td:first-child {
        width: 20% !important;
      }

      .data-table.deductible-table th:not(:first-child),
      .data-table.deductible-table td:not(:first-child) {
        width: 20% !important;
      }

      /* Estilos para doble encabezado */
      .data-table.deductible-table .group-header {
        font-weight: bold;
        width: 40% !important;
      }

      .data-table.deductible-table .sub-header {
        font-size: 12px;
        font-weight: 600;
        width: 20% !important;
      }

      .data-table.deductible-table .align-middle {
        vertical-align: middle;
        font-weight: bold;
        width: 20% !important;
      }

      .tope-text {
        font-size: 10px;
        color: var(--text-gray);
        margin-top: 2px;
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

      .logo-emma {
        height: 250px;
        width: auto;
      }

      /* Evitar que los headers de tabla se separen del contenido */
      .data-table thead,
      .protected-persons-table thead {
        page-break-after: avoid;
        break-after: avoid;
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
              <img src="{{emmaLogoPath}}" alt="EMMA Logo" class="logo-emma" />
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
                        {{formatCurrency anual}}
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
                      {{formatCurrency totalAnual}}
                    </div>
                  </div>

                  <div class="summary-box monthly-total">
                    <div class="summary-label">Prima Mensual</div>
                    <div class="summary-amount">
                      {{formatCurrency totalMensual}}
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
            <section class="content-section">
              <h2 class="section-title">
                <img src="{{medicalIconPath}}" alt="Icono Dinero" />
                DEDUCIBLES Y COASEGURO
              </h2>
              <table class="data-table deductible-table border-top">
                <thead>
                  <tr>
                    <th rowspan="2" class="align-middle">Nivel de atención hospitalaria</th>
                    <th colspan="2" class="group-header">Menores de 45 años</th>
                    <th colspan="2" class="group-header">Mayores de 45 años</th>
                  </tr>
                  <tr>
                    <th class="sub-header">Deducible</th>
                    <th class="sub-header">Coaseguro (Tope)</th>
                    <th class="sub-header">Deducible</th>
                    <th class="sub-header">Coaseguro (Tope)</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each processedDeductibles}}
                  <tr>
                    <td class="table-name">{{nivel}}</td>
                    <td class="table-price">{{formatCurrency deductibleUnder45}}</td>
                    <td class="table-price">{{coInsuranceUnder45}}%<br><span class="tope-text">Tope: {{formatCurrency coInsuranceCapUnder45}}</span></td>
                    <td class="table-price">{{formatCurrency deductibleOver45}}</td>
                    <td class="table-price">{{coInsuranceOver45}}%<br><span class="tope-text">Tope: {{formatCurrency coInsuranceCapOver45}}</span></td>
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
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        * {
          margin: 0;
          
        }

        html {
          background-color: #f9f8f9;
        }

      /* IMPORTANTE: Reglas @page para manejar márgenes en todas las páginas */ 
      @page { 
        size: letter; 
        /* Margen superior optimizado para mejor distribución */ 
        margin-top: 130px; /* 120px header + 10px espacio */
        margin-bottom: 45px; /* 30px footer + 15px espacio */ 
        margin-left: 25px; 
        margin-right: 25px; 
        background-color: #f9f8f9;
      }

      body { 
        font-family: "Arial", sans-serif; 
        line-height: 1.6; 
        color: var(--text-dark); 
        background-color: #f9f8f9; 
        page-break-before: auto; 
        page-break-after: auto;
      }

      .border-top {
        border-top: 3px solid var(--primary-blue);
      }

      /* Contenido principal */ 
      /* Contenido principal */ 
      .main-content { 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        /* Padding optimizado para mejor uso del espacio */ 
        padding-top: 10px; 
        padding-bottom: 20px; 
      }

      /* Secciones con manejo mejorado de saltos de página */ 
      .content-section { 
        border-radius: var(--border-radius); 
        width: 100%; 
        max-width: 900px; 
        display: block; 
        position: relative; 
        overflow: visible; 
        /* Permitir división inteligente de secciones para mejor distribución */ 
        page-break-inside: auto; 
        break-inside: auto; 
        /* Control de líneas huérfanas y viudas */ 
        orphans: 2; 
        widows: 3; 
        /* Asegurar espacio después de saltos de página */ 
        page-break-before: auto; 
        page-break-after: auto; 
      }

      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }
      
      /* Asegurar que después de un salto de página haya espacio */ 
      .content-section::before { 
        content: ""; 
        display: block; 
        height: 0; 
        margin: 0; 
        /* Este pseudo-elemento ayuda a mantener el espaciado */ 
      }

      .plan-info {
        padding: 5px 15px;
        width: 100%;
        max-width: 900px;
        /* Los márgenes se aplicarán vía JavaScript */
        page-break-after: avoid;
        break-after: avoid;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .logo-emma {
        height: 250px;
        width: auto;
      }

      /* Evitar que los headers de tabla se separen del contenido */
      .data-table thead,
      .protected-persons-table thead {
        page-break-after: avoid;
        break-after: avoid;
      }

      .plan-details {
        color: var(--secondary-blue);
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .plan-details span {
        flex: 1;
        font-size: 26px;
      }

      .section-title {
        background: var(--primary-blue);
        color: var(--white);
        padding: 6px 16px;
        border-radius: 13px 13px 0 0;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        /* Evitar que el título se separe de su contenido */
        page-break-after: avoid;
        page-break-inside: avoid;
      }

      .section-title img {
        width: 30px;
        height: 30px;
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
        font-size: 14px;
        font-weight: bold;
      }

      /* Layouts responsivos */
      .layout-60-40 {
        display: flex;
        background-color: white;
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
        font-size: 14px;
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
        padding: 12px;
        border-right: 1px solid var(--border-gray);
      }

      .data-table th:last-child,
      .data-table td:last-child {
        border-right: none;
      }

      .data-table th:first-child,
      .data-table td:first-child {
        width: 35%;
      }

      .data-table th {
        padding: 12px;
        background: var(--white);
        color: var(--text-dark);
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid var(--border-gray);
        white-space: normal;
        word-wrap: break-word;
      }

      .data-table th.data-table-th {
        text-align: center;
      }

      .data-table td {
        padding: 12px;
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
        padding: 5px;
        border-radius: var(--border-radius-small);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--white);
      }

      /* Estilos para doble encabezado en HDI */
      .data-table.cost-table .group-header {
        font-weight: bold;
        text-align: center;
        background: var(--white);
        color: var(--text-dark);
      }

      .data-table.cost-table .sub-header {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background: var(--white);
        color: var(--text-dark);
      }

      .data-table.cost-table .align-middle {
        vertical-align: middle;
        font-weight: bold;
        text-align: center;
      }

      /* Ajuste de anchos específicos para tabla de costos HDI */
      .data-table.cost-table th:first-child,
      .data-table.cost-table td:first-child {
        width: 18%; /* Reducido aún más para dar más espacio */
      }

      .data-table.cost-table th:nth-child(2),
      .data-table.cost-table td:nth-child(2) {
        width: 18%;
      }

      .data-table.cost-table th:nth-child(3),
      .data-table.cost-table td:nth-child(3) {
        width: 32%; /* Aumentado significativamente */
      }

      .data-table.cost-table th:nth-child(4),
      .data-table.cost-table td:nth-child(4) {
        width: 32%; /* Aumentado significativamente */
      }

      /* Centrar todos los datos de la tabla de costos HDI */
      .data-table.cost-table td {
        text-align: center;
      }

      .summary-box {
        text-align: center;
        padding: 6px;
        margin-bottom: 4px;
      }

      .summary-label {
        color: var(--secondary-blue);
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 2px;
      }

      .summary-amount {
        font-size: 18px;
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

      .coverage-name {
        color: var(--secondary-blue) !important;
        font-weight: 500 !important;
        font-size: 14px !important;
        flex: 1 !important;
        text-align: left !important;
      }

      .coverage-amount {
        color: var(--secondary-blue) !important;
        font-weight: bold !important;
        font-size: 16px !important;
        text-align: right !important;
        white-space: nowrap !important;
      }

      /* Tabla de deducibles */
      .data-table.deductible-table th {
        text-align: center;
        font-size: 14px;
        padding: 8px 8px;
        width: auto !important;
      }

      .data-table.deductible-table td {
        text-align: center;
        padding: 12px 8px;
        font-weight: 500;
        width: auto !important;
      }

      .data-table.deductible-table th:first-child,
      .data-table.deductible-table td:first-child {
        width: 20% !important;
      }

      .data-table.deductible-table th:not(:first-child),
      .data-table.deductible-table td:not(:first-child) {
        width: 20% !important;
      }

      .level-column {
        font-weight: bold;
        color: var(--secondary-blue);
      }

      .price-cell {
        color: var(--secondary-blue);
        font-weight: bold;
      }
    </style>
  </head>
  <body>
      <main>
        <div class="quote-content">
          <section class="plan-info">
            <div class="plan-details">
              <span>{{plan}} • {{company}}</span>
              <img src="{{emmaLogoPath}}" alt="EMMA Logo" class="logo-emma" />
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
                <table class="data-table cost-table">
                  <thead>
                    <tr>
                      <th rowspan="2" class="align-middle">Asegurado</th>
                      <th rowspan="2" class="align-middle">Anual</th>
                      <th colspan="2" class="group-header">Pago mensual</th>
                    </tr>
                    <tr>
                      <th class="sub-header">Pago inicial<br>(Primer Mes)</th>
                      <th class="sub-header">Pago subsecuente<br>(Mes 2 al 12)</th>
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
            <section class="content-section">
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
  totalAnual: number;
  totalMensual: number;
  sumInsured: number;
  processedDeductibles: Array<{
    nivel: string;
    deductibleUnder45: number;
    deductibleOver45: number;
    coInsuranceUnder45: number;
    coInsuranceCapUnder45: number;
    coInsuranceOver45: number;
    coInsuranceCapOver45: number;
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
  processedDeductibles: Array<{
    nivel: string;
    deductibleUnder45: number;
    deductibleOver45: number;
    coInsuranceUnder45: number;
    coInsuranceCapUnder45: number;
    coInsuranceOver45: number;
    coInsuranceCapOver45: number;
  }>;
}

export type HTMLTemplate =
  | typeof GNP_ANNUAL_TEMPLATE_HTML
  | typeof GNP_MONTHLY_TEMPLATE_HTML
  | typeof HDI_TEMPLATE_HTML;
export type TemplateVariables = GNPTemplateVariables | HDITemplateVariables;
