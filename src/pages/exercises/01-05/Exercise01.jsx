import { useState } from 'react'
import { Calculator, Clock, DollarSign, RotateCcw } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise01() {
  const [hours, setHours] = useState('')
  const [rate, setRate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatMoney = (amount) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
    }).format(amount)

  const calculateSalary = (event) => {
    event.preventDefault()

    const workedHours = Number(hours)
    const hourlyRate = Number(rate)

    if (hours === '' || rate === '') {
      setError('Completa todos los campos antes de calcular.')
      setResult(null)
      return
    }

    if (
      !Number.isFinite(workedHours) ||
      !Number.isFinite(hourlyRate) ||
      workedHours < 0 ||
      hourlyRate < 0
    ) {
      setError('Introduce valores válidos. No se permiten números negativos.')
      setResult(null)
      return
    }

    const regularHours = Math.min(workedHours, 40)
    const overtimeHours = Math.max(workedHours - 40, 0)
    const overtimeRate = hourlyRate * 1.5

    const regularPay = regularHours * hourlyRate
    const overtimePay = overtimeHours * overtimeRate
    const totalSalary = regularPay + overtimePay

    setError('')
    setResult({
      regularHours,
      overtimeHours,
      regularPay,
      overtimePay,
      totalSalary,
      overtimeRate,
    })
  }

  const resetCalculator = () => {
    setHours('')
    setRate('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={1}
      title="Cálculo del salario con horas extras"
      statement="Calcular el salario de un trabajador según sus horas y tarifa. Si trabaja más de 40 horas, la tarifa aumenta un 50% para las horas extras."
    >
      <div className="salary-calculator">
        <div className="salary-intro">
          <div className="salary-icon">
            <Calculator size={22} />
          </div>
          <div>
            <h3>Calculadora de salario</h3>
            <p>Introduce los datos del trabajador para calcular su pago.</p>
          </div>
        </div>

        <form onSubmit={calculateSalary} className="salary-form">
          <div className="salary-fields">
            <div className="salary-field">
              <label htmlFor="worked-hours">Horas trabajadas</label>
              <div className="salary-input-wrapper">
                <Clock size={18} />
                <input
                  id="worked-hours"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Ej. 45"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <span>horas</span>
              </div>
            </div>

            <div className="salary-field">
              <label htmlFor="hourly-rate">Tarifa por hora</label>
              <div className="salary-input-wrapper">
                <DollarSign size={18} />
                <input
                  id="hourly-rate"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Ej. 100"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <span>RD$</span>
              </div>
            </div>
          </div>

          {error && <p className="salary-error">{error}</p>}

          <div className="salary-actions">
            <button type="submit" className="salary-button">
              <Calculator size={17} />
              Calcular salario
            </button>

            <button
              type="button"
              className="salary-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="salary-result">
            <div className="salary-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="salary-success">Calculado</span>
            </div>

            <div className="salary-total">
              <p>Salario total</p>
              <h2>{formatMoney(result.totalSalary)}</h2>
            </div>

            <div className="salary-breakdown">
              <h4>Desglose del salario</h4>

              <div className="salary-detail">
                <div>
                  <strong>Horas normales</strong>
                  <span>{result.regularHours} horas × {formatMoney(Number(rate))}</span>
                </div>
                <strong>{formatMoney(result.regularPay)}</strong>
              </div>

              <div className="salary-detail">
                <div>
                  <strong>Horas extras</strong>
                  <span>
                    {result.overtimeHours} horas × {formatMoney(result.overtimeRate)}
                  </span>
                </div>
                <strong>{formatMoney(result.overtimePay)}</strong>
              </div>

              <div className="salary-final">
                <span>Total a pagar</span>
                <strong>{formatMoney(result.totalSalary)}</strong>
              </div>
            </div>

            <p className="salary-note">
              Las horas extras se calcularon con un incremento del 50 % sobre
              la tarifa normal.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}