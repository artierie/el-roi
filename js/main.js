/* ENLACES PARA COMPLETAR
   Pega cada dirección entre las comillas. Deja "" cuando aún no tengas el enlace.
   Waze: abre el lugar en Waze, utiliza Compartir y copia su enlace HTTPS.
   Ejemplo de formato (no pegar literalmente): waze: "https://..."
*/
const ENLACES = {
  waze: "https://waze.com/ul/hd1u0vuj39",
  instagram: "",
  facebook: "",
  tiktok: ""
};

// Solo se habilitan enlaces HTTPS configurados; no se crean destinos ficticios.
function enlaceSeguro(valor) {
  if (!valor || !valor.trim()) return null;
  try {
    const url = new URL(valor.trim());
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
function configurarEnlace(elemento, valor) {
  const url = enlaceSeguro(valor);
  if (!elemento || !url) return false;
  elemento.href = url;
  elemento.target = "_blank";
  elemento.rel = "noopener noreferrer";
  elemento.removeAttribute("aria-disabled");
  elemento.removeAttribute("tabindex");
  return true;
}
const avisoWaze = document.querySelector("#aviso-waze");
if (configurarEnlace(document.querySelector("#enlace-waze"), ENLACES.waze) && avisoWaze) {
  avisoWaze.hidden = true;
}
const redes = Array.from(document.querySelectorAll("[data-red]"));
redes.forEach(function (red) { configurarEnlace(red, ENLACES[red.dataset.red]); });
const avisoRedes = document.querySelector("#aviso-redes");
if (redes.every(function (red) { return red.hasAttribute("href"); }) && avisoRedes) {
  avisoRedes.hidden = true;
}

/* NAVEGACIÓN MÓVIL */
document.documentElement.classList.add("con-js");
const menuToggle = document.querySelector(".menu-toggle");
const navegacion = document.querySelector("#navegacion");
const cabecera = document.querySelector(".cabecera");
const vistaMovil = window.matchMedia("(max-width: 760px)");
function cerrarMenu(devolverFoco) {
  if (!menuToggle || !navegacion) return;
  navegacion.classList.remove("abierta");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".menu-texto").textContent = "Menú";
  if (devolverFoco && vistaMovil.matches) menuToggle.focus();
}
if (menuToggle && navegacion) {
  menuToggle.hidden = false;
  menuToggle.addEventListener("click", function () {
    const abrir = menuToggle.getAttribute("aria-expanded") !== "true";
    navegacion.classList.toggle("abierta", abrir);
    menuToggle.setAttribute("aria-expanded", String(abrir));
    menuToggle.querySelector(".menu-texto").textContent = abrir ? "Cerrar" : "Menú";
  });
  navegacion.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      if (!vistaMovil.matches) return;
      cerrarMenu(false);
      // Tras cerrar, el foco pasa al destino en lugar de quedar en un enlace oculto.
      const destino = document.querySelector(enlace.getAttribute("href"));
      if (destino) {
        destino.setAttribute("tabindex", "-1");
        destino.focus({ preventScroll: true });
        destino.addEventListener("blur", function () { destino.removeAttribute("tabindex"); }, { once: true });
      }
    });
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") cerrarMenu(true);
  });
  document.addEventListener("click", function (evento) {
    if (menuToggle.getAttribute("aria-expanded") === "true" && !cabecera.contains(evento.target)) cerrarMenu(false);
  });
  vistaMovil.addEventListener("change", function () {
    const focoEnNav = navegacion.contains(document.activeElement);
    cerrarMenu(vistaMovil.matches && focoEnNav);
  });
}

/* FILTRO ORIGINAL: se mantiene para la revisión posterior de categorías. */
const controles = document.querySelector("#controles-filtro");
const selector = document.querySelector("#categoria");
const productos = document.querySelectorAll("[data-categoria]");
const resultado = document.querySelector("#resultado-filtro");
function filtrarProductos() {
  let visibles = 0;
  productos.forEach(function (producto) {
    const mostrar = selector.value === "todos" || producto.dataset.categoria === selector.value;
    producto.hidden = !mostrar;
    if (mostrar) visibles += 1;
  });
  resultado.textContent = visibles + (visibles === 1 ? " producto disponible." : " productos disponibles.");
}
if (controles && selector && resultado) {
  controles.hidden = false;
  selector.addEventListener("change", filtrarProductos);
  filtrarProductos();
}

/* GALERÍA: desplazamiento manual; nunca avanza por sí sola. */
const pista = document.querySelector("#galeria-pista");
const anterior = document.querySelector("#galeria-anterior");
const siguiente = document.querySelector("#galeria-siguiente");
const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
function actualizarFlechas() {
  if (!pista || !anterior || !siguiente) return;
  anterior.disabled = pista.scrollLeft <= 2;
  siguiente.disabled = pista.scrollLeft >= pista.scrollWidth - pista.clientWidth - 2;
}
function moverGaleria(direccion) {
  const tarjeta = pista.querySelector(".galeria-item");
  const espacio = parseFloat(window.getComputedStyle(pista).columnGap) || 0;
  const paso = tarjeta ? tarjeta.getBoundingClientRect().width + espacio : pista.clientWidth * 0.8;
  pista.scrollBy({ left: direccion * paso, behavior: movimientoReducido.matches ? "instant" : "smooth" });
}
if (pista && anterior && siguiente) {
  document.querySelector(".galeria-controles").hidden = false;
  anterior.addEventListener("click", function () { moverGaleria(-1); });
  siguiente.addEventListener("click", function () { moverGaleria(1); });
  pista.addEventListener("scroll", actualizarFlechas, { passive: true });
  window.addEventListener("resize", actualizarFlechas);
  actualizarFlechas();
}
