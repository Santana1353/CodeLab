
import { useState } from 'react'
import {
  Calculator,
  Hash,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise13() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateFactorial = () => {
    if (number.trim() === '') {
      setError('Introduce un número para calcular su factorial.')
      setResult(null)
      return
    }

    if (!/^\d+$/.test(number.trim())) {
      setError('Introduce un número entero no negativo.')
      setResult(null)
      return
    }

    const value = Number(number)

    if (!Number.isSafeInteger(value) || value > 500) {
      setError('Introduce un número entre 0 y 500.')
      setResult(null)
      return
    }

    let factorial = 1n

    for (let i = 1n; i <= BigInt(value); i++) {
      factorial *= i
    }

    const calculation = value === 0
      ? '0! = 1'
      : `${value}! = ${Array.from(
          { length: value },
          (_, index) => value - index
        ).join(' × ')} = ${factorial.toString()}`

    setResult({
      number: value,
      factorial: factorial.toString(),
      calculation,
    })

    setError('')
  }

  const clearAll = () => {
    setNumber('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={13}
      title="Factorial de un número"
      statement="Desarrollar un algoritmo para calcular e imprimir el factorial de un número."
    >
      <div className="factorial-exercise">

        <div className="factorial-intro">
          <div className="factorial-icon">
            <Calculator size={22} />
          </div>

          <div>
            <h3>Calculadora de factorial</h3>
            <p>
              Introduce un número entero no negativo para
              conocer su factorial.
            </p>
          </div>
        </div>

        <div className="factorial-definition">
          <strong>¿Qué es el factorial?</strong>
          <p>
            El factorial de un número es el resultado de
            multiplicar ese número por todos los enteros
            positivos menores que él hasta llegar a 1.
          </p>
          <span>Ejemplo: 4! = 4 × 3 × 2 × 1 = 24</span>
        </div>

        <div className="factorial-field">
          <label htmlFor="factorial-number">Número</label>

          <div className="factorial-input">
            <Hash size={18} />

            <input
              id="factorial-number"
              type="number"
              min="0"
              max="500"
              step="1"
              placeholder="Ej. 5"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value)
                setResult(null)
                setError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') calculateFactorial()
              }}
            />

            <span>Entero ≥ 0</span>
          </div>

          <small>Se permiten números desde 0 hasta 500.</small>
        </div>

        {error && (
          <p className="factorial-error">{error}</p>
        )}

        <div className="factorial-actions">
          <button
            type="button"
            className="factorial-calculate"
            onClick={calculateFactorial}
          >
            <Calculator size={17} />
            Calcular factorial
          </button>

          <button
            type="button"
            className="factorial-reset"
            onClick={clearAll}
          >
            <RotateCcw size={16} />
            Limpiar
          </button>
        </div>

        {result && (
          <div className="factorial-result">

            <div className="factorial-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>

              <span className="factorial-success">
                <CheckCircle2 size={13} />
                Calculado
              </span>
            </div>

            <div className="factorial-main-result">
              <p>Factorial de {result.number}</p>
              <h2>{BigInt(result.factorial).toLocaleString('es-DO')}</h2>
            </div>

            <div className="factorial-breakdown">
              <h4>Desarrollo de la operación</h4>

              <div className="factorial-equation">
                {result.calculation}
              </div>
            </div>

            <div className="factorial-summary">
              <span>Número ingresado</span>
              <strong>{result.number}</strong>

              <span>Resultado factorial</span>
              <strong>
                {BigInt(result.factorial).toLocaleString('es-DO')}
              </strong>
            </div>

            <p className="factorial-note">
              El cálculo se realizó multiplicando los números
              enteros desde 1 hasta {result.number}.
              {result.number === 0 && ' Por definición, el factorial de cero es 1.'}
            </p>

          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
