
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise22() {
  const [number, setNumber] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [finished, setFinished] = useState(false)

  const formatNumber = (value) => {
    return Number(value.toFixed(6)).toString()
  }

  const processNumber = (e) => {
    e.preventDefault()

    if (number.trim() === '') {
      setError('Debes ingresar un número.')
      return
    }

    const value = Number(number)

    if (!Number.isFinite(value)) {
      setError('Ingresa un número válido.')
      return
    }

    setError('')

    // El cero termina el proceso
    if (value === 0) {
      setFinished(true)
      setNumber('')
      return
    }

    const newResult = {
      id: results.length + 1,
      number: value,
      cube: value ** 3,
      squareRoot: value >= 0 ? Math.sqrt(value) : null,
    }

    setResults((previous) => [...previous, newResult])
    setNumber('')
  }

  const reset = () => {
    setNumber('')
    setResults([])
    setError('')
    setFinished(false)
  }

  return (
    <ExercisePageLayout
      exerciseNumber={22}
      title="Cubo y raíz cuadrada repetitivos"
      statement="Imprimir el cubo y la raíz cuadrada de un número ingresado. El proceso es repetitivo y debe terminar cuando se ingrese el valor 0."
    >
      <div className="power-root-container">

        {/* INTRODUCCION */}

        <div className="power-root-intro">
          <div className="power-root-icon">x³</div>
          <div>
            <h3>Calculadora de cubos y raíces</h3>
            <p>Ingresa números para calcular su cubo y su raíz cuadrada.</p>
          </div>
        </div>

        {/* INDICADOR DEL PROCESO */}

        <div className={`power-root-status ${finished ? 'finished' : ''}`}>
          <span className="power-root-status-icon">
            {finished ? '✓' : '↻'}
          </span>

          <div>
            <strong>
              {finished ? 'Proceso finalizado' : 'Proceso en ejecución'}
            </strong>
            <p>
              {finished
                ? 'Se ingresó el valor 0 y el programa ha terminado.'
                : 'El programa seguirá funcionando hasta que ingreses 0.'}
            </p>
          </div>
        </div>

        {/* FORMULARIO */}

        {!finished && (
          <form onSubmit={processNumber} className="power-root-form">
            <div className="power-root-field">
              <label htmlFor="power-root-number">Número a evaluar</label>

              <input
                id="power-root-number"
                type="number"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Ej. 25"
              />
            </div>

            <p className="power-root-hint">
              Puedes ingresar números positivos o negativos. Ingresa 0 para finalizar.
            </p>

            {error && (
              <div className="power-root-error">
                {error}
              </div>
            )}

            <button type="submit" className="power-root-button">
              Procesar número
            </button>
          </form>
        )}

        {/* HISTORIAL */}

        {results.length > 0 && (
          <div className="power-root-history">
            <div className="power-root-history-heading">
              <div>
                <span>HISTORIAL</span>
                <h4>Resultados obtenidos</h4>
              </div>

              <span className="power-root-count">
                {results.length} {results.length === 1 ? 'número' : 'números'}
              </span>
            </div>

            {results.map((item) => (
              <div className="power-root-result" key={item.id}>
                <div className="power-root-result-heading">
                  <strong>Proceso #{item.id}</strong>
                  <span>Número: {formatNumber(item.number)}</span>
                </div>

                <div className="power-root-result-grid">
                  <div>
                    <span>Cubo (n³)</span>
                    <strong>{formatNumber(item.cube)}</strong>
                  </div>

                  <div>
                    <span>Raíz cuadrada (√n)</span>
                    <strong>
                      {item.squareRoot === null
                        ? 'No tiene raíz real'
                        : formatNumber(item.squareRoot)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FINALIZACION Y REINICIO */}

        {finished && (
          <div className="power-root-completed">
            <h4>Resumen del proceso</h4>
            <p>
              Se procesaron {results.length}{' '}
              {results.length === 1 ? 'número' : 'números'} antes de ingresar el 0.
            </p>

            <button
              type="button"
              className="power-root-reset"
              onClick={reset}
            >
              Comenzar nuevamente
            </button>
          </div>
        )}

        {!finished && results.length > 0 && (
          <button
            type="button"
            className="power-root-reset"
            onClick={reset}
          >
            Reiniciar proceso
          </button>
        )}

      </div>
    </ExercisePageLayout>
  )
}
