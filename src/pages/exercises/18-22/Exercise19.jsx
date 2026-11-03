
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise19() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const checkNumber = (e) => {
    e.preventDefault()

    if (number.trim() === '') {
      setError('Debes ingresar un número.')
      setResult(null)
      return
    }

    const value = Number(number)

    if (!Number.isFinite(value)) {
      setError('Ingresa un número válido.')
      setResult(null)
      return
    }

    const hasFraction = !Number.isInteger(value)
    const absoluteValue = Math.abs(value)
    const integerPart = Math.floor(absoluteValue)

    const fractionPart = hasFraction
      ? Number((absoluteValue - integerPart).toFixed(10))
      : 0

    setResult({
      value,
      hasFraction,
      integerPart: value < 0 ? -integerPart : integerPart,
      fractionPart: fractionPart.toString(),
    })

    setError('')
  }

  const reset = () => {
    setNumber('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={19}
      title="Detección de parte fraccionaria"
      statement="Hacer un programa que determine si un número tiene o no parte fraccionaria."
    >
      <div className="fraction-container">

        <div className="fraction-intro">
          <div className="fraction-icon">½</div>
          <div>
            <h3>Detector de parte fraccionaria</h3>
            <p>Introduce un número para comprobar si tiene decimales.</p>
          </div>
        </div>

        <form onSubmit={checkNumber} className="fraction-form">
          <div className="fraction-field">
            <label htmlFor="fraction-number">Número a evaluar</label>

            <input
              id="fraction-number"
              type="number"
              step="any"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Ej. 25.75"
            />
          </div>

          <p className="fraction-hint">
            Puedes ingresar números enteros, positivos, negativos o decimales.
          </p>

          {error && (
            <div className="fraction-error">
              {error}
            </div>
          )}

          <div className="fraction-actions">
            <button type="submit" className="fraction-button">
              Comprobar número
            </button>

            <button
              type="button"
              className="fraction-reset"
              onClick={reset}
            >
              Restablecer
            </button>
          </div>
        </form>

        {result && (
          <div
            className={`fraction-result ${
              result.hasFraction ? 'has-fraction' : 'integer-result'
            }`}
          >
            <span className="fraction-result-label">
              RESULTADO DEL ANÁLISIS
            </span>

            <h3>
              {result.hasFraction
                ? 'Tiene parte fraccionaria'
                : 'No tiene parte fraccionaria'}
            </h3>

            <p>
              El número <strong>{result.value}</strong>{' '}
              {result.hasFraction
                ? 'contiene una parte decimal.'
                : 'es un número entero.'}
            </p>

            <div className="fraction-detail">
              <div>
                <span>Parte entera</span>
                <strong>{result.integerPart}</strong>
              </div>

              <div>
                <span>Parte fraccionaria</span>
                <strong>{result.fractionPart}</strong>
              </div>
            </div>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
