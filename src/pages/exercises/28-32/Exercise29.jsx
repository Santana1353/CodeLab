
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const INITIAL_BALANCE = 371

export default function Exercise29() {
  const [expense, setExpense] = useState('')
  const [expenses, setExpenses] = useState([])
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [error, setError] = useState('')
  const [finished, setFinished] = useState(false)

  const formatMoney = (value) => `$${value.toFixed(2)}`

  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  )

  const registerExpense = (e) => {
    e.preventDefault()

    if (expense.trim() === '') {
      setError('Debes ingresar el monto del egreso.')
      return
    }

    const amount = Number(expense.trim())

    if (!Number.isFinite(amount)) {
      setError('Ingresa un monto válido.')
      return
    }

    // -1 finaliza el proceso sin registrarse como egreso.
    if (amount === -1) {
      setFinished(true)
      setExpense('')
      setError('')
      return
    }

    if (amount < 0) {
      setError('El monto debe ser positivo. Ingresa -1 para finalizar.')
      return
    }

    const newBalance = Math.round((balance - amount) * 100) / 100

    const newExpense = {
      id: expenses.length + 1,
      amount,
      balance: newBalance,
    }

    setExpenses((previous) => [...previous, newExpense])
    setBalance(newBalance)
    setExpense('')
    setError('')
  }

  const resetExercise = () => {
    setExpense('')
    setExpenses([])
    setBalance(INITIAL_BALANCE)
    setError('')
    setFinished(false)
  }

  return (
    <ExercisePageLayout
      exerciseNumber={29}
      title="Control de egresos de caja"
      statement="Una caja dispone de $371. Se registran los egresos de dinero hasta que se ingrese -1. Al finalizar, se debe mostrar el saldo restante."
    >
      <div className="cash-box-container">

        <div className="cash-box-balance">
          <span className="cash-box-label">Saldo disponible</span>
          <strong>{formatMoney(balance)}</strong>
          <span className="cash-box-initial">
            Saldo inicial: {formatMoney(INITIAL_BALANCE)}
          </span>
        </div>

        {!finished && (
          <form className="cash-box-form" onSubmit={registerExpense}>
            <label htmlFor="cash-expense">
              Monto del egreso
            </label>

            <div className="cash-box-input-group">
              <span>$</span>
              <input
                id="cash-expense"
                type="text"
                inputMode="decimal"
                placeholder="Ej. 50 o -1"
                value={expense}
                onChange={(e) => {
                  setExpense(e.target.value)
                  setError('')
                }}
              />
            </div>

            <p className="cash-box-hint">
              Ingresa -1 para finalizar el registro de egresos.
            </p>

            {error && (
              <p className="cash-box-error">{error}</p>
            )}

            <button type="submit" className="cash-box-button">
              Registrar egreso
            </button>
          </form>
        )}

        {finished && (
          <div className="cash-box-finished">
            <div className="cash-box-finished-icon">✓</div>
            <h3>Registro finalizado</h3>
            <p>Se ha completado el registro de egresos.</p>
          </div>
        )}

        <div className="cash-box-summary">
          <div className="cash-box-summary-item">
            <span>Total de egresos</span>
            <strong>{formatMoney(totalExpenses)}</strong>
          </div>

          <div className="cash-box-summary-item">
            <span>Cantidad de egresos</span>
            <strong>{expenses.length}</strong>
          </div>

          <div className="cash-box-summary-item">
            <span>Saldo final</span>
            <strong>{formatMoney(balance)}</strong>
          </div>
        </div>

        <div className="cash-box-history">
          <div className="cash-box-history-heading">
            <h3>Historial de egresos</h3>
            <span>{expenses.length} registros</span>
          </div>

          {expenses.length === 0 ? (
            <p className="cash-box-empty">
              Todavía no se han registrado egresos.
            </p>
          ) : (
            <div className="cash-box-table-wrapper">
              <table className="cash-box-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Egreso</th>
                    <th>Saldo restante</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td className="cash-box-expense">
                        -{formatMoney(item.amount)}
                      </td>
                      <td>{formatMoney(item.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {finished && (
          <button
            type="button"
            className="cash-box-reset"
            onClick={resetExercise}
          >
            Reiniciar ejercicio
          </button>
        )}

      </div>
    </ExercisePageLayout>
  )
}
