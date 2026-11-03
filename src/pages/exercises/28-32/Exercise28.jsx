
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise28() {
  const [limit, setLimit] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateSum = (e) => {
    e.preventDefault()

    if (limit.trim() === '') {
      setError('Debes ingresar el número final de la suma.')
      setResult(null)
      return
    }

    const n = Number(limit)

    if (!Number.isSafeInteger(n) || n < 8) {
      setError('Ingresa un número entero igual o mayor que 8.')
      setResult(null)
      return
    }

    if (n > 100000) {
      setError('Para este ejercicio, el número final no puede superar 100,000.')
      setResult(null)
      return
    }

    let sum = 0
    const numbers = []

    for (let i = 8; i <= n; i++) {
      sum += i
      numbers.push(i)
    }

    setResult({
      limit: n,
      sum,
      numbers,
    })

    setError('')
  }

  const reset = () => {
    setLimit('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={28}
      title="Suma de enteros desde 8"
      statement="Calcular la suma de los N primeros números enteros desde el número 8: S=8+9+10+11+...+N."
    >
      <div className="sum-eight-container">

        {/* INTRODUCCION */}

        <div className="sum-eight-intro">
          <div className="sum-eight-icon">Σ</div>
          <div>
            <h3>Calculadora de suma</h3>
            <p>Ingresa el número final para sumar los enteros desde el 8.</p>
          </div>
        </div>

        {/* FORMULARIO */}

        <form className="sum-eight-form" onSubmit={calculateSum}>
          <div className="sum-eight-form-heading">
            <h4>Rango de números</h4>
            <span>Inicio: 8</span>
          </div>

          <div className="sum-eight-field">
            <label htmlFor="sum-eight-limit">Número final (N)</label>
            <input
              id="sum-eight-limit"
              type="number"
              min="8"
              step="1"
              placeholder="Ej. 12"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>

          <div className="sum-eight-formula">
            <span>OPERACIÓN</span>
            <strong>S = 8 + 9 + 10 + 11 + ... + N</strong>
            <p>Se incluyen todos los números enteros hasta el límite ingresado.</p>
          </div>

          {error && (
            <div className="sum-eight-error">{error}</div>
          )}

          <div className="sum-eight-actions">
            <button type="submit" className="sum-eight-calculate">
              Calcular suma
            </button>

            <button
              type="button"
              className="sum-eight-reset"
              onClick={reset}
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* RESULTADO */}

        {result && (
          <div className="sum-eight-result">
            <div className="sum-eight-result-heading">
              <span>RESULTADO</span>
              <h4>Suma total</h4>
            </div>

            <div className="sum-eight-result-value">
              <strong>{result.sum.toLocaleString('es-DO')}</strong>
              <span>resultado de la suma</span>
            </div>

            <div className="sum-eight-details">
              <div>
                <span>Número inicial</span>
                <strong>8</strong>
              </div>

              <div>
                <span>Número final</span>
                <strong>{result.limit.toLocaleString('es-DO')}</strong>
              </div>

              <div>
                <span>Cantidad de números</span>
                <strong>{result.numbers.length.toLocaleString('es-DO')}</strong>
              </div>
            </div>

            <div className="sum-eight-sequence">
              <span>DESARROLLO DE LA SUMA</span>
              <p>{result.numbers.join(' + ')}</p>
            </div>

            <p className="sum-eight-result-note">
              La suma se realizó incluyendo todos los números enteros desde el 8 hasta el {result.limit}.
            </p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
