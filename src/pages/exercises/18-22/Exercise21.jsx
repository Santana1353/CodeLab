
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise21() {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [processes, setProcesses] = useState([])
  const [error, setError] = useState('')

  const completed = processes.length
  const limit = 10
  const finished = completed === limit

  const calculate = (e) => {
    e.preventDefault()

    if (finished) return

    if (number1.trim() === '' || number2.trim() === '') {
      setError('Debes ingresar los dos números.')
      return
    }

    const a = Number(number1)
    const b = Number(number2)

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setError('Ingresa valores numéricos válidos.')
      return
    }

    const newProcess = {
      id: completed + 1,
      a,
      b,
      sum: a + b,
      subtraction: a - b,
      multiplication: a * b,
      division: b !== 0 ? a / b : null,
    }

    setProcesses((previous) => [...previous, newProcess])
    setNumber1('')
    setNumber2('')
    setError('')
  }

  const reset = () => {
    setNumber1('')
    setNumber2('')
    setProcesses([])
    setError('')
  }

  const formatNumber = (value) => {
    if (value === null) return 'No se puede dividir entre cero'
    return Number(value.toFixed(6)).toString()
  }

  return (
    <ExercisePageLayout
      exerciseNumber={21}
      title="Operaciones repetidas 10 veces"
      statement="Ingresar 2 números y calcular la suma, resta, multiplicación y división. El proceso debe terminar cuando se hayan realizado 10 procesos (hacer uso de contadores)."
    >
      <div className="operations-container">

        <div className="operations-intro">
          <div className="operations-icon">10×</div>
          <div>
            <h3>Calculadora de operaciones</h3>
            <p>Realiza cuatro operaciones con dos números durante 10 procesos.</p>
          </div>
        </div>

        {/* CONTADOR */}

        <div className="operations-progress">
          <div className="operations-progress-heading">
            <span>PROGRESO DE LOS PROCESOS</span>
            <strong>{completed} de {limit}</strong>
          </div>

          <div className="operations-progress-track">
            <div
              className="operations-progress-fill"
              style={{ width: `${completed * 10}%` }}
            />
          </div>

          <p>
            {finished
              ? '¡Has completado los 10 procesos!'
              : `Faltan ${limit - completed} procesos por realizar.`}
          </p>
        </div>

        {/* FORMULARIO */}

        {!finished && (
          <form onSubmit={calculate} className="operations-form">
            <div className="operations-form-heading">
              <h4>Proceso #{completed + 1}</h4>
              <span>{limit - completed} disponibles</span>
            </div>

            <div className="operations-fields">
              <div className="operations-field">
                <label htmlFor="operation-number1">Primer número</label>
                <input
                  id="operation-number1"
                  type="number"
                  step="any"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                  placeholder="Ej. 20"
                />
              </div>

              <div className="operations-field">
                <label htmlFor="operation-number2">Segundo número</label>
                <input
                  id="operation-number2"
                  type="number"
                  step="any"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  placeholder="Ej. 5"
                />
              </div>
            </div>

            {error && (
              <div className="operations-error">
                {error}
              </div>
            )}

            <button type="submit" className="operations-calculate">
              Calcular operaciones
            </button>
          </form>
        )}

        {/* MENSAJE DE FINALIZACION */}

        {finished && (
          <div className="operations-completed">
            <span className="operations-completed-icon">✓</span>
            <div>
              <h3>¡Proceso completado!</h3>
              <p>
                Se realizaron correctamente los 10 procesos solicitados.
              </p>
            </div>
            <button
              type="button"
              className="operations-reset"
              onClick={reset}
            >
              Comenzar nuevamente
            </button>
          </div>
        )}

        {/* HISTORIAL DE RESULTADOS */}

        {processes.length > 0 && (
          <div className="operations-history">
            <div className="operations-history-heading">
              <div>
                <span>HISTORIAL</span>
                <h4>Resultados de los procesos</h4>
              </div>
              <span className="operations-count">
                {completed} {completed === 1 ? 'proceso' : 'procesos'}
              </span>
            </div>

            {processes.map((process) => (
              <div className="operations-process" key={process.id}>
                <div className="operations-process-heading">
                  <strong>Proceso #{process.id}</strong>
                  <span>
                    {formatNumber(process.a)} y {formatNumber(process.b)}
                  </span>
                </div>

                <div className="operations-results">
                  <div>
                    <span>Suma</span>
                    <strong>{formatNumber(process.sum)}</strong>
                  </div>

                  <div>
                    <span>Resta</span>
                    <strong>{formatNumber(process.subtraction)}</strong>
                  </div>

                  <div>
                    <span>Multiplicación</span>
                    <strong>{formatNumber(process.multiplication)}</strong>
                  </div>

                  <div>
                    <span>División</span>
                    <strong className={process.division === null ? 'division-error' : ''}>
                      {formatNumber(process.division)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REINICIAR */}

        {!finished && completed > 0 && (
          <button
            type="button"
            className="operations-reset"
            onClick={reset}
          >
            Reiniciar todos los procesos
          </button>
        )}

      </div>
    </ExercisePageLayout>
  )
}
