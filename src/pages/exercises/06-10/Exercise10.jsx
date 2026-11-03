
import { useState } from 'react'
import { Calculator, Hash, RotateCcw, Sigma } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise10() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateSum = (event) => {
    event.preventDefault()

    if (number.trim() === '') {
      setError('Introduce un número para realizar el cálculo.')
      setResult(null)
      return
    }

    const value = Number(number)

    if (!Number.isSafeInteger(value)) {
      setError('Introduce un número entero válido.')
      setResult(null)
      return
    }

    const digits = Math.abs(value).toString().split('').map(Number)
    const sum = digits.reduce((total, digit) => total + digit, 0)

    setResult({
      original: value,
      digits,
      sum,
    })

    setError('')
  }

  const clearCalculator = () => {
    setNumber('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={10}
      title="Suma de los dígitos"
      statement="Dado un número, determinar la suma de sus dígitos."
    >
      <div className="digit-sum">

        <div className="digit-sum-intro">
          <div className="digit-sum-icon">
            <Hash size={22} />
          </div>

          <div>
            <h3>Calculadora de dígitos</h3>
            <p>
              Introduce un número entero para conocer la suma
              de todos sus dígitos.
            </p>
          </div>
        </div>

        <form onSubmit={calculateSum}>
          <div className="digit-sum-field">
            <label htmlFor="digit-number">Número entero</label>

            <div className="digit-sum-input">
              <Hash size={19} />

              <input
                id="digit-number"
                type="number"
                step="1"
                placeholder="Ej. 5832"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <span className="digit-sum-hint">
              Puedes introducir números positivos, negativos o cero.
            </span>
          </div>

          {error && (
            <p className="digit-sum-error">{error}</p>
          )}

          <div className="digit-sum-actions">
            <button type="submit" className="digit-sum-calculate">
              <Calculator size={17} />
              Calcular suma
            </button>

            <button
              type="button"
              className="digit-sum-reset"
              onClick={clearCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="digit-sum-result">

            <div className="digit-sum-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="digit-sum-success">Calculado</span>
            </div>

            <div className="digit-sum-main">
              <p>Suma de los dígitos</p>
              <h2>{result.sum}</h2>
              <span>
                Resultado obtenido a partir del número {result.original}
              </span>
            </div>

            <div className="digit-sum-breakdown">
              <h4>Desglose de la operación</h4>

              <div className="digit-sum-original">
                <span>Número ingresado</span>
                <strong>{result.original}</strong>
              </div>

              <div className="digit-sum-digits">
                <span>Dígitos identificados</span>

                <div className="digit-sum-pills">
                  {result.digits.map((digit, index) => (
                    <span key={index}>{digit}</span>
                  ))}
                </div>
              </div>

              <div className="digit-sum-operation">
                <span>Operación realizada</span>
                <strong>
                  {result.digits.join(' + ')} = {result.sum}
                </strong>
              </div>

              <div className="digit-sum-total">
                <span>Suma total</span>
                <strong>{result.sum}</strong>
              </div>
            </div>

            <p className="digit-sum-note">
              Cada dígito del número se suma individualmente
              para obtener el resultado final.
            </p>
          </div>
        )}

        {!result && !error && (
          <div className="digit-sum-empty">
            <Sigma size={27} />
            <p>El resultado aparecerá aquí después del cálculo.</p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
