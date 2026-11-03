
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const formatNumber = (number) => {
  if (Math.abs(number) < 1e-10) return '0'
  return Number(number.toFixed(6)).toString()
}

export default function Exercise20() {
  const [a, setA] = useState('1')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = (e) => {
    e.preventDefault()

    if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
      setError('Debes completar los tres coeficientes.')
      setResult(null)
      return
    }

    const A = Number(a)
    const B = Number(b)
    const C = Number(c)

    if (![A, B, C].every(Number.isFinite)) {
      setError('Ingresa valores numéricos válidos.')
      setResult(null)
      return
    }

    if (A === 0) {
      setError('El coeficiente a no puede ser cero. La ecuación dejaría de ser cuadrática.')
      setResult(null)
      return
    }

    const discriminant = B ** 2 - 4 * A * C
    const denominator = 2 * A

    let solutions

    if (discriminant > 0) {
      const squareRoot = Math.sqrt(discriminant)

      solutions = {
        type: 'two-real',
        x1: formatNumber((-B + squareRoot) / denominator),
        x2: formatNumber((-B - squareRoot) / denominator),
      }
    } else if (Math.abs(discriminant) < 1e-10) {
      solutions = {
        type: 'one-real',
        x: formatNumber(-B / denominator),
      }
    } else {
      const realPart = -B / denominator
      const imaginaryPart = Math.sqrt(-discriminant) / Math.abs(denominator)

      solutions = {
        type: 'complex',
        real: formatNumber(realPart),
        imaginary: formatNumber(imaginaryPart),
      }
    }

    setResult({
      a: A,
      b: B,
      c: C,
      discriminant: formatNumber(discriminant),
      ...solutions,
    })

    setError('')
  }

  const reset = () => {
    setA('1')
    setB('')
    setC('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={20}
      title="Ecuación cuadrática"
      statement="Elaborar un programa que calcule las soluciones de la ecuación cuadrática, incluyendo las soluciones imaginarias."
    >
      <div className="quadratic-container">

        <div className="quadratic-intro">
          <div className="quadratic-icon">x²</div>
          <div>
            <h3>Calculadora de ecuaciones cuadráticas</h3>
            <p>Introduce los coeficientes para encontrar las soluciones.</p>
          </div>
        </div>

        <div className="quadratic-equation">
          <span>Forma general de la ecuación</span>
          <strong>ax² + bx + c = 0</strong>
        </div>

        <form onSubmit={calculate} className="quadratic-form">
          <div className="quadratic-fields">
            <div className="quadratic-field">
              <label htmlFor="coefficient-a">Coeficiente a</label>
              <input
                id="coefficient-a"
                type="number"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Ej. 1"
              />
            </div>

            <div className="quadratic-field">
              <label htmlFor="coefficient-b">Coeficiente b</label>
              <input
                id="coefficient-b"
                type="number"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Ej. -5"
              />
            </div>

            <div className="quadratic-field">
              <label htmlFor="coefficient-c">Coeficiente c</label>
              <input
                id="coefficient-c"
                type="number"
                step="any"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="Ej. 6"
              />
            </div>
          </div>

          <p className="quadratic-hint">
            El coeficiente a debe ser diferente de cero.
          </p>

          {error && (
            <div className="quadratic-error">
              {error}
            </div>
          )}

          <div className="quadratic-actions">
            <button type="submit" className="quadratic-calculate">
              Calcular soluciones
            </button>

            <button
              type="button"
              className="quadratic-reset"
              onClick={reset}
            >
              Restablecer
            </button>
          </div>
        </form>

        {result && (
          <div className="quadratic-result">
            <div className="quadratic-result-heading">
              <span>RESULTADOS DEL CÁLCULO</span>

              <span className={`quadratic-status ${result.type}`}>
                {result.type === 'two-real'
                  ? 'Dos soluciones reales'
                  : result.type === 'one-real'
                    ? 'Una solución real doble'
                    : 'Soluciones imaginarias'}
              </span>
            </div>

            <div className="quadratic-discriminant">
              <span>Discriminante (Δ)</span>
              <strong>{result.discriminant}</strong>
              <small>
                Δ = b² - 4ac
              </small>
            </div>

            <div className="quadratic-solutions">
              <h4>Soluciones de la ecuación</h4>

              {result.type === 'two-real' && (
                <div className="quadratic-solution-grid">
                  <div className="quadratic-solution-card">
                    <span>Primera solución (x₁)</span>
                    <strong>{result.x1}</strong>
                  </div>

                  <div className="quadratic-solution-card">
                    <span>Segunda solución (x₂)</span>
                    <strong>{result.x2}</strong>
                  </div>
                </div>
              )}

              {result.type === 'one-real' && (
                <div className="quadratic-solution-card single">
                  <span>Solución doble (x₁ = x₂)</span>
                  <strong>{result.x}</strong>
                </div>
              )}

              {result.type === 'complex' && (
                <div className="quadratic-solution-grid">
                  <div className="quadratic-solution-card">
                    <span>Primera solución (x₁)</span>
                    <strong>
                      {result.real} + {result.imaginary}i
                    </strong>
                  </div>

                  <div className="quadratic-solution-card">
                    <span>Segunda solución (x₂)</span>
                    <strong>
                      {result.real} - {result.imaginary}i
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="quadratic-equation-used">
              <span>Ecuación evaluada</span>
              <strong>
                {result.a}x² {result.b < 0 ? '- ' : '+ '}
                {Math.abs(result.b)}x {result.c < 0 ? '- ' : '+ '}
                {Math.abs(result.c)} = 0
              </strong>
            </div>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
