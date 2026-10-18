Los textos visibles se editan en `index.html`.

1. Busca la frase que quieras cambiar con **Ctrl + F** en Windows o **⌘ + F** en Mac.
2. Sustituye únicamente el texto entre las etiquetas.
3. Guarda y revisa el resultado.

Por ejemplo:

```html
<h2>Nuestra historia</h2>
<p>Aquí puedes escribir la historia definitiva de El Roi.</p>
```

Conserva los valores de `id`, `class` y `data-categoria` mientras cambias los copys: conectan el contenido con el diseño, la navegación y los filtros. Mantén `id="menu"` e `id="ubicacion"` para que funcionen los botones de la portada.

La dirección y el horario se editan también en `index.html`. Hay **una sola dirección y un solo horario**, con los textos «Ubicación por definir para el proyecto» y «Horario por definir». Sustitúyelos por los datos que decidan presentar en el trabajo; si son ficticios, conserva esa aclaración.

## 4. Incorporar sus propias fotografías

La carpeta `assets/img` contiene imágenes SVG provisionales para comprobar espacios y proporciones. Son marcadores que deben reemplazarse por sus fotografías cuando estén listas.

Al agregar una foto:

1. Coloca el archivo dentro de `assets/img`.
2. Usa un nombre sencillo, en minúsculas y sin espacios ni tildes.
3. Actualiza su referencia en el código, incluyendo la extensión real.
4. Guarda, recarga y comprueba el encuadre en computadora y celular.

Por ejemplo, si agregas `portada.webp`, cambia la referencia a `portada.webp`; no renombres una fotografía JPG como `.svg`. Usa fotografías propias o recursos con permiso de uso y registra sus créditos en `creditos.md`.

### Foto de portada

Abre `css/estilos.css` y busca la variable `--foto-portada`. Su valor inicial es:

```css
--foto-portada: url('../assets/img/portada.svg');
```

Si tu fotografía se llama `portada.webp`, cambia esa línea por:

```css
--foto-portada: url('../assets/img/portada.webp');
```

La ruta comienza con `../` porque parte desde la carpeta `css`. Escoge una foto con espacio suficiente alrededor del punto de interés: el fondo se recorta de manera diferente según el tamaño de pantalla. Revisa que el texto siga siendo legible sobre la fotografía.

### Foto de ubicación

En `index.html`, busca `id="foto-ubicacion"`. La imagen utiliza inicialmente `assets/img/ubicacion.svg`.

Sustituye su `src` por el archivo que agregues y escribe una descripción apropiada en `alt`. Por ejemplo:

```html
<img
  id="foto-ubicacion"
  src="assets/img/ubicacion.webp"
  alt="Entrada de la cafetería El Roi"
>
```

Si la etiqueta existente tiene otros atributos, consérvalos; basta con cambiar `src` y `alt`. La descripción debe corresponder a lo que realmente aparece en la foto.

### Fotos de la galería

Los cinco marcadores iniciales son:

```text
assets/img/galeria-01.svg
assets/img/galeria-02.svg
assets/img/galeria-03.svg
assets/img/galeria-04.svg
assets/img/galeria-05.svg
```

Busca esos nombres en `index.html` y reemplaza cada `src` por la fotografía correspondiente. Ajusta también la descripción `alt` y el pie de foto de `figcaption`.

Para agregar otra fotografía, duplica un bloque completo de la galería dentro de su contenedor. La estructura es:

```html
<figure class="galeria-item">
  <img
    src="assets/img/galeria-06.webp"
    alt="Mesa junto a la ventana de El Roi"
    loading="lazy"
  >
  <figcaption>Un rincón para hacer una pausa.</figcaption>
</figure>
```

El ejemplo supone que ya agregaste `galeria-06.webp` a `assets/img`. Usa el mismo formato de los bloques existentes y evita colocar la nueva foto fuera del contenedor de la galería.

## 5. Configurar Waze y redes sociales

Abre `js/main.js`. Al principio encontrarás el objeto `ENLACES`, con estos campos inicialmente vacíos:

```javascript
const ENLACES = {
  waze: "",
  instagram: "",
  facebook: "",
  tiktok: ""
};
```

Pega cada dirección completa que comience con **https://** entre las comillas del campo correspondiente. Conserva las comas, las llaves y las comillas. Los enlaces se abren en una pestaña nueva.

- **Waze:** busca el lugar que quieras utilizar en Waze, emplea su opción de compartir, copia el enlace y pégalo en `waze`.
- **Instagram, Facebook y TikTok:** pega el enlace completo del perfil que corresponda. Puedes dejar vacías las redes que todavía no tengan.

No escribas una dirección aproximada ni agregues `#` para simular un enlace. **Mientras los campos estén vacíos, no habrá redirecciones falsas.** Después de configurarlos, guarda y prueba cada enlace en el navegador.

Si el lugar o los perfiles pertenecen a un negocio ajeno, evita presentarlos como si fueran de El Roi. Para este trabajo pueden mantenerse pendientes hasta decidir cómo representar la cafetería ficticia.

## 6. Revisión antes de publicar

- [ ] Los copys corresponden a la versión aprobada por ustedes.
- [ ] Las tres tarjetas explican por qué visitar El Roi.
- [ ] Los botones de la portada llevan a Ubicación y Menú.
- [ ] La barra superior no tapa los títulos al navegar.
- [ ] La página se lee y acomoda correctamente en celular y computadora.
- [ ] Las categorías y los filtros conservados funcionan con los productos visibles.
- [ ] Solo aparece una ubicación y un horario; los datos ficticios están aclarados.
- [ ] Las fotos provisionales fueron reemplazadas o se han identificado como provisionales durante la revisión.
- [ ] Waze y las redes apuntan a los destinos correctos, o permanecen sin configurar.
- [ ] La galería se puede recorrer con los controles disponibles y en pantalla táctil.
- [ ] Los enlaces y controles se pueden recorrer con la tecla Tab y se ve cuál está seleccionado.
- [ ] Se conservan el aviso académico y los créditos de los recursos.

La publicación en GitHub Pages queda para después de esta revisión. Por ahora, guarda y revisa los cambios de forma local.
