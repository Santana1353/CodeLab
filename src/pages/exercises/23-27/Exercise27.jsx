
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const TOTAL_CONSUMPTIONS = 130

export default function Exercise27() {
  const [consumption, setConsumption] = useState('')
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')

  const formatMoney = (value) => {
    return `$${Number(value.toFixed(2)).toFixed(2)}`
  }

  const totalDiscounts = records.reduce(
    (total, item) => total + item.discount,
    0
  )

  const totalPayments = records.reduce(
    (total, item) => total + item.payment,
    0
  )

  const totalConsumption = records.reduce(
    (total, item) => total + item.amount,
    0
  )

  const addConsumption = (e) => {
    e.preventDefault()

    if (consumption.trim() === '') {
      setError('Debes ingresar el monto del consumo.')
      return
    }

    const amount = Number(consumption)

    if (!Number.isFinite(amount) || amount < 0) {
      setError('Ingresa un monto válido. No puede ser negativo.')
      return
    }

    if (records.length >= TOTAL_CONSUMPTIONS) {
      setError('Ya se registraron los 130 consumos.')
      return
    }

    const discount = amount > 130
      ? Math.round(amount * 0.15 * 100) / 100
      : 0

    const payment = Math.round((amount - discount) * 100) / 100

    const newRecord = {
      id: records.length + 1,
      amount,
      discount,
      payment,
    }

    setRecords((previous) => [...previous, newRecord])
    setConsumption('')
    setError('')
  }

  const reset = () => {
    setConsumption('')
    setRecords([])
    setError('')
  }

  const completed = records.length === TOTAL_CONSUMPTIONS
  const progress = (records.length / TOTAL_CONSUMPTIONS) * 100

  return (
    <ExercisePageLayout
      exerciseNumber={27}
      title="Consumos de restaurante"
      statement="Calcular todos los pagos hechos de un restaurante que lea 130 consumos y que si el consumo ingresado excede los $130 el descuento será del 15%."
    >
      <div className="restaurant-container">

        {/* INTRODUCCION */}

        <div className="restaurant-intro">
          <div className="restaurant-icon">$</div>
          <div>
            <h3>Registro de consumos</h3>
            <p>Registra los 130 consumos y calcula automáticamente los pagos.</p>
          </div>
        </div>

        {/* PROGRESO */}

        <div className="restaurant-progress-card">
          <div className="restaurant-progress-heading">
            <div>
              <span>PROGRESO DEL REGISTRO</span>
              <strong>
                {records.length} de {TOTAL_CONSUMPTIONS} consumos
              </strong>
            </div>
            <span className="restaurant-progress-percentage">
              {progress.toFixed(0)}%
            </span>
          </div>

          <div className="restaurant-progress-track">
            <div
              className="restaurant-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* FORMULARIO */}

        {!completed && (
          <form className="restaurant-form" onSubmit={addConsumption}>
            <div className="restaurant-form-heading">
              <h4>Registrar consumo</h4>
              <span>Consumo #{records.length + 1}</span>
            </div>

            <div className="restaurant-field">
              <label htmlFor="restaurant-consumption">
                Monto del consumo
              </label>
              <input
                id="restaurant-consumption"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ej. 150.00"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
            </div>

            <div className="restaurant-discount-info">
              <strong>Regla de descuento</strong>
              <p>
                Consumos mayores de $130 reciben un 15% de descuento.
                Los consumos de $130 o menos no reciben descuento.
              </p>
            </div>

            {error && (
              <div className="restaurant-error">{error}</div>
            )}

            <div className="restaurant-actions">
              <button type="submit" className="restaurant-add">
                Registrar consumo
              </button>

              {records.length > 0 && (
                <button
                  type="button"
                  className="restaurant-reset"
                  onClick={reset}
                >
                  Reiniciar
                </button>
              )}
            </div>
          </form>
        )}

        {/* RESUMEN */}

        {records.length > 0 && (
          <div className="restaurant-summary">
            <div className="restaurant-summary-heading">
              <span>RESUMEN ACTUAL</span>
              <h4>Pagos del restaurante</h4>
            </div>

            <div className="restaurant-summary-grid">
              <div>
                <span>Total de consumos</span>
                <strong>{formatMoney(totalConsumption)}</strong>
              </div>

              <div>
                <span>Descuentos aplicados</span>
                <strong>{formatMoney(totalDiscounts)}</strong>
              </div>

              <div>
                <span>Total a pagar</span>
                <strong>{formatMoney(totalPayments)}</strong>
              </div>
            </div>
          </div>
        )}

        {/* HISTORIAL */}

        {records.length > 0 && (
          <div className="restaurant-history">
            <div className="restaurant-history-heading">
              <div>
                <span>DETALLE</span>
                <h4>Consumos registrados</h4>
              </div>
              <span className="restaurant-count">
                {records.length} registros
              </span>
            </div>

            <div className="restaurant-table-wrapper">
              <table className="restaurant-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Consumo</th>
                    <th>Descuento</th>
                    <th>Pago final</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{formatMoney(item.amount)}</td>
                      <td className={item.discount > 0 ? 'has-discount' : ''}>
                        {formatMoney(item.discount)}
                      </td>
                      <td className="restaurant-payment">
                        {formatMoney(item.payment)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FINALIZACION */}

        {completed && (
          <div className="restaurant-completed">
            <div>
              <h4>¡Registro completado!</h4>
              <p>
                Se registraron los 130 consumos y se calcularon todos los pagos.
              </p>
            </div>

            <button
              type="button"
              className="restaurant-reset"
              onClick={reset}
            >
              Comenzar nuevamente
            </button>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
