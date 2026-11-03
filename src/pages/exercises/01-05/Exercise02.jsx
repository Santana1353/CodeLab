import { useState } from 'react'
import { Calculator, DollarSign, RotateCcw, Percent } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise02() {
  const [salary, setSalary] = useState('')
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

    const grossSalary = Number(salary)

    if (salary === '') {
      setError('Introduce el sueldo del trabajador.')
      setResult(null)
      return
    }

    if (!Number.isFinite(grossSalary) || grossSalary < 0) {
      setError('El sueldo debe ser un número válido y no puede ser negativo.')
      setResult(null)
      return
    }

    let discount = 0
    let firstBracket = 0
    let secondBracket = 0
    let thirdBracket = 0

    if (grossSalary <= 1000) {
      firstBracket = grossSalary * 0.10
    } else if (grossSalary <= 2000) {
      firstBracket = 1000 * 0.10
      secondBracket = (grossSalary - 1000) * 0.05
    } else {
      firstBracket = 1000 * 0.10
      secondBracket = 1000 * 0.05
      thirdBracket = (grossSalary - 2000) * 0.03
    }

    discount = firstBracket + secondBracket + thirdBracket

    const netSalary = grossSalary - discount

    setError('')
    setResult({
      grossSalary,
      firstBracket,
      secondBracket,
      thirdBracket,
      discount,
      netSalary,
    })
  }

  const resetCalculator = () => {
    setSalary('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={2}
      title="Descuento y sueldo neto"
      statement="A un trabajador le descuentan el 10% de su sueldo si es menor o igual a 1000. Por encima de 1000 y hasta 2000, el 5% del adicional; por encima de 2000, el 3% del adicional. Calcular el descuento y el sueldo neto."
    >
      <div className="deduction-calculator">
        <div className="deduction-intro">
          <div className="deduction-icon">
            <Percent size={22} />
          </div>
          <div>
            <h3>Calculadora de sueldo neto</h3>
            <p>Introduce el sueldo bruto para calcular el descuento correspondiente.</p>
          </div>
        </div>

        <form onSubmit={calculateSalary} className="deduction-form">
          <div className="deduction-field">
            <label htmlFor="gross-salary">Sueldo bruto</label>

            <div className="deduction-input-wrapper">
              <DollarSign size={18} />
              <input
                id="gross-salary"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 2500"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <span>RD$</span>
            </div>
          </div>

          {error && <p className="deduction-error">{error}</p>}

          <div className="deduction-actions">
            <button type="submit" className="deduction-button">
              <Calculator size={17} />
              Calcular sueldo
            </button>

            <button
              type="button"
              className="deduction-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="deduction-result">
            <div className="deduction-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="deduction-success">Calculado</span>
            </div>

            <div className="deduction-total">
              <p>Sueldo neto a recibir</p>
              <h2>{formatMoney(result.netSalary)}</h2>
            </div>

            <div className="deduction-breakdown">
              <h4>Desglose del descuento</h4>

              {result.firstBracket > 0 && (
                <div className="deduction-detail">
                  <div>
                    <strong>Primer tramo (10 %)</strong>
                    <span>
                      {formatMoney(Math.min(result.grossSalary, 1000))}
                    </span>
                  </div>
                  <strong>{formatMoney(result.firstBracket)}</strong>
                </div>
              )}

              {result.secondBracket > 0 && (
                <div className="deduction-detail">
                  <div>
                    <strong>Segundo tramo (5 %)</strong>
                    <span>
                      {formatMoney(Math.min(Math.max(result.grossSalary - 1000, 0), 1000))}
                    </span>
                  </div>
                  <strong>{formatMoney(result.secondBracket)}</strong>
                </div>
              )}

              {result.thirdBracket > 0 && (
                <div className="deduction-detail">
                  <div>
                    <strong>Excedente (3 %)</strong>
                    <span>{formatMoney(result.grossSalary - 2000)}</span>
                  </div>
                  <strong>{formatMoney(result.thirdBracket)}</strong>
                </div>
              )}

              <div className="deduction-final">
                <span>Descuento total</span>
                <strong>{formatMoney(result.discount)}</strong>
              </div>

              <div className="deduction-net">
                <span>Sueldo bruto</span>
                <strong>{formatMoney(result.grossSalary)}</strong>
              </div>

              <div className="deduction-payable">
                <span>Sueldo neto</span>
                <strong>{formatMoney(result.netSalary)}</strong>
              </div>
            </div>

            <p className="deduction-note">
              El descuento se calcula progresivamente según cada tramo del sueldo.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}