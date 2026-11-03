
import { useState } from 'react'
import { Calculator, Users, RotateCcw, Plus } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise07() {
  const [workerCount, setWorkerCount] = useState('')
  const [workers, setWorkers] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const prepareWorkers = (event) => {
    event.preventDefault()

    const count = Number(workerCount)

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      setError('Introduce una cantidad de trabajadores entre 1 y 100.')
      return
    }

    setWorkers(
      Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        hours: '',
        rate: '',
      }))
    )

    setResult(null)
    setError('')
  }

  const updateWorker = (id, field, value) => {
    setWorkers((currentWorkers) =>
      currentWorkers.map((worker) =>
        worker.id === id ? { ...worker, [field]: value } : worker
      )
    )
    setResult(null)
    setError('')
  }

  const calculateSalaries = (event) => {
    event.preventDefault()

    const invalidWorker = workers.find(
      (worker) =>
        worker.hours.trim() === '' ||
        worker.rate.trim() === '' ||
        !Number.isFinite(Number(worker.hours)) ||
        !Number.isFinite(Number(worker.rate)) ||
        Number(worker.hours) < 0 ||
        Number(worker.rate) < 0
    )

    if (invalidWorker) {
      setError('Completa correctamente las horas y la tarifa de todos los trabajadores.')
      setResult(null)
      return
    }

    const calculatedWorkers = workers.map((worker) => {
      const hours = Number(worker.hours)
      const rate = Number(worker.rate)
      const normalHours = Math.min(hours, 40)
      const overtimeHours = Math.max(hours - 40, 0)
      const overtimeRate = rate * 1.5
      const normalSalary = normalHours * rate
      const overtimeSalary = overtimeHours * overtimeRate
      const salary = normalSalary + overtimeSalary

      return {
        ...worker,
        hours,
        rate,
        normalHours,
        overtimeHours,
        overtimeRate,
        normalSalary,
        overtimeSalary,
        salary,
      }
    })

    const totalSalary = calculatedWorkers.reduce(
      (total, worker) => total + worker.salary,
      0
    )

    setResult({
      workers: calculatedWorkers,
      totalSalary,
    })

    setError('')
  }

  const resetCalculator = () => {
    setWorkerCount('')
    setWorkers([])
    setResult(null)
    setError('')
  }

  const formatMoney = (value) =>
    `RD$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  return (
    <ExercisePageLayout
      exerciseNumber={7}
      title="Suma de salarios de trabajadores"
      statement="Modificar el ejercicio 1 para obtener la suma de los salarios de todos los trabajadores."
    >
      <div className="salary-group-calculator">
        <div className="salary-group-intro">
          <div className="salary-group-icon">
            <Users size={22} />
          </div>
          <div>
            <h3>Calculadora de salarios</h3>
            <p>
              Registra los trabajadores, calcula sus salarios
              y obtén el total a pagar.
            </p>
          </div>
        </div>

        <form onSubmit={prepareWorkers} className="salary-group-form">
          <div className="salary-group-field">
            <label htmlFor="worker-count">Cantidad de trabajadores</label>

            <div className="salary-group-input">
              <Users size={18} />
              <input
                id="worker-count"
                type="number"
                min="1"
                max="100"
                step="1"
                placeholder="Ej. 3"
                value={workerCount}
                onChange={(e) => setWorkerCount(e.target.value)}
              />
              <span>trabajadores</span>
            </div>
          </div>

          <div className="salary-group-actions">
            <button type="submit" className="salary-group-button">
              <Plus size={17} />
              Registrar trabajadores
            </button>

            <button
              type="button"
              className="salary-group-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {workers.length > 0 && (
          <form onSubmit={calculateSalaries} className="salary-workers-form">
            <div className="salary-workers-heading">
              <div>
                <h4>Datos de los trabajadores</h4>
                <p>
                  Completa las horas trabajadas y la tarifa por hora
                  de cada trabajador.
                </p>
              </div>
              <span>{workers.length} registrados</span>
            </div>

            <div className="salary-workers-list">
              {workers.map((worker) => (
                <div className="salary-worker-card" key={worker.id}>
                  <div className="salary-worker-title">
                    <span>Trabajador {worker.id}</span>
                  </div>

                  <div className="salary-worker-fields">
                    <div className="salary-group-field">
                      <label htmlFor={`hours-${worker.id}`}>
                        Horas trabajadas
                      </label>
                      <div className="salary-group-input">
                        <input
                          id={`hours-${worker.id}`}
                          type="number"
                          min="0"
                          step="any"
                          placeholder="Ej. 45"
                          value={worker.hours}
                          onChange={(e) =>
                            updateWorker(worker.id, 'hours', e.target.value)
                          }
                        />
                        <span>horas</span>
                      </div>
                    </div>

                    <div className="salary-group-field">
                      <label htmlFor={`rate-${worker.id}`}>
                        Tarifa por hora
                      </label>
                      <div className="salary-group-input">
                        <span>RD$</span>
                        <input
                          id={`rate-${worker.id}`}
                          type="number"
                          min="0"
                          step="any"
                          placeholder="Ej. 100"
                          value={worker.rate}
                          onChange={(e) =>
                            updateWorker(worker.id, 'rate', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="salary-group-error">{error}</p>}

            <button type="submit" className="salary-group-button">
              <Calculator size={17} />
              Calcular salarios
            </button>
          </form>
        )}

        {result && (
          <div className="salary-group-result">
            <div className="salary-group-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="salary-group-success">Calculado</span>
            </div>

            <div className="salary-group-summary">
              <p>Suma de los salarios de todos los trabajadores</p>
              <h2>{formatMoney(result.totalSalary)}</h2>
              <span>
                {result.workers.length} trabajadores procesados
              </span>
            </div>

            <div className="salary-group-breakdown">
              <h4>Desglose por trabajador</h4>

              {result.workers.map((worker) => (
                <div className="salary-worker-result" key={worker.id}>
                  <div className="salary-worker-result-heading">
                    <strong>Trabajador {worker.id}</strong>
                    <strong>{formatMoney(worker.salary)}</strong>
                  </div>

                  <div className="salary-worker-result-details">
                    <span>
                      Horas normales: {worker.normalHours} × {formatMoney(worker.rate)}
                    </span>
                    <span>
                      Horas extras: {worker.overtimeHours} × {formatMoney(worker.overtimeRate)}
                    </span>
                  </div>

                  <div className="salary-worker-result-details">
                    <span>Pago normal</span>
                    <strong>{formatMoney(worker.normalSalary)}</strong>
                  </div>

                  <div className="salary-worker-result-details">
                    <span>Pago de horas extras</span>
                    <strong>{formatMoney(worker.overtimeSalary)}</strong>
                  </div>
                </div>
              ))}

              <div className="salary-group-total">
                <span>Total de salarios</span>
                <strong>{formatMoney(result.totalSalary)}</strong>
              </div>
            </div>

            <p className="salary-group-note">
              Las primeras 40 horas se pagan a la tarifa normal.
              Las horas adicionales reciben un incremento del 50 %.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
