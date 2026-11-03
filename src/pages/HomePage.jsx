
import { useMemo, useState } from 'react'
import { Search, Code2 } from 'lucide-react'
import { exercises } from '../data/exercises'
import ExerciseCard from '../components/ExerciseCard'

export default function HomePage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      exercises.filter((item) =>
        `${item.id} ${item.title} ${item.shortDescription} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  )

  return (
    <div className="page-content">
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            CODELAB
          </div>

          <h1>Práctica de Programación</h1>

          <p>
            Una colección de ejercicios desarrollados en C#,
            adaptados a aplicaciones interactivas utilizando React.
            Cada ejercicio cuenta con su propia página y funcionalidad.
          </p>
        </div>

        <div className="hero-orbit">
          <div className="orbit-core">
            <Code2 size={38} />
          </div>
          <i />
          <b />
          <em />
        </div>
      </div>

      <div className="catalog-heading">
        <div>
          <div className="page-eyebrow">EJERCICIOS DISPONIBLES</div>
          <h2>Todos los ejercicios</h2>
          <p>{exercises.length} ejercicios del documento original</p>
        </div>

        <label className="search-box">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ejercicio..."
          />

          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </label>
      </div>

      <div className="exercise-grid">
        {filtered.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          No se encontraron ejercicios con esa búsqueda.
        </div>
      )}
    </div>
  )
}
