
import { useState } from 'react'
import { Calculator, ClipboardList, Plus, Trash2, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise09() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    if (note.trim() === '') {
      setError('Introduce una nota antes de agregarla.')
      return
    }

    const value = Number(note)

    if (!Number.isFinite(value) || value < 0 || value > 100) {
      setError('La nota debe estar entre 0 y 100.')
      return
    }

    setNotes((current) => [...current, value])
    setNote('')
    setResult(null)
    setError('')
  }

  const removeNote = (index) => {
    setNotes((current) => current.filter((_, i) => i !== index))
    setResult(null)
  }

  const calculateResults = () => {
    if (notes.length === 0) {
      setError('Agrega al menos una nota para realizar el análisis.')
      setResult(null)
      return
    }

    const approved = notes.filter((value) => value >= 70)
    const failed = notes.filter((value) => value < 70)

    const total = notes.reduce((sum, value) => sum + value, 0)
    const approvedTotal = approved.reduce((sum, value) => sum + value, 0)
    const failedTotal = failed.reduce((sum, value) => sum + value, 0)

    setResult({
      totalNotes: notes.length,
      approvedCount: approved.length,
      failedCount: failed.length,
      average: total / notes.length,
      approvedAverage: approved.length > 0
        ? approvedTotal / approved.length
        : null,
      failedAverage: failed.length > 0
        ? failedTotal / failed.length
        : null,
    })

    setError('')
  }

  const resetCalculator = () => {
    setNote('')
    setNotes([])
    setResult(null)
    setError('')
  }

  const formatNumber = (value) =>
    value.toLocaleString('es-DO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <ExercisePageLayout
      exerciseNumber={9}
      title="Análisis de notas"
      statement="Dado N notas de un estudiante calcular: cuántas notas tiene desaprobadas, cuántas aprobadas, el promedio de notas y los promedios de notas aprobadas y desaprobadas."
    >
      <div className="grade-analysis">

        <div className="grade-analysis-intro">
          <div className="grade-analysis-icon">
            <ClipboardList size={22} />
          </div>

          <div>
            <h3>Registro de calificaciones</h3>
            <p>
              Agrega las notas del estudiante y analiza sus resultados
              al finalizar.
            </p>
          </div>
        </div>

        <div className="grade-scale-info">
          <div>
            <span className="grade-dot grade-approved-dot" />
            <span>Aprobada: 70 o más</span>
          </div>

          <div>
            <span className="grade-dot grade-failed-dot" />
            <span>Desaprobada: 69 o menos</span>
          </div>

          <span className="grade-scale-range">
            Escala de 0 a 100
          </span>
        </div>

        <form onSubmit={addNote} className="grade-analysis-form">
          <div className="grade-analysis-field">
            <label htmlFor="student-note">
              Nota del estudiante
            </label>

            <div className="grade-analysis-input">
              <ClipboardList size={18} />

              <input
                id="student-note"
                type="number"
                min="0"
                max="100"
                step="any"
                placeholder="Ej. 85"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <span>/ 100</span>
            </div>
          </div>

          <button type="submit" className="grade-analysis-add">
            <Plus size={17} />
            Agregar nota
          </button>
        </form>

        {error && (
          <p className="grade-analysis-error">
            {error}
          </p>
        )}

        <div className="grade-list-section">
          <div className="grade-list-heading">
            <div>
              <h4>Notas registradas</h4>
              <p>Calificaciones introducidas hasta el momento.</p>
            </div>

            <span>{notes.length} notas</span>
          </div>

          {notes.length === 0 ? (
            <div className="grade-empty">
              <ClipboardList size={25} />
              <p>Aún no has agregado ninguna nota.</p>
            </div>
          ) : (
            <div className="grade-list">
              {notes.map((value, index) => (
                <div className="grade-item" key={index}>
                  <div className="grade-item-info">
                    <span className="grade-item-number">
                      {index + 1}
                    </span>

                    <div>
                      <strong>Nota {index + 1}</strong>
                      <span>{value} puntos</span>
                    </div>
                  </div>

                  <div className="grade-item-actions">
                    <span
                      className={`grade-status ${
                        value >= 70 ? 'approved' : 'failed'
                      }`}
                    >
                      {value >= 70 ? 'Aprobada' : 'Desaprobada'}
                    </span>

                    <button
                      type="button"
                      className="grade-delete"
                      onClick={() => removeNote(index)}
                      aria-label={`Eliminar nota ${index + 1}`}
                      title="Eliminar nota"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grade-analysis-actions">
          <button
            type="button"
            className="grade-analysis-calculate"
            onClick={calculateResults}
            disabled={notes.length === 0}
          >
            <Calculator size={17} />
            Analizar notas
          </button>

          <button
            type="button"
            className="grade-analysis-reset"
            onClick={resetCalculator}
          >
            <RotateCcw size={16} />
            Limpiar
          </button>
        </div>

        {result && (
          <div className="grade-analysis-result">
            <div className="grade-result-heading">
              <span>RESULTADO DEL ANÁLISIS</span>
              <span className="grade-result-success">
                Calculado
              </span>
            </div>

            <div className="grade-average-main">
              <p>Promedio general</p>

              <h2>
                {formatNumber(result.average)}
                <small> / 100</small>
              </h2>

              <span>
                Calculado con {result.totalNotes} notas registradas
              </span>
            </div>

            <div className="grade-count-grid">
              <div className="grade-count-card approved-card">
                <span>Notas aprobadas</span>
                <strong>{result.approvedCount}</strong>
                <small>70 puntos o más</small>
              </div>

              <div className="grade-count-card failed-card">
                <span>Notas desaprobadas</span>
                <strong>{result.failedCount}</strong>
                <small>Menos de 70 puntos</small>
              </div>
            </div>

            <div className="grade-average-breakdown">
              <h4>Promedios por categoría</h4>

              <div className="grade-average-row">
                <div>
                  <strong>Promedio de aprobadas</strong>
                  <span>{result.approvedCount} notas</span>
                </div>

                <strong>
                  {result.approvedAverage !== null
                    ? `${formatNumber(result.approvedAverage)} / 100`
                    : 'No aplica'}
                </strong>
              </div>

              <div className="grade-average-row">
                <div>
                  <strong>Promedio de desaprobadas</strong>
                  <span>{result.failedCount} notas</span>
                </div>

                <strong>
                  {result.failedAverage !== null
                    ? `${formatNumber(result.failedAverage)} / 100`
                    : 'No aplica'}
                </strong>
              </div>
            </div>

            <p className="grade-analysis-note">
              Los promedios por categoría se calculan utilizando
              únicamente las notas correspondientes. Si no hay notas
              en una categoría, se muestra "No aplica".
            </p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
