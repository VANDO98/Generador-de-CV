# Generador de CV Estilo LaTeX Harvard

Un creador de currículums interactivo, visual e independiente que emula el diseño formal y tipográfico de LaTeX (modelo académico Harvard) directamente en HTML y CSS. Está optimizado para la lectura de sistemas de reclutamiento automatizados (ATS) y diseñado para ejecutarse 100% de forma privada en el cliente (sin bases de datos ni costo de servidores).

👉 **Sitio en vivo:** [https://vando98.github.io/Generador-de-CV/](https://vando98.github.io/Generador-de-CV/)

---

## Características Principales

*   **Estilo LaTeX Puro:** Utiliza la tipografía clásica serif **EB Garamond**, líneas divisorias estilizadas (`\titlerule`) y espaciados compactos idénticos a los generados en editores como Overleaf.
*   **Edición Visual Sin Código (NoCode):**
    *   Formularios para editar datos personales, experiencia laboral, educación, proyectos y habilidades.
    *   Interruptores visuales (ícono de ojo) para ocultar o mostrar secciones enteras.
    *   Reordenamiento de secciones mediante botones de subir/bajar para cambiar la jerarquía del CV al instante.
*   **Secciones Personalizables:**
    *   Posibilidad de cambiar los títulos de cualquier sección.
    *   Opción para añadir nuevas secciones personalizadas de tipo **Texto Libre (Párrafo)** o **Lista de Elementos** (ideal para roles, certificaciones, publicaciones, etc.).
*   **Iconos de Contacto Dinámicos:** Asocia iconos vectoriales de Lucide (LinkedIn, GitHub, Correo, Teléfono, Ubicación, Web/Portafolio, etc.) a cada uno de tus enlaces de forma dinámica.
*   **Privacidad Absoluta (LocalStorage):**
    *   Toda la información editada se guarda de manera automática y local en el navegador del usuario utilizando `localStorage`.
    *   Ningún dato personal se envía a servidores externos.
*   **Sistema de Respaldo Local (JSON):**
    *   Exporta tu CV completo como un archivo `.json` de texto plano.
    *   Importa tu respaldo en cualquier momento para restaurar tu información de inmediato.
*   **Exportación ATS-Friendly:** 
    *   El botón "Imprimir / PDF" aprovecha el motor de impresión nativo del navegador configurando reglas CSS especiales (`@media print` y `@page { margin: 0; }`).
    *   Elimina toda la interfaz web, remueve barras de desplazamiento y genera un PDF vectorial impecable donde los robots ATS pueden seleccionar y leer el texto sin problemas.

---

## Estructura del Código

*   `src/App.jsx`: Componente central que administra el estado global, el LocalStorage y los flujos de importación/exportación JSON.
*   `src/components/BuilderUI.jsx`: El panel izquierdo de edición (NoCode), formularios dinámicos y pestañas de administración.
*   `src/components/CVPreview.jsx`: El renderizador visual que imita las proporciones reales de una hoja A4 (`210mm x 297mm`) y aplica los estilos LaTeX.
*   `src/index.css`: Contiene la importación de fuentes, los estilos globales de Tailwind CSS v4 y las reglas específicas de impresión en PDF.

---

## Desarrollo Local

Si deseas realizar modificaciones locales al código de este generador, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/VANDO98/Generador-de-CV.git
    cd Generador-de-CV
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    *Abre el navegador en `http://localhost:5173`.*

---

## Despliegue en GitHub Pages

El proyecto ya está pre-configurado para subirse automáticamente a GitHub Pages en tu cuenta.

1.  Asegúrate de cambiar el nombre del repositorio en la propiedad `base` de [vite.config.js](vite.config.js) si tu repositorio tiene un nombre distinto a `Generador-de-CV`.
2.  Ejecuta el comando:
    ```bash
    npm run deploy
    ```
    *Esto compilará los archivos estáticos en la carpeta `dist` y los subirá directamente a la rama `gh-pages` de tu repositorio remoto.*
3.  Ve a los **Settings** (Configuración) de tu repositorio en GitHub web, busca la sección **Pages** y comprueba que la fuente de publicación esté asignada a la rama `gh-pages`.
