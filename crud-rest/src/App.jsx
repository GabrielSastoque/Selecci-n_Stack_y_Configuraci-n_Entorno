import { useState } from 'react'

const mockContents = [
  { _id: '665f1a000000000000000001', titulo: 'Horizonte de Titanes', director: 'Denis Villeneuve', genero: 'Ciencia ficción', anioEstreno: 2024, duracionMinutos: 148, sinopsis: 'Una tripulación despierta en los límites del sistema solar y descubre una señal que podría cambiar el futuro de la humanidad.', puntuacion: 4.8, premios: ['Mejor fotografía', 'Premio del público'] },
  { _id: '665f1a000000000000000002', titulo: 'La Casa del Lago', director: 'Sofia Coppola', genero: 'Drama', anioEstreno: 2023, duracionMinutos: 112, sinopsis: 'Dos hermanas regresan al lugar donde crecieron para resolver los secretos que su familia dejó atrás.', puntuacion: 4.3, premios: ['Mejor guion'] },
  { _id: '665f1a000000000000000003', titulo: 'Código Fantasma', director: 'Jordan Peele', genero: 'Suspenso', anioEstreno: 2022, duracionMinutos: 126, sinopsis: 'Una analista de seguridad encuentra un patrón imposible en las transmisiones de una ciudad aparentemente tranquila.', puntuacion: 4.6, premios: ['Mejor montaje', 'Revelación del año'] },
  { _id: '665f1a000000000000000004', titulo: 'Órbita 9', director: 'Alex Garland', genero: 'Aventura', anioEstreno: 2021, duracionMinutos: 101, sinopsis: 'Una piloto solitaria debe elegir entre completar su misión o responder al mensaje de una civilización desconocida.', puntuacion: 4.1, premios: [] },
  { _id: '665f1a000000000000000005', titulo: 'Domingos de Agosto', director: 'Greta Gerwig', genero: 'Comedia', anioEstreno: 2024, duracionMinutos: 97, sinopsis: 'Un grupo de amigos convierte cada domingo de verano en una pequeña celebración de la vida.', puntuacion: 4.5, premios: ['Mejor elenco'] },
]

const emptyContent = { titulo: '', director: '', genero: '', anioEstreno: '', duracionMinutos: '', sinopsis: '', puntuacion: '', premios: '' }

function Stars({ score }) {
  return <span className="stars">★ <b>{Number(score).toFixed(1)}</b></span>
}

function Modal({ title, children, onClose, wide = false }) {
  return <div className="overlay" onMouseDown={onClose}><section className={`modal ${wide ? 'modal-wide' : ''}`} onMouseDown={(event) => event.stopPropagation()}><header><h2>{title}</h2><button className="close" onClick={onClose} aria-label="Cerrar">×</button></header>{children}</section></div>
}

function ContentFormModal({ content, onClose, onSave }) {
  const [form, setForm] = useState(content ? { ...content, premios: content.premios.join(', ') } : emptyContent)
  const [errors, setErrors] = useState({})

  const update = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
    setErrors((current) => ({ ...current, [target.name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    ;['titulo', 'director', 'genero', 'anioEstreno', 'duracionMinutos'].forEach((name) => {
      if (!String(form[name]).trim()) next[name] = 'Campo requerido'
    })
    if (form.puntuacion !== '' && (Number(form.puntuacion) < 0 || Number(form.puntuacion) > 5)) next.puntuacion = 'Debe estar entre 0 y 5'
    if (form.anioEstreno && Number(form.anioEstreno) < 1888) next.anioEstreno = 'Año inválido'
    if (form.duracionMinutos && Number(form.duracionMinutos) <= 0) next.duracionMinutos = 'Debe ser mayor que 0'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }

    onSave({
      ...(content ? { _id: content._id } : {}),
      titulo: form.titulo.trim(),
      director: form.director.trim(),
      genero: form.genero.trim(),
      anioEstreno: Number(form.anioEstreno),
      duracionMinutos: Number(form.duracionMinutos),
      sinopsis: form.sinopsis.trim(),
      puntuacion: Number(form.puntuacion || 0),
      premios: form.premios.split(',').map((award) => award.trim()).filter(Boolean),
    })
  }

  const input = (name, label, type = 'text') => (
    <label>
      <span>{label}</span>
      <input name={name} type={type} value={form[name]} onChange={update} min={type === 'number' ? 0 : undefined} max={name === 'puntuacion' ? 5 : undefined} step={name === 'puntuacion' ? 0.1 : 1} />
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  )

  return <Modal title={content ? 'Editar contenido' : 'Nuevo contenido'} onClose={onClose} wide><form onSubmit={submit}><div className="form-grid">{input('titulo', 'Título')}{input('director', 'Director')}{input('genero', 'Género')}{input('anioEstreno', 'Año de estreno', 'number')}{input('duracionMinutos', 'Duración (minutos)', 'number')}{input('puntuacion', 'Puntuación (0 a 5)', 'number')}</div><label><span>Sinopsis</span><textarea name="sinopsis" rows="4" value={form.sinopsis} onChange={update} /></label><label><span>Premios <em>(separados por comas)</em></span><input name="premios" value={form.premios} onChange={update} /></label><div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Cancelar</button><button className="primary">Guardar contenido</button></div></form></Modal>
}

function ContentCard({ content, expanded, onToggle, onEdit, onDelete }) {
  return <article className="card">
    <div className="poster"><span>◈</span><small>{content.genero}</small><small>{content.anioEstreno}</small></div>
    <div className="card-info">
      <div className="title-row"><h3>{content.titulo}</h3><Stars score={content.puntuacion} /></div>
      <p className="muted">{content.director}</p>
      <p className="meta">{content.anioEstreno} · {content.duracionMinutos} min</p>
      <div className="actions"><button onClick={onToggle}>{expanded ? 'Ocultar detalle' : 'Ver detalle'}</button><div><button onClick={() => onEdit(content)}>Editar</button><button className="danger-text" onClick={() => onDelete(content)}>Eliminar</button></div></div>
      {expanded && <div className="inline-detail"><h4>Sinopsis</h4><p>{content.sinopsis || 'Sin sinopsis disponible.'}</p><h4>Premios</h4><div className="badges">{content.premios.length ? content.premios.map((award) => <span key={award}>✦ {award}</span>) : <span className="muted">Sin premios registrados</span>}</div></div>}
    </div>
  </article>
}

function App() {
  const [contents, setContents] = useState(mockContents)
  const [editing, setEditing] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const handleAdd = (content) => {
    setContents((current) => [...current, { ...content, _id: `665f1a${Date.now().toString(16).padStart(18, '0').slice(-18)}` }])
    setEditing(null)
  }

  const handleUpdate = (content) => {
    setContents((current) => current.map((item) => item._id === content._id ? content : item))
    setEditing(null)
  }

  const handleDelete = () => {
    setContents((current) => current.filter((item) => item._id !== deleting._id))
    setDeleting(null)
    setExpandedId(null)
  }

  const save = (content) => content._id ? handleUpdate(content) : handleAdd(content)

  return <div className="app">
    <header className="topbar"><div className="brand">◈ <span>REEL<span>VAULT</span></span></div><nav><a className="active" href="#catalogo">Catálogo</a></nav></header>
    <main>
      <section className="hero"><div><p className="eyebrow">BIBLIOTECA PERSONAL</p><h1>Tu universo,<br /><strong>tu selección.</strong></h1><p className="intro">Organiza, descubre y disfruta tu colección de películas y series favoritas.</p></div><button className="primary add" onClick={() => setEditing({})}>＋ Nuevo contenido</button></section>
      <section className="catalog-header"><div><h2>Contenido</h2><p>{contents.length} títulos en tu biblioteca</p></div></section>
      <section className="grid">{contents.map((content) => <ContentCard key={content._id} content={content} expanded={expandedId === content._id} onToggle={() => setExpandedId(expandedId === content._id ? null : content._id)} onEdit={setEditing} onDelete={setDeleting} />)}</section>
    </main>
    <footer>REELVAULT © 2024 <span>Tu colección, siempre contigo.</span></footer>
    {editing && <ContentFormModal content={editing._id ? editing : null} onClose={() => setEditing(null)} onSave={save} />}
    {deleting && <Modal title="¿Eliminar contenido?" onClose={() => setDeleting(null)}><p className="delete-copy">Estás a punto de eliminar <b>{deleting.titulo}</b>. Esta acción no se puede deshacer.</p><div className="modal-actions"><button className="secondary" onClick={() => setDeleting(null)}>Cancelar</button><button className="delete" onClick={handleDelete}>Sí, eliminar</button></div></Modal>}
  </div>
}

export default App
