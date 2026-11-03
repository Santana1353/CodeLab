
import { useState } from 'react'
import { Calculator, Clock, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise05() {
  const [minutes, setMinutes] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateTime = (event) => {
    event.preventDefault()

    if (minutes.trim() === '') {
      setError('Introduce el tiempo en minutos.')
      setResult(null)
      return
    }

    const totalMinutes = Number(minutes)

    if (!Number.isSafeInteger(totalMinutes) || totalMinutes < 0) {
      setError('Introduce un número entero de minutos igual o mayor que cero.')
      setResult(null)
      return
    }

    const days = Math.floor(totalMinutes / 1440)
    const remainingMinutes = totalMinutes % 1440
    const hours = Math.floor(remainingMinutes / 60)
    const remainingSeconds = remainingMinutes % 60

    setError('')
    setResult({
      totalMinutes,
      days,
      hours,
      minutes: remainingSeconds,
    })
  }

  const resetCalculator = () => {
    setMinutes('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={5}
      title="Conversión de minutos"
      statement="Dado un tiempo en minutos, calcular los días, horas y minutos que le corresponden."
    >
      <div className="time-converter">
        <div className="time-intro">
          <div className="time-icon">
            <Clock size={22} />
          </div>
          <div>
            <h3>Conversor de minutos</h3>
            <p>
              Introduce una cantidad de minutos y descubre su
              equivalencia en días, horas y minutos.
            </p>
          </div>
        </div>

        <form onSubmit={calculateTime} className="time-form">
          <div className="time-field">
            <label htmlFor="total-minutes">Tiempo en minutos</label>

            <div className="time-input-wrapper">
              <Clock size={18} />

              <input
                id="total-minutes"
                type="number"
                min="0"
                step="1"
                placeholder="Ej. 1500"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />

              <span>minutos</span>
            </div>
          </div>

          {error && <p className="time-error">{error}</p>}

          <div className="time-actions">
            <button type="submit" className="time-button">
              <Calculator size={17} />
              Convertir tiempo
            </button>

            <button
              type="button"
              className="time-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="time-result">
            <div className="time-result-heading">
              <span>RESULTADO DE LA CONVERSIÓN</span>
              <span className="time-success">Calculado</span>
            </div>

            <div className="time-summary">
              <p>Equivalencia del tiempo</p>
              <h2>
                {result.days} {result.days === 1 ? 'día' : 'días'}
              </h2>
              <h3>
                {result.hours} {result.hours === 1 ? 'hora' : 'horas'} y{' '}
                {result.minutes}{' '}
                {result.minutes === 1 ? 'minuto' : 'minutos'}
              </h3>
              <span>{result.totalMinutes.toLocaleString('es-DO')} minutos en total</span>
            </div>

            <div className="time-breakdown">
              <h4>Desglose de la conversión</h4>

              <div className="time-detail">
                <div>
                  <strong>Días</strong>
                  <span>1 día equivale a 1,440 minutos</span>
                </div>
                <strong>{result.days}</strong>
              </div>

              <div className="time-detail">
                <div>
                  <strong>Horas</strong>
                  <span>1 hora equivale a 60 minutos</span>
                </div>
                <strong>{result.hours}</strong>
              </div>

              <div className="time-detail">
                <div>
                  <strong>Minutos restantes</strong>
                  <span>Tiempo que queda después de convertir días y horas</span>
                </div>
                <strong>{result.minutes}</strong>
              </div>
            </div>

            <p className="time-note">
              La conversión utiliza 24 horas por día y 60 minutos por hora.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
