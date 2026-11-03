
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const TOTAL_PEOPLE = 400

const sports = [
  { id: 'chess', name: 'Ajedrez' },
  { id: 'football', name: 'Fútbol' },
  { id: 'volleyball', name: 'Vóley' },
  { id: 'basketball', name: 'Básquet' },
]

const initialCounts = {
  chess: 0,
  football: 0,
  volleyball: 0,
  basketball: 0,
}

export default function Exercise31() {
  const [selectedSport, setSelectedSport] = useState('')
  const [counts, setCounts] = useState(initialCounts)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')

  const totalRegistered = Object.values(counts).reduce(
    (total, count) => total + count,
    0
  )

  const progress = (totalRegistered / TOTAL_PEOPLE) * 100
  const finished = totalRegistered === TOTAL_PEOPLE

  const registerPerson = (e) => {
    e.preventDefault()

    if (!selectedSport) {
      setError('Selecciona el deporte que practica la persona.')
      return
    }

    if (finished) return

    const sport = sports.find((item) => item.id === selectedSport)

    setCounts((previous) => ({
      ...previous,
      [selectedSport]: previous[selectedSport] + 1,
    }))

    setHistory((previous) => [
      {
        id: totalRegistered + 1,
        sport: sport.name,
      },
      ...previous,
    ])

    setSelectedSport('')
    setError('')
  }

  const resetExercise = () => {
    setSelectedSport('')
    setCounts(initialCounts)
    setHistory([])
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={31}
      title="Clasificación por deporte"
      statement="Clasificar 400 personas según el deporte que practican: ajedrez, fútbol, vóley y básquet."
    >
      <div className="sports-classification-container">

        {/* Progreso general */}
        <div className="sports-progress-card">
          <div className="sports-progress-heading">
            <div>
              <span className="sports-section-label">
                PERSONAS REGISTRADAS
              </span>
              <strong>
                {totalRegistered}
                <span> / {TOTAL_PEOPLE}</span>
              </strong>
            </div>

            <span className="sports-progress-percentage">
              {progress.toFixed(1)}%
            </span>
          </div>

          <div className="sports-progress-track">
            <div
              className="sports-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>
            {finished
              ? 'Se completó la clasificación de las 400 personas.'
              : `Faltan ${TOTAL_PEOPLE - totalRegistered} personas por clasificar.`}
          </p>
        </div>

        {/* Formulario */}
        {!finished && (
          <form
            className="sports-classification-form"
            onSubmit={registerPerson}
          >
            <div className="sports-form-heading">
              <span className="sports-section-label">
                NUEVO REGISTRO
              </span>
              <h3>¿Qué deporte practica la persona?</h3>
              <p>Persona #{totalRegistered + 1}</p>
            </div>

            <label htmlFor="sport-select">
              Seleccionar deporte
            </label>

            <select
              id="sport-select"
              value={selectedSport}
              onChange={(e) => {
                setSelectedSport(e.target.value)
                setError('')
              }}
            >
              <option value="">Selecciona una opción</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>

            {error && (
              <p className="sports-error">{error}</p>
            )}

            <button
              type="submit"
              className="sports-register-button"
            >
              Registrar persona
            </button>
          </form>
        )}

        {/* Resultados */}
        <div className="sports-results">
          <div className="sports-results-heading">
            <div>
              <span className="sports-section-label">
                RESULTADOS
              </span>
              <h3>Clasificación por deporte</h3>
            </div>
            <span>{totalRegistered} registros</span>
          </div>

          <div className="sports-results-grid">
            {sports.map((sport) => {
              const count = counts[sport.id]
              const percentage = totalRegistered > 0
                ? (count / totalRegistered) * 100
                : 0

              return (
                <div className="sports-result-card" key={sport.id}>
                  <span>{sport.name}</span>

                  <strong>{count}</strong>

                  <div className="sports-result-track">
                    <div
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <small>{percentage.toFixed(1)}% del total</small>
                </div>
              )
            })}
          </div>
        </div>

        {/* Historial */}
        <div className="sports-history">
          <div className="sports-history-heading">
            <h3>Últimos registros</h3>
            <span>Más recientes primero</span>
          </div>

          {history.length === 0 ? (
            <p className="sports-empty">
              Todavía no se han registrado personas.
            </p>
          ) : (
            <div className="sports-history-list">
              {history.slice(0, 8).map((person) => (
                <div
                  className="sports-history-item"
                  key={person.id}
                >
                  <span className="sports-person-number">
                    #{person.id}
                  </span>
                  <strong>{person.sport}</strong>
                  <span className="sports-registered">
                    Registrado
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finalización */}
        {finished && (
          <div className="sports-completed">
            <span className="sports-completed-icon">✓</span>
            <h3>¡Clasificación completada!</h3>
            <p>
              Se han registrado y clasificado las 400 personas.
              Aquí puedes consultar los resultados finales.
            </p>
          </div>
        )}

        <button
          type="button"
          className="sports-reset-button"
          onClick={resetExercise}
        >
          Reiniciar ejercicio
        </button>

      </div>
    </ExercisePageLayout>
  )
}
