
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise23() {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [finished, setFinished] = useState(false)

  const formatNumber = (value) => {
    if (value === null) return 'No se puede dividir entre cero'
    return Number(value.toFixed(6)).toString()
  }

  const processNumbers = (e) => {
    e.preventDefault()

    if (number1.trim() === '') {
      setError('Debes ingresar el primer número.')
      return
    }

    const a = Number(number1)

    if (!Number.isFinite(a)) {
      setError('Ingresa un primer número válido.')
      return
    }

    // El primer número igual a cero termina el proceso
    if (a === 0) {
      setFinished(true)
      setNumber1('')
      setNumber2('')
      setError('')
      return
    }

    if (number2.trim() === '') {
      setError('Debes ingresar el segundo número.')
      return
    }

    const b = Number(number2)

    if (!Number.isFinite(b)) {
      setError('Ingresa un segundo número válido.')
      return
    }

    const newResult = {
      id: results.length + 1,
      a,
      b,
      sum: a + b,
      difference: a - b,
      product: a * b,
      division: b !== 0 ? a / b : null,
    }

    setResults((previous) => [...previous, newResult])
    setNumber1('')
    setNumber2('')
    setError('')
  }

  const reset = () => {
    setNumber1('')
    setNumber2('')
    setResults([])
    setError('')
    setFinished(false)
  }

  return (
    <ExercisePageLayout
      exerciseNumber={23}
      title="Operaciones hasta ingresar cero"
      statement="Ingresados dos números, calcular la suma, diferencia, producto y división. El proceso debe finalizar al ingresar el primer número igual a cero."
    >
      <div className="zero-operations-container">

        {/* INTRODUCCION */}

        <div className="zero-operations-intro">
          <div className="zero-operations-icon">0</div>
          <div>
            <h3>Calculadora de operaciones</h3>
            <p>Ingresa dos números para realizar las cuatro operaciones.</p>
          </div>
        </div>

        {/* ESTADO DEL PROCESO */}

        <div className={`zero-operations-status ${finished ? 'finished' : ''}`}>
          <span className="zero-operations-status-icon">
            {finished ? '✓' : '↻'}
          </span>

          <div>
            <strong>
              {finished ? 'Proceso finalizado' : 'Proceso en ejecución'}
            </strong>
            <p>
              {finished
                ? 'Se ingresó 0 como primer número y el programa ha terminado.'
                : 'El proceso continuará hasta que el primer número sea 0.'}
            </p>
          </div>
        </div>

        {/* FORMULARIO */}

        {!finished && (
          <form onSubmit={processNumbers} className="zero-operations-form">
            <div className="zero-operations-form-heading">
              <h4>Nuevo proceso</h4>
              <span>Proceso #{results.length + 1}</span>
            </div>

            <div className="zero-operations-fields">
              <div className="zero-operations-field">
                <label htmlFor="zero-operation-number1">
                  Primer número
                </label>
                <input
                  id="zero-operation-number1"
                  type="number"
                  step="any"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                  placeholder="Ej. 20"
                />
              </div>

              <div className="zero-operations-field">
                <label htmlFor="zero-operation-number2">
                  Segundo número
                </label>
                <input
                  id="zero-operation-number2"
                  type="number"
                  step="any"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  placeholder="Ej. 5"
                  disabled={number1.trim() !== '' && Number(number1) === 0}
                />
              </div>
            </div>

            <p className="zero-operations-hint">
              Ingresa 0 en el primer campo para finalizar el proceso.
              No necesitas completar el segundo número para salir.
            </p>

            {error && (
              <div className="zero-operations-error">
                {error}
              </div>
            )}

            <button type="submit" className="zero-operations-calculate">
              Procesar números
            </button>
          </form>
        )}

        {/* HISTORIAL */}

        {results.length > 0 && (
          <div className="zero-operations-history">
            <div className="zero-operations-history-heading">
              <div>
                <span>HISTORIAL</span>
                <h4>Resultados obtenidos</h4>
              </div>

              <span className="zero-operations-count">
                {results.length} {results.length === 1 ? 'proceso' : 'procesos'}
              </span>
            </div>

            {results.map((item) => (
              <div className="zero-operations-result" key={item.id}>
                <div className="zero-operations-result-heading">
                  <strong>Proceso #{item.id}</strong>
                  <span>
                    {formatNumber(item.a)} y {formatNumber(item.b)}
                  </span>
                </div>

                <div className="zero-operations-result-grid">
                  <div>
                    <span>Suma</span>
                    <strong>{formatNumber(item.sum)}</strong>
                  </div>

                  <div>
                    <span>Diferencia</span>
                    <strong>{formatNumber(item.difference)}</strong>
                  </div>

                  <div>
                    <span>Producto</span>
                    <strong>{formatNumber(item.product)}</strong>
                  </div>

                  <div>
                    <span>División</span>
                    <strong className={item.division === null ? 'division-error' : ''}>
                      {formatNumber(item.division)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FINALIZACION */}

        {finished && (
          <div className="zero-operations-completed">
            <h4>Resumen del proceso</h4>
            <p>
              Se realizaron {results.length}{' '}
              {results.length === 1 ? 'proceso' : 'procesos'} antes de ingresar el 0.
            </p>

            <button
              type="button"
              className="zero-operations-reset"
              onClick={reset}
            >
              Comenzar nuevamente
            </button>
          </div>
        )}

        {!finished && results.length > 0 && (
          <button
            type="button"
            className="zero-operations-reset"
            onClick={reset}
          >
            Reiniciar proceso
          </button>
        )}

      </div>
    </ExercisePageLayout>
  )
}
