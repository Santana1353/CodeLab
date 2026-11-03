
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise30() {
  const [grade1, setGrade1] = useState('')
  const [grade2, setGrade2] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatNumber = (value) => {
    return Number(value.toFixed(2)).toString()
  }

  const calculateAverage = (e) => {
    e.preventDefault()

    if (grade1.trim() === '' || grade2.trim() === '') {
      setError('Debes ingresar las dos notas.')
      setResult(null)
      return
    }

    const first = Number(grade1.replace(',', '.'))
    const second = Number(grade2.replace(',', '.'))

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setError('Ingresa valores numéricos válidos.')
      setResult(null)
      return
    }

    if (first < 0 || first > 100 || second < 0 || second > 100) {
      setError('Las notas deben estar entre 0 y 100.')
      setResult(null)
      return
    }

    const average = (first + second) / 2

    setResult({
      first,
      second,
      average,
      approved: average >= 70,
    })

    setError('')
  }

  const resetExercise = () => {
    setGrade1('')
    setGrade2('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={30}
      title="Promedio de dos notas"
      statement="Diseñar un formulario que permita ingresar dos notas y determine su promedio; debe mostrar un comentario si este está aprobado o desaprobado."
    >
      <div className="grades-average-container">

        <div className="grades-average-info">
          <span>CRITERIO DE EVALUACIÓN</span>
          <div>
            <strong>70 puntos</strong>
            <p>Nota mínima para aprobar</p>
          </div>
        </div>

        <form
          className="grades-average-form"
          onSubmit={calculateAverage}
        >
          <div className="grades-average-fields">

            <div className="grades-average-field">
              <label htmlFor="grade-one">Primera nota</label>
              <input
                id="grade-one"
                type="text"
                inputMode="decimal"
                placeholder="Ej. 85"
                value={grade1}
                onChange={(e) => {
                  setGrade1(e.target.value)
                  setError('')
                  setResult(null)
                }}
              />
            </div>

            <div className="grades-average-field">
              <label htmlFor="grade-two">Segunda nota</label>
              <input
                id="grade-two"
                type="text"
                inputMode="decimal"
                placeholder="Ej. 90"
                value={grade2}
                onChange={(e) => {
                  setGrade2(e.target.value)
                  setError('')
                  setResult(null)
                }}
              />
            </div>

          </div>

          <p className="grades-average-hint">
            Ingresa notas entre 0 y 100. Puedes utilizar decimales.
          </p>

          {error && (
            <p className="grades-average-error">{error}</p>
          )}

          <button
            type="submit"
            className="grades-average-button"
          >
            Calcular promedio
          </button>
        </form>

        {result && (
          <div className="grades-average-result">

            <span className="grades-average-result-label">
              RESULTADO DEL ESTUDIANTE
            </span>

            <div className="grades-average-grades">
              <div>
                <span>Primera nota</span>
                <strong>{formatNumber(result.first)}</strong>
              </div>

              <div>
                <span>Segunda nota</span>
                <strong>{formatNumber(result.second)}</strong>
              </div>
            </div>

            <div className="grades-average-divider" />

            <span className="grades-average-average-label">
              Promedio obtenido
            </span>

            <strong className="grades-average-number">
              {formatNumber(result.average)}
            </strong>

            <div
              className={`grades-average-status ${
                result.approved ? 'approved' : 'failed'
              }`}
            >
              <span>{result.approved ? '✓' : '!'}</span>
              <div>
                <strong>
                  {result.approved ? 'Aprobado' : 'Desaprobado'}
                </strong>
                <p>
                  {result.approved
                    ? 'El estudiante alcanzó la nota mínima.'
                    : 'El estudiante no alcanzó la nota mínima.'}
                </p>
              </div>
            </div>

          </div>
        )}

        <button
          type="button"
          className="grades-average-reset"
          onClick={resetExercise}
        >
          Reiniciar ejercicio
        </button>

      </div>
    </ExercisePageLayout>
  )
}
