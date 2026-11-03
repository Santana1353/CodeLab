
import { useState } from 'react'
import { Calculator, DollarSign, RotateCcw, Percent } from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise03() {
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatMoney = (value) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
    }).format(value)

  const calculateDiscount = (event) => {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (amount.trim() === '') {
      setError('Introduce el monto para calcular el descuento.')
      setResult(null)
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      setError('El monto debe ser un número válido y no puede ser negativo.')
      setResult(null)
      return
    }

    // 10 % para montos iguales o superiores a 100.
    // 2 % para montos inferiores a 100.
    const percentage = numericAmount >= 100 ? 0.10 : 0.02

    const discount = numericAmount * percentage
    const finalAmount = numericAmount - discount

    setError('')
    setResult({
      amount: numericAmount,
      percentage,
      discount,
      finalAmount,
    })
  }

  const resetCalculator = () => {
    setAmount('')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={3}
      title="Descuento según el monto"
      statement="Dado un monto, calcular el descuento considerando que por encima de 100 el descuento es el 10% y por debajo de 100 el descuento es el 2%."
    >
      <div className="amount-calculator">
        <div className="amount-intro">
          <div className="amount-icon">
            <Percent size={22} />
          </div>
          <div>
            <h3>Calculadora de descuento</h3>
            <p>
              Introduce el monto para conocer el descuento y el total a pagar.
            </p>
          </div>
        </div>

        <div className="amount-rules">
          <div className="amount-rule">
            <span className="rule-label">Monto menor de RD$100</span>
            <strong>2 % de descuento</strong>
          </div>

          <div className="amount-rule">
            <span className="rule-label">Monto igual o mayor a RD$100</span>
            <strong>10 % de descuento</strong>
          </div>
        </div>

        <form onSubmit={calculateDiscount} className="amount-form">
          <div className="amount-field">
            <label htmlFor="purchase-amount">Monto</label>

            <div className="amount-input-wrapper">
              <DollarSign size={18} />

              <input
                id="purchase-amount"
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <span>RD$</span>
            </div>
          </div>

          {error && <p className="amount-error">{error}</p>}

          <div className="amount-actions">
            <button type="submit" className="amount-button">
              <Calculator size={17} />
              Calcular descuento
            </button>

            <button
              type="button"
              className="amount-reset"
              onClick={resetCalculator}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="amount-result">
            <div className="amount-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>
              <span className="amount-success">Calculado</span>
            </div>

            <div className="amount-total">
              <p>Total a pagar</p>
              <h2>{formatMoney(result.finalAmount)}</h2>
            </div>

            <div className="amount-breakdown">
              <h4>Desglose del descuento</h4>

              <div className="amount-detail">
                <div>
                  <strong>Monto original</strong>
                  <span>Importe antes del descuento</span>
                </div>
                <strong>{formatMoney(result.amount)}</strong>
              </div>

              <div className="amount-detail">
                <div>
                  <strong>Porcentaje aplicado</strong>
                  <span>Según el monto introducido</span>
                </div>
                <strong>
                  {(result.percentage * 100).toFixed(0)} %
                </strong>
              </div>

              <div className="amount-detail">
                <div>
                  <strong>Descuento</strong>
                  <span>
                    {formatMoney(result.amount)} ×{' '}
                    {(result.percentage * 100).toFixed(0)} %
                  </span>
                </div>
                <strong>{formatMoney(result.discount)}</strong>
              </div>

              <div className="amount-final">
                <span>Total a pagar</span>
                <strong>{formatMoney(result.finalAmount)}</strong>
              </div>
            </div>

            <p className="amount-note">
              El descuento se aplica sobre el monto completo, utilizando
              el porcentaje correspondiente.
            </p>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
