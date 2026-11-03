
import { useState } from 'react'
import { Calculator, Sigma, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise06() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateSum = (event) => {
    event.preventDefault()

    if (number.trim() === '') {
      setError('Introduce el número N para realizar la suma.')
      setResult(null)
      return
    }

    const n = Number(number)

    if (!Number.isSafeInteger(n) || n < 1) {
      setError('Introduce un número natural mayor que cero.')
      setResult(null)
      return
    }

    let sum = 0
    const sequence = []

    for (let x = 1; x <= n; x++) {
      sum += x
      sequence.push(x)
    }

    setError('')
    setResult({
      number: n,
      sum,
      sequence,
    })
  }

  const resetCalculator = () => {
    setNumber('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={6}
      title="Suma de los primeros N naturales"
      statement="Calcular mediante un algoritmo repetitivo la suma de los N primeros números naturales."
    >
      <div className="natural-sum-calculator">
        <div className="natural-sum-intro">
          <div className="natural-sum-icon">
            <Sigma size={23} />
          </div>

          <div>
            <h3>Calculadora de números naturales</h3>
            <p>
              Introduce un número N para calcular la suma
              de todos los números naturales desde 1 hasta N.
            </p>
          </div>
        </div>

        <form onSubmit={calculateSum} className="natural-sum-form">
          <div className="natural-sum-field">
            <label htmlFor="natural-number">Número N</label>

            <div className="natural-sum-input-wrapper">
              <Sigma size={18} />

              <input
                id="natural-number"
                type="number"
                min="1"
                step="1"
                placeholder="Ej. 10"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <span>número</span>
            </div>
          </div>

          {error && <p className="natural-sum-error">{error}</p>}

          <div className="natural-sum-actions">
            <button type="submit" className="natural-sum-button">
              <Calculator size={17} />
              Calcular suma
            </button>

            <button
              type="button"
              className="natural-sum-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="natural-sum-result">
            <div className="natural-sum-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="natural-sum-success">Calculado</span>
            </div>

            <div className="natural-sum-summary">
              <p>Suma de los primeros {result.number} números naturales</p>
              <h2>{result.sum.toLocaleString('es-DO')}</h2>
              <span>Resultado de la suma</span>
            </div>

            <div className="natural-sum-breakdown">
              <h4>Desarrollo de la operación</h4>

              <div className="natural-sum-sequence">
                {result.sequence.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>

              <div className="natural-sum-operation">
                <span>Operación realizada</span>
                <strong>
                  {result.sequence.join(' + ')} = {result.sum.toLocaleString('es-DO')}
                </strong>
              </div>

              <div className="natural-sum-final">
                <span>Suma total</span>
                <strong>{result.sum.toLocaleString('es-DO')}</strong>
              </div>
            </div>

            <p className="natural-sum-note">
              La suma se obtiene mediante un ciclo repetitivo que
              recorre los números desde 1 hasta N y acumula sus valores.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
