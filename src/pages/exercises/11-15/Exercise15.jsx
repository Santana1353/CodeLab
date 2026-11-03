
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise15() {
  const [start, setStart] = useState('20')
  const [end, setEnd] = useState('400')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    const first = Number(start)
    const last = Number(end)

    if (start.trim() === '' || end.trim() === '') {
      setError('Debes completar ambos números.')
      return
    }

    if (!Number.isInteger(first) || !Number.isInteger(last)) {
      setError('Solo se permiten números enteros.')
      return
    }

    if (first < 20 || first > 400 || last < 20 || last > 400) {
      setError('Los números deben estar entre 20 y 400.')
      return
    }

    if (first >= last) {
      setError('El número inicial debe ser menor que el número final.')
      return
    }

    const evenNumbers = []
    let sum = 0
    let product = 1n

    for (let number = first; number <= last; number++) {
      if (number % 2 === 0) {
        evenNumbers.push(number)
        sum += number
        product *= BigInt(number)
      }
    }

    if (evenNumbers.length === 0) {
      setError('No hay números pares dentro del rango seleccionado.')
      return
    }

    setResult({
      evenNumbers,
      sum,
      product: product.toString(),
      count: evenNumbers.length,
      first,
      last,
    })
  }

  const reset = () => {
    setStart('20')
    setEnd('400')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={15}
      title="Suma y producto de pares del 20 al 400"
      statement="Calcular y visualizar la suma y el producto de los números pares comprendidos entre 20 y 400, ambos inclusive."
    >
      <div className="even-product-container">
        <div className="even-product-intro">
          <span className="even-product-icon">∑</span>
          <div>
            <h3>Calculadora de números pares</h3>
            <p>Selecciona el rango que deseas calcular.</p>
          </div>
        </div>

        <form onSubmit={calculate} className="even-product-form">
          <div className="even-product-inputs">
            <div className="even-product-field">
              <label htmlFor="start">Número inicial</label>
              <input
                id="start"
                type="number"
                min="20"
                max="400"
                step="1"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Ej. 20"
              />
            </div>

            <div className="even-product-separator">a</div>

            <div className="even-product-field">
              <label htmlFor="end">Número final</label>
              <input
                id="end"
                type="number"
                min="20"
                max="400"
                step="1"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                placeholder="Ej. 400"
              />
            </div>
          </div>

          <p className="even-product-hint">
            Puedes elegir cualquier rango entre 20 y 400.
          </p>

          {error && (
            <div className="even-product-error">
              {error}
            </div>
          )}

          <div className="even-product-actions">
            <button type="submit" className="even-product-button">
              Calcular resultados
            </button>

            <button
              type="button"
              className="even-product-reset"
              onClick={reset}
            >
              Restablecer
            </button>
          </div>
        </form>

        {result && (
          <div className="even-product-results">
            <div className="even-product-result-heading">
              <div>
                <span className="panel-label">RESULTADOS</span>
                <h3>Operaciones completadas</h3>
              </div>
              <span className="even-product-count">
                {result.count} números pares
              </span>
            </div>

            <div className="even-product-summary">
              <div className="even-product-card">
                <span>SUMA TOTAL</span>
                <strong>{result.sum.toLocaleString('es-DO')}</strong>
              </div>

              <div className="even-product-card">
                <span>PRODUCTO TOTAL</span>
                <strong className="even-product-big-number">
                  {result.product}
                </strong>
              </div>
            </div>

            <div className="even-product-range">
              Rango seleccionado: <strong>{result.first} – {result.last}</strong>
            </div>

            <details className="even-product-details">
              <summary>Ver números utilizados</summary>
              <div className="even-product-number-list">
                {result.evenNumbers.map((number) => (
                  <span key={number}>{number}</span>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
