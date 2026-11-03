
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise24() {
  const [sideA, setSideA] = useState('')
  const [sideB, setSideB] = useState('')
  const [sideC, setSideC] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateArea = (e) => {
    e.preventDefault()

    if (sideA.trim() === '' || sideB.trim() === '' || sideC.trim() === '') {
      setError('Debes ingresar los tres lados del triángulo.')
      setResult(null)
      return
    }

    const a = Number(sideA)
    const b = Number(sideB)
    const c = Number(sideC)

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(c) ||
      a <= 0 ||
      b <= 0 ||
      c <= 0
    ) {
      setError('Los lados deben ser números positivos.')
      setResult(null)
      return
    }

    // Comprobar que los lados formen un triángulo
    if (a + b <= c || a + c <= b || b + c <= a) {
      setError('Estos valores no forman un triángulo válido.')
      setResult(null)
      return
    }

    // Fórmula de Herón
    const semiPerimeter = (a + b + c) / 2

    const area = Math.sqrt(
      semiPerimeter *
      (semiPerimeter - a) *
      (semiPerimeter - b) *
      (semiPerimeter - c)
    )

    setResult({
      a,
      b,
      c,
      semiPerimeter,
      area,
    })

    setError('')
  }

  const reset = () => {
    setSideA('')
    setSideB('')
    setSideC('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={24}
      title="Área de un triángulo"
      statement="Calcular el área de un triángulo cualquiera donde los valores de los lados son ingresados por el teclado."
    >
      <div className="triangle-container">

        {/* INTRODUCCION */}

        <div className="triangle-intro">
          <div className="triangle-icon">△</div>
          <div>
            <h3>Calculadora de área</h3>
            <p>Ingresa las medidas de los tres lados del triángulo.</p>
          </div>
        </div>

        {/* FORMULARIO */}

        <form className="triangle-form" onSubmit={calculateArea}>
          <div className="triangle-form-heading">
            <h4>Medidas del triángulo</h4>
            <span>3 lados requeridos</span>
          </div>

          <div className="triangle-fields">
            <div className="triangle-field">
              <label htmlFor="triangle-a">Lado A</label>
              <input
                id="triangle-a"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 5"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
              />
            </div>

            <div className="triangle-field">
              <label htmlFor="triangle-b">Lado B</label>
              <input
                id="triangle-b"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 6"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
              />
            </div>

            <div className="triangle-field">
              <label htmlFor="triangle-c">Lado C</label>
              <input
                id="triangle-c"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 7"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
              />
            </div>
          </div>

          <div className="triangle-formula">
            <span>Fórmula de Herón</span>
            <strong>A = √[s(s − a)(s − b)(s − c)]</strong>
            <p>s = (a + b + c) / 2</p>
          </div>

          {error && (
            <div className="triangle-error">
              {error}
            </div>
          )}

          <div className="triangle-actions">
            <button type="submit" className="triangle-calculate">
              Calcular área
            </button>

            <button
              type="button"
              className="triangle-reset"
              onClick={reset}
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* RESULTADO */}

        {result && (
          <div className="triangle-result">
            <div className="triangle-result-heading">
              <span>RESULTADO</span>
              <h4>Área del triángulo</h4>
            </div>

            <div className="triangle-result-value">
              <strong>{result.area.toFixed(4)}</strong>
              <span>unidades cuadradas</span>
            </div>

            <div className="triangle-details">
              <div>
                <span>Lado A</span>
                <strong>{result.a}</strong>
              </div>

              <div>
                <span>Lado B</span>
                <strong>{result.b}</strong>
              </div>

              <div>
                <span>Lado C</span>
                <strong>{result.c}</strong>
              </div>

              <div>
                <span>Semiperímetro</span>
                <strong>{result.semiPerimeter.toFixed(2)}</strong>
              </div>
            </div>

            <p className="triangle-result-note">
              El área se calculó correctamente utilizando la fórmula de Herón.
            </p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
