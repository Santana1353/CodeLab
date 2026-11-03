
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise26() {
  const [radius, setRadius] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatNumber = (value) => {
    return Number(value.toFixed(4)).toString()
  }

  const calculateValues = (e) => {
    e.preventDefault()

    if (radius.trim() === '') {
      setError('Debes ingresar el valor del radio.')
      setResult(null)
      return
    }

    const r = Number(radius)

    if (!Number.isFinite(r) || r <= 0) {
      setError('El radio debe ser un número positivo.')
      setResult(null)
      return
    }

    const circumference = 2 * Math.PI * r
    const circleArea = Math.PI * r ** 2
    const sphereVolume = (4 / 3) * Math.PI * r ** 3

    setResult({
      radius: r,
      circumference,
      circleArea,
      sphereVolume,
    })

    setError('')
  }

  const reset = () => {
    setRadius('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={26}
      title="Círculo y esfera"
      statement="Calcular la longitud de la circunferencia, el área del círculo y el volumen de la esfera para un radio ingresado por el teclado."
    >
      <div className="circle-sphere-container">

        {/* INTRODUCCION */}

        <div className="circle-sphere-intro">
          <div className="circle-sphere-icon">π</div>
          <div>
            <h3>Calculadora de círculo y esfera</h3>
            <p>Ingresa el radio para calcular sus tres propiedades.</p>
          </div>
        </div>

        {/* FORMULARIO */}

        <form className="circle-sphere-form" onSubmit={calculateValues}>
          <div className="circle-sphere-form-heading">
            <h4>Medida del radio</h4>
            <span>1 valor requerido</span>
          </div>

          <div className="circle-sphere-field">
            <label htmlFor="circle-sphere-radius">Radio</label>
            <input
              id="circle-sphere-radius"
              type="number"
              min="0"
              step="any"
              placeholder="Ej. 5"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
          </div>

          <div className="circle-sphere-formulas">
            <div>
              <span>Longitud de la circunferencia</span>
              <strong>L = 2πr</strong>
            </div>

            <div>
              <span>Área del círculo</span>
              <strong>A = πr²</strong>
            </div>

            <div>
              <span>Volumen de la esfera</span>
              <strong>V = ⁴⁄₃πr³</strong>
            </div>
          </div>

          {error && (
            <div className="circle-sphere-error">
              {error}
            </div>
          )}

          <div className="circle-sphere-actions">
            <button type="submit" className="circle-sphere-calculate">
              Calcular valores
            </button>

            <button
              type="button"
              className="circle-sphere-reset"
              onClick={reset}
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* RESULTADOS */}

        {result && (
          <div className="circle-sphere-results">
            <div className="circle-sphere-results-heading">
              <span>RESULTADOS</span>
              <h4>Valores calculados</h4>
              <p>Radio utilizado: {formatNumber(result.radius)}</p>
            </div>

            <div className="circle-sphere-result-grid">
              <div className="circle-sphere-result-card">
                <span>Longitud de la circunferencia</span>
                <strong>{formatNumber(result.circumference)}</strong>
                <small>Unidades</small>
              </div>

              <div className="circle-sphere-result-card">
                <span>Área del círculo</span>
                <strong>{formatNumber(result.circleArea)}</strong>
                <small>Unidades cuadradas</small>
              </div>

              <div className="circle-sphere-result-card">
                <span>Volumen de la esfera</span>
                <strong>{formatNumber(result.sphereVolume)}</strong>
                <small>Unidades cúbicas</small>
              </div>
            </div>

            <p className="circle-sphere-result-note">
              Los tres resultados se calcularon utilizando el valor de π con la precisión disponible en JavaScript.
            </p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
