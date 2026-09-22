import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="center">
      {/* Sección Hero con logos superpuestos */}
      <div className="hero">
        <img src={heroImg} alt="Hero Base" className="base" />
        <img src={reactLogo} alt="React Logo" className="framework" />
        <img src={viteLogo} alt="Vite Logo" className="vite" />
      </div>

      {/* Botón Contador */}
      <button className="counter" onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </button>

      {/* Separador con marcas laterales */}
      <div className="ticks"></div>

      {/* Sección de Documentación y Próximos Pasos */}
      <div id="next-steps">
        <div id="docs">
          <h2>Documentación</h2>
          <p>Aprende más sobre el desarrollo con React y Vite.</p>
          <ul>
            <li>
              <a href="https://react.dev" target="_blank" rel="noreferrer">
                <img src={reactLogo} alt="React" className="button-icon" />
                React Docs
              </a>
            </li>
            <li>
              <a href="https://vite.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} alt="Vite" className="button-icon" />
                Vite Docs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2>Próximos Pasos</h2>
          <p>Edita <code>src/App.jsx</code> y guarda los cambios para probar HMR.</p>
        </div>
      </div>

      <div id="spacer"></div>
    </div>
  )
}

export default App
