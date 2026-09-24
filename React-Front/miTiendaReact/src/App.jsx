import { useMemo, useState } from 'react'
import './App.css'

const initialContents = [
  {
    id: 1,
    titulo: 'Horizonte de Titanes',
    director: 'Denis Villeneuve',
    genero: 'Ciencia ficción',
    anioEstreno: 2024,
    duracionMinutos: 148,
    sinopsis: 'Una tripulación despierta en los límites del sistema solar y descubre una señal que podría cambiar el futuro de la humanidad.',
    puntuacion: 4.8,
    premios: ['Mejor fotografía', 'Premio del público'],
    color: 'coral',
    icon: '✦',
  },
  {
    id: 2,
    titulo: 'La Casa del Lago',
    director: 'Sofia Coppola',
    genero: 'Drama',
    anioEstreno: 2023,
    duracionMinutos: 112,
    sinopsis: 'Dos hermanas regresan al lugar donde crecieron para resolver los secretos que su familia dejó atrás.',
    puntuacion: 4.3,
    premios: ['Mejor guion'],
    color: 'violet',
    icon: '◒',
  },
  {
    id: 3,
    titulo: 'Código Fantasma',
    director: 'Jordan Peele',
    genero: 'Suspenso',
    anioEstreno: 2022,
    duracionMinutos: 126,
    sinopsis: 'Una analista de seguridad encuentra un patrón imposible en las transmisiones de una ciudad aparentemente tranquila.',
    puntuacion: 4.6,
    premios: ['Mejor montaje', 'Revelación del año'],
    color: 'blue',
    icon: '⌁',
  },
  {
    id: 4,
    titulo: 'Órbita 9',
    director: 'Alex Garland',
    genero: 'Aventura',
    anioEstreno: 2021,
    duracionMinutos: 101,
    sinopsis: 'Una piloto solitaria debe elegir entre completar su misión o responder al mensaje de una civilización desconocida.',
    puntuacion: 4.1,
    premios: [],
    color: 'amber',
    icon: '◉',
  },
  {
    id: 5,
    titulo: 'Domingos de Agosto',
    director: 'Greta Gerwig',
    genero: 'Comedia',
    anioEstreno: 2024,
    duracionMinutos: 97,
    sinopsis: 'Un grupo de amigos convierte cada domingo de verano en una pequeña celebración de la vida.',
    puntuacion: 4.5,
    premios: ['Mejor elenco'],
    color: 'green',
    icon: '☼',
  },
]

const emptyForm = {
  titulo: '',
  director: '',
  genero: '',
  anioEstreno: '',
  duracionMinutos: '',
  sinopsis: '',
  puntuacion: '',
  premios: '',
}

function Stars({ score }) {
  return (
    <span className="stars" aria-label={`${score} de 5 estrellas`}>
      <span>★</span>
      <strong>{score.toFixed(1)}</strong>
    </span>
  )
}

function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar modal">×</button>
        </div>
        {children}
      </section>
    </div>
  )
}

function ContentCard({ content, onEdit, onDelete, onView }) {
  return (
    <article className="content-card">
      <button className={`poster poster-${content.color}`} onClick={() => onView(content)} aria-label={`Ver detalles de ${content.titulo}`}>
        <span className="poster-icon">{content.icon}</span>
        <span className="poster-type">{content.genero}</span>
        <span className="poster-year">{content.anioEstreno}</span>
      </button>
      <div className="card-body">
        <div className="card-title-row">
          <h3>{content.titulo}</h3>
          <Stars score={content.puntuacion} />
        </div>
        <p className="muted">{content.director}</p>
        <div className="card-meta">
          <span>{content.anioEstreno}</span>
          <span className="dot">•</span>
          <span>{content.duracionMinutos} min</span>
        </div>
        <div className="card-actions">
          <button className="text-button" onClick={() => onView(content)}>Ver detalles</button>
          <div>
            <button className="small-button" onClick={() => onEdit(content)} aria-label={`Editar ${content.titulo}`}>Editar</button>
            <button className="small-button danger" onClick={() => onDelete(content)} aria-label={`Eliminar ${content.titulo}`}>Eliminar</button>
          </div>
        </div>
      </div>
    </article>
  )
}

function ContentFormModal({ content, onClose, onSave }) {
  const [form, setForm] = useState(content ? { ...content, premios: content.premios.join(', ') } : emptyForm)
  const [errors, setErrors] = useState({})

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    ;['titulo', 'director', 'genero', 'anioEstreno', 'duracionMinutos'].forEach((field) => {
      if (!String(form[field]).trim()) nextErrors[field] = 'Este campo es requerido'
    })
    if (form.puntuacion !== '' && (Number(form.puntuacion) < 0 || Number(form.puntuacion) > 5)) {
      nextErrors.puntuacion = 'Usa una puntuación entre 0 y 5'
    }
    if (form.anioEstreno && Number(form.anioEstreno) < 1888) nextErrors.anioEstreno = 'Introduce un año válido'
    if (form.duracionMinutos && Number(form.duracionMinutos) <= 0) nextErrors.duracionMinutos = 'Debe ser mayor que 0'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    onSave({
      ...form,
      anioEstreno: Number(form.anioEstreno),
      duracionMinutos: Number(form.duracionMinutos),
      puntuacion: Number(form.puntuacion || 0),
      premios: form.premios.split(',').map((item) => item.trim()).filter(Boolean),
      color: content?.color || 'violet',
      icon: content?.icon || '✦',
    })
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} value={form[name]} onChange={updateField} placeholder={placeholder} min={type === 'number' ? 0 : undefined} max={name === 'puntuacion' ? 5 : undefined} step={name === 'puntuacion' ? 0.1 : 1} />
      {errors[name] && <small className="error">{errors[name]}</small>}
    </label>
  )

  return (
    <Modal title={content ? 'Editar contenido' : 'Nuevo contenido'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {field('titulo', 'Título', 'text', 'Ej. El último viaje')}
          {field('director', 'Director', 'text', 'Nombre del director')}
          {field('genero', 'Género', 'text', 'Ej. Drama')}
          {field('anioEstreno', 'Año de estreno', 'number', '2024')}
          {field('duracionMinutos', 'Duración (minutos)', 'number', '120')}
          {field('puntuacion', 'Puntuación (0 a 5)', 'number', '4.5')}
        </div>
        <label className="field">
          <span>Sinopsis</span>
          <textarea name="sinopsis" rows="4" value={form.sinopsis} onChange={updateField} placeholder="Escribe una breve sinopsis..." />
        </label>
        <label className="field">
          <span>Premios <em>(separados por comas)</em></span>
          <input name="premios" value={form.premios} onChange={updateField} placeholder="Mejor guion, Premio del público" />
        </label>
        <div className="modal-footer">
          <button type="button" className="secondary-button" onClick={onClose}>Cancelar</button>
          <button type="submit" className="primary-button">{content ? 'Guardar cambios' : 'Agregar contenido'}</button>
        </div>
      </form>
    </Modal>
  )
}

function ContentDetailModal({ content, onClose }) {
  return (
    <Modal title="Detalle del contenido" onClose={onClose}>
      <div className="detail-layout">
        <div className={`detail-poster poster-${content.color}`}><span className="poster-icon">{content.icon}</span></div>
        <div>
          <div className="detail-kicker">{content.genero} <span>•</span> {content.anioEstreno}</div>
          <h3 className="detail-title">{content.titulo}</h3>
          <p className="detail-director">Dirigida por <strong>{content.director}</strong></p>
          <div className="detail-stats"><Stars score={content.puntuacion} /><span>{content.duracionMinutos} minutos</span></div>
          <h4>Sinopsis</h4>
          <p className="detail-copy">{content.sinopsis || 'Sin sinopsis disponible.'}</p>
          <h4>Premios y reconocimientos</h4>
          <div className="badges">
            {content.premios.length ? content.premios.map((award) => <span className="badge" key={award}>✦ {award}</span>) : <span className="muted">Sin premios registrados</span>}
          </div>
        </div>
      </div>
    </Modal>
  )
}

function App() {
  const [contents, setContents] = useState(initialContents)
  const [query, setQuery] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [selected, setSelected] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const filteredContents = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    if (!normalized) return contents
    return contents.filter((content) => `${content.titulo} ${content.genero}`.toLowerCase().includes(normalized))
  }, [contents, query])

  const saveContent = (content) => {
    if (content.id) {
      setContents((current) => current.map((item) => item.id === content.id ? content : item))
    } else {
      setContents((current) => [...current, { ...content, id: Date.now() }])
    }
    setFormOpen(false)
    setEditing(null)
  }

  const openEdit = (content) => {
    setEditing(content)
    setFormOpen(true)
  }

  const removeContent = () => {
    setContents((current) => current.filter((item) => item.id !== pendingDelete.id))
    setPendingDelete(null)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">◈</span><span>REEL<span className="brand-accent">VAULT</span></span></div>
        <nav><a className="active" href="#catalogo">Catálogo</a><a href="#estadisticas">Estadísticas</a></nav>
        <div className="profile"><span className="profile-avatar">SV</span><span className="profile-name">Santiago Vega</span><span className="chevron">⌄</span></div>
      </header>

      <main className="main-content" id="catalogo">
        <section className="hero-copy">
          <div><p className="eyebrow">BIBLIOTECA PERSONAL <span className="eyebrow-line" /></p><h1>Tu universo,<br /><span>tu selección.</span></h1><p className="hero-description">Organiza, descubre y disfruta tu colección de películas y series favoritas.</p></div>
          <button className="primary-button add-button" onClick={() => { setEditing(null); setFormOpen(true) }}><span>＋</span> Nuevo contenido</button>
        </section>

        <section className="toolbar">
          <div className="search-wrap"><span className="search-icon">⌕</span><input aria-label="Buscar contenido" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título o género..." />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda">×</button>}</div>
          <div className="result-count"><strong>{filteredContents.length}</strong> títulos</div>
        </section>

        {filteredContents.length ? <section className="content-grid">{filteredContents.map((content) => <ContentCard key={content.id} content={content} onEdit={openEdit} onDelete={setPendingDelete} onView={setSelected} />)}</section> : <div className="empty-state"><span>⌕</span><h3>No encontramos resultados</h3><p>Prueba con otro título o género.</p></div>}
      </main>

      <footer><span>REELVAULT © 2024</span><span>Tu colección, siempre contigo.</span></footer>

      {formOpen && <ContentFormModal content={editing} onClose={() => { setFormOpen(false); setEditing(null) }} onSave={saveContent} />}
      {selected && <ContentDetailModal content={selected} onClose={() => setSelected(null)} />}
      {pendingDelete && <Modal title="¿Eliminar contenido?" onClose={() => setPendingDelete(null)}><div className="delete-confirm"><div className={`mini-poster poster-${pendingDelete.color}`}>{pendingDelete.icon}</div><p>Estás a punto de eliminar <strong>{pendingDelete.titulo}</strong> de tu biblioteca. Esta acción no se puede deshacer.</p><div className="modal-footer"><button className="secondary-button" onClick={() => setPendingDelete(null)}>Cancelar</button><button className="delete-button" onClick={removeContent}>Sí, eliminar</button></div></div></Modal>}
    </div>
  )
}

export default App
