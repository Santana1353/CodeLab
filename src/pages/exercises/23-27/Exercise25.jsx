
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise25() {
  const [cathetusA, setCathetusA] = useState('')
  const [cathetusB, setCathetusB] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatNumber = (value) => {
    return Number(value.toFixed(4)).toString()
  }

  const calculateHypotenuse = (e) => {
    e.preventDefault()

    if (cathetusA.trim() === '' || cathetusB.trim() === '') {
      setError('Debes ingresar las medidas de los dos catetos.')
      setResult(null)
      return
    }

    const a = Number(cathetusA)
    const b = Number(cathetusB)

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      a <= 0 ||
      b <= 0
    ) {
      setError('Los catetos deben ser números positivos.')
      setResult(null)
      return
    }

    const hypotenuse = Math.sqrt(a ** 2 + b ** 2)

    setResult({
      a,
      b,
      hypotenuse,
    })

    setError('')
  }

  const reset = () => {
    setCathetusA('')
    setCathetusB('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={25}
      title="Hipotenusa de un triángulo"
      statement="Calcular el valor de la hipotenusa de un triángulo rectángulo, ingresando por el teclado sus catetos (Teorema de Pitágoras)."
    >
      <div className="hypotenuse-container">

        {/* INTRODUCCION */}

        <div className="hypotenuse-intro">
          <div className="hypotenuse-icon">△</div>
          <div>
            <h3>Calculadora de hipotenusa</h3>
            <p>Ingresa las medidas de los dos catetos del triángulo rectángulo.</p>
          </div>
        </div>

        {/* FORMULARIO */}

        <form className="hypotenuse-form" onSubmit={calculateHypotenuse}>
          <div className="hypotenuse-form-heading">
            <h4>Medidas del triángulo</h4>
            <span>2 catetos requeridos</span>
          </div>

          <div className="hypotenuse-fields">
            <div className="hypotenuse-field">
              <label htmlFor="hypotenuse-a">Cateto A</label>
              <input
                id="hypotenuse-a"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 3"
                value={cathetusA}
                onChange={(e) => setCathetusA(e.target.value)}
              />
            </div>

            <div className="hypotenuse-field">
              <label htmlFor="hypotenuse-b">Cateto B</label>
              <input
                id="hypotenuse-b"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 4"
                value={cathetusB}
                onChange={(e) => setCathetusB(e.target.value)}
              />
            </div>
          </div>

          <div className="hypotenuse-formula">
            <span>Teorema de Pitágoras</span>
            <strong>h = √(a² + b²)</strong>
            <p>La hipotenusa es el lado más largo del triángulo rectángulo.</p>
          </div>

          {error && (
            <div className="hypotenuse-error">
              {error}
            </div>
          )}

          <div className="hypotenuse-actions">
            <button type="submit" className="hypotenuse-calculate">
              Calcular hipotenusa
            </button>

            <button
              type="button"
              className="hypotenuse-reset"
              onClick={reset}
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* RESULTADO */}

        {result && (
          <div className="hypotenuse-result">
            <div className="hypotenuse-result-heading">
              <span>RESULTADO</span>
              <h4>Valor de la hipotenusa</h4>
            </div>

            <div className="hypotenuse-result-value">
              <strong>{formatNumber(result.hypotenuse)}</strong>
              <span>unidades</span>
            </div>

            <div className="hypotenuse-details">
              <div>
                <span>Cateto A</span>
                <strong>{formatNumber(result.a)}</strong>
              </div>

              <div>
                <span>Cateto B</span>
                <strong>{formatNumber(result.b)}</strong>
              </div>

              <div>
                <span>Hipotenusa</span>
                <strong>{formatNumber(result.hypotenuse)}</strong>
              </div>
            </div>

            <p className="hypotenuse-result-note">
              El cálculo se realizó correctamente aplicando el Teorema de Pitágoras.
            </p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
