
import { useState } from 'react'
import { Calculator, Clock, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise08() {
  const [hours, setHours] = useState('')
  const [rate, setRate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateSalary = (event) => {
    event.preventDefault()

    if (hours.trim() === '' || rate.trim() === '') {
      setError('Completa las horas trabajadas y la tarifa por hora.')
      setResult(null)
      return
    }

    const workedHours = Number(hours)
    const hourlyRate = Number(rate)

    if (
      !Number.isFinite(workedHours) ||
      !Number.isFinite(hourlyRate) ||
      workedHours < 0 ||
      hourlyRate < 0
    ) {
      setError('Los valores no pueden ser negativos.')
      setResult(null)
      return
    }

    const salary = workedHours * hourlyRate

    setResult({
      hours: workedHours,
      rate: hourlyRate,
      salary,
    })

    setError('')
  }

  const resetCalculator = () => {
    setHours('')
    setRate('')
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
      exerciseNumber={8}
      title="Cálculo de salario"
      statement="Dadas las horas trabajadas de una persona y la tarifa de pago, calcular su salario e imprimirlo."
    >
      <div className="simple-salary-calculator">
        <div className="simple-salary-intro">
          <div className="simple-salary-icon">
            <Calculator size={22} />
          </div>

          <div>
            <h3>Calculadora de salario</h3>
            <p>
              Introduce las horas trabajadas y el pago por hora
              para calcular el salario correspondiente.
            </p>
          </div>
        </div>

        <form onSubmit={calculateSalary} className="simple-salary-form">
          <div className="simple-salary-fields">
            <div className="simple-salary-field">
              <label htmlFor="worked-hours">Horas trabajadas</label>

              <div className="simple-salary-input">
                <Clock size={18} />

                <input
                  id="worked-hours"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Ej. 40"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />

                <span>horas</span>
              </div>
            </div>

            <div className="simple-salary-field">
              <label htmlFor="hourly-rate">Tarifa por hora</label>

              <div className="simple-salary-input">
                <span>RD$</span>

                <input
                  id="hourly-rate"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Ej. 100"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && <p className="simple-salary-error">{error}</p>}

          <div className="simple-salary-actions">
            <button type="submit" className="simple-salary-button">
              <Calculator size={17} />
              Calcular salario
            </button>

            <button
              type="button"
              className="simple-salary-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="simple-salary-result">
            <div className="simple-salary-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="simple-salary-success">Calculado</span>
            </div>

            <div className="simple-salary-summary">
              <p>Salario total</p>
              <h2>{formatMoney(result.salary)}</h2>
              <span>Pago correspondiente al trabajador</span>
            </div>

            <div className="simple-salary-breakdown">
              <h4>Desglose del salario</h4>

              <div className="simple-salary-detail">
                <div>
                  <strong>Horas trabajadas</strong>
                  <span>{result.hours} horas</span>
                </div>
              </div>

              <div className="simple-salary-detail">
                <div>
                  <strong>Tarifa por hora</strong>
                  <span>{formatMoney(result.rate)}</span>
                </div>
              </div>

              <div className="simple-salary-operation">
                <span>Operación realizada</span>
                <strong>
                  {result.hours} × {formatMoney(result.rate)}
                </strong>
              </div>

              <div className="simple-salary-total">
                <span>Salario a pagar</span>
                <strong>{formatMoney(result.salary)}</strong>
              </div>
            </div>

            <p className="simple-salary-note">
              El salario se obtiene multiplicando las horas trabajadas
              por la tarifa de pago por hora.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
