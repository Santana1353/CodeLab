
import { useState } from 'react'
import { Calculator, Clock, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise04() {
  const [seconds, setSeconds] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateTime = (event) => {
    event.preventDefault()

    if (seconds.trim() === '') {
      setError('Introduce el tiempo en segundos.')
      setResult(null)
      return
    }

    const totalSeconds = Number(seconds)

    if (!Number.isSafeInteger(totalSeconds) || totalSeconds <= 0) {
      setError('Introduce un número entero de segundos mayor que cero.')
      setResult(null)
      return
    }

    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    const secondsToNextMinute =
      remainingSeconds === 0 ? 0 : 60 - remainingSeconds

    setError('')
    setResult({
      totalSeconds,
      minutes,
      remainingSeconds,
      secondsToNextMinute,
      nextMinute: minutes + (remainingSeconds === 0 ? 0 : 1),
    })
  }

  const resetCalculator = () => {
    setSeconds('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={4}
      title="Conversión de segundos restantes"
      statement="Dado un tiempo en segundos, calcular los segundos restantes que le corresponden para convertirse exactamente en minutos."
    >
      <div className="seconds-calculator">
        <div className="seconds-intro">
          <div className="seconds-icon">
            <Clock size={22} />
          </div>
          <div>
            <h3>Conversor de segundos a minutos</h3>
            <p>
              Descubre cuántos minutos representa el tiempo
              introducido y cuánto falta para el próximo minuto.
            </p>
          </div>
        </div>

        <form onSubmit={calculateTime} className="seconds-form">
          <div className="seconds-field">
            <label htmlFor="time-seconds">Cantidad de segundos</label>

            <div className="seconds-input-wrapper">
              <Clock size={18} />

              <input
                id="time-seconds"
                type="number"
                min="1"
                step="1"
                placeholder="Ej. 75"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />

              <span>segundos</span>
            </div>
          </div>

          {error && <p className="seconds-error">{error}</p>}

          <div className="seconds-actions">
            <button type="submit" className="seconds-button">
              <Calculator size={17} />
              Convertir tiempo
            </button>

            <button
              type="button"
              className="seconds-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="seconds-result">
            <div className="seconds-result-heading">
              <span>RESULTADO DE LA CONVERSIÓN</span>
              <span className="seconds-success">Calculado</span>
            </div>

            <div className="seconds-summary">
              <p>Conversión del tiempo</p>
              <h2>
                {result.minutes} {result.minutes === 1 ? 'minuto' : 'minutos'}
                {result.remainingSeconds > 0 &&
                  ` y ${result.remainingSeconds} segundos`}
              </h2>
              <span>
                {result.totalSeconds} segundos en total
              </span>
            </div>

            <div className="seconds-next-minute">
              <p>Tiempo que falta para el próximo minuto</p>
              <h2>{result.secondsToNextMinute} segundos</h2>
              <span>
                {result.secondsToNextMinute === 0
                  ? 'El tiempo ya coincide exactamente con un minuto.'
                  : `Faltan ${result.secondsToNextMinute} segundos para completar ${result.nextMinute} minutos.`}
              </span>
            </div>

            <div className="seconds-breakdown">
              <div className="seconds-detail">
                <span>Minutos completos</span>
                <strong>{result.minutes}</strong>
              </div>

              <div className="seconds-detail">
                <span>Segundos adicionales</span>
                <strong>{result.remainingSeconds}</strong>
              </div>

              <div className="seconds-detail">
                <span>Segundos para el próximo minuto</span>
                <strong>{result.secondsToNextMinute}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
