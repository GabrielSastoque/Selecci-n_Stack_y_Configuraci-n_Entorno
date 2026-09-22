<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// Estado reactivo para el generador de excusas
const excusaActual = ref<string>('Haz clic abajo cuando necesites salir de un compromiso.')

const excusas: string[] = [
  'Mi código finalmente compiló y no puedo moverme hasta que termine de ejecutar.',
  'Mi gato pisó el teclado y mandó un commit a producción por accidente.',
  'Estoy en un bucle infinito comiendo cereal y intentando arreglar un punto y coma.',
  'El servidor local cobró conciencia propia y me está pidiendo un café.',
  'El CSS de mi vida se desalineó y estoy arreglando la propiedad flexbox.',
  'Se cayó la base de datos de mi motivación, reintentando conexión en 5 horas...'
]
// 3. Declarar la función que se ejecuta en el @click
const generarExcusa = (): void => {
  const indice: number = Math.floor(Math.random() * excusas.length)
  const nuevaExcusa: string | undefined = excusas[indice]

  if (nuevaExcusa !== undefined) {
    excusaActual.value = nuevaExcusa
  }
}

</script>

<template>
  <div class="main-container">
    <header class="hero-header">
      <div class="logo-area">
        <span class="emoji-logo">☕⚡</span>
        <HelloWorld msg="¡Bienvenido a la Zona Anti-Estrés!" />
      </div>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-btn">🏠 Inicio</RouterLink>
        <RouterLink to="/about" class="nav-btn">🤖 Secretos</RouterLink>
      </nav>
    </header>

    <main class="content">
      <!-- Tarjeta del Generador de Excusas -->
      <section class="card excuse-card">
        <h2>🚀 Generador Automático de Excusas para Devs</h2>
        <p class="excuse-text">"{{ excusaActual }}"</p>
        <button @click="generarExcusa" class="action-btn">
          🎲 Obtener otra excusa
        </button>
      </section>

      <!-- Grilla de pasatiempos / trucos -->
      <section class="funny-grid">
        <article class="mini-card">
          <span class="card-icon">🧠</span>
          <h3>Regla del 99%</h3>
          <p>El primer 90% del código toma el 10% del tiempo. El 10% restante toma el otro 90% del tiempo.</p>
        </article>

        <article class="mini-card">
          <span class="card-icon">🍕</span>
          <h3>Combustible Oficial</h3>
          <p>Convierte café y pizza en código funcional desde tiempos inmemoriales.</p>
        </article>

        <article class="mini-card">
          <span class="card-icon">🐛</span>
          <h3>Depuración Patito</h3>
          <p>Si nada funciona, cuéntale el problema a un patito de goma. ¡Nunca falla!</p>
        </article>
      </section>

      <!-- Renderizado de las vistas dinámicas según la ruta -->
      <div class="router-view-container">
        <RouterView />
      </div>
    </main>

    <footer class="funny-footer">
      <p>Hecho con 💚 usando Vue 3 + TypeScript — Libre de errores (o eso creemos).</p>
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

.hero-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-bottom: 2px dashed #42b883;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.logo-area {
  text-align: center;
}

.emoji-logo {
  font-size: 3rem;
  display: block;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1.2rem;
  background-color: #35495e;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.nav-btn:hover, .nav-btn.router-link-active {
  background-color: #42b883;
}

.card {
  background: #f0fdf4;
  border: 2px solid #42b883;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.15);
  margin-bottom: 2rem;
}

.excuse-text {
  font-size: 1.25rem;
  font-style: italic;
  color: #1b4332;
  margin: 1.5rem 0;
  min-height: 3rem;
}

.action-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #33a06f;
}

.action-btn:active {
  transform: scale(0.96);
}

.funny-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.mini-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.card-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.router-view-container {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
}

.funny-footer {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #888;
}
</style>
