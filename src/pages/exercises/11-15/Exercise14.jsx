
import { useState } from 'react'
import {
  Calculator,
  Hash,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const REQUIRED_NUMBERS = 100

export default function Exercise14() {
  const [number, setNumber] = useState('')
  const [numbers, setNumbers] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const addNumber = (event) => {
    event.preventDefault()

    if (number.trim() === '') {
      setError('Introduce un número antes de agregarlo.')
      return
    }

    const value = Number(number)

    if (!Number.isFinite(value)) {
      setError('Introduce un número válido.')
      return
    }

    if (numbers.length >= REQUIRED_NUMBERS) {
      setError('Ya has ingresado los 100 números.')
      return
    }

    setNumbers((current) => [...current, value])
    setNumber('')
    setResult(null)
    setError('')
  }

  const removeNumber = (index) => {
    setNumbers((current) => current.filter((_, i) => i !== index))
    setResult(null)
    setError('')
  }

  const calculateAverage = () => {
    if (numbers.length !== REQUIRED_NUMBERS) {
      setError(
        `Debes ingresar los 100 números. Actualmente llevas ${numbers.length}.`
      )
      setResult(null)
      return
    }

    const sum = numbers.reduce((total, value) => total + value, 0)
    const average = sum / REQUIRED_NUMBERS

    setResult({
      sum,
      average,
    })

    setError('')
  }

  const clearAll = () => {
    setNumber('')
    setNumbers([])
    setResult(null)
    setError('')
  }

  const progress = (numbers.length / REQUIRED_NUMBERS) * 100

  const formatNumber = (value) =>
    value.toLocaleString('es-DO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    })

  return (
    <ExercisePageLayout
      exerciseNumber={14}
      title="Media de 100 números"
      statement="Calcular la media de 100 números e imprimir su resultado."
    >
      <div className="number-classifier">

        <div className="number-classifier-intro">
          <div className="number-classifier-icon">
            <Hash size={22} />
          </div>

          <div>
            <h3>Registro de números</h3>
            <p>
              Ingresa 100 números para calcular su media aritmética.
              Puedes utilizar números enteros o decimales.
            </p>
          </div>
        </div>

        <div className="number-progress-section">
          <div className="number-progress-heading">
            <strong>Progreso de ingreso</strong>
            <span>{numbers.length} de 100 números</span>
          </div>

          <div className="number-progress-track">
            <div
              className="number-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="number-progress-hint">
            {numbers.length === 100
              ? '¡Has completado los 100 números!'
              : `Faltan ${100 - numbers.length} números por ingresar.`}
          </span>
        </div>

        <form onSubmit={addNumber}>
          <div className="number-classifier-field">
            <label htmlFor="average-number">
              Número
            </label>

            <div className="number-classifier-input">
              <Hash size={18} />

              <input
                id="average-number"
                type="number"
                step="any"
                placeholder="Ej. 25 o 12.5"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value)
                  setError('')
                }}
                disabled={numbers.length === 100}
              />

              <span>Valor</span>
            </div>
          </div>

          <button
            type="submit"
            className="number-add-button"
            disabled={numbers.length === 100}
          >
            <Plus size={17} />
            Agregar número
          </button>
        </form>

        {error && (
          <p className="number-classifier-error">{error}</p>
        )}

        <div className="number-list-section">
          <div className="number-list-heading">
            <div>
              <h4>Números ingresados</h4>
              <p>Revisa o elimina números antes de calcular.</p>
            </div>

            <span>{numbers.length}/100</span>
          </div>

          {numbers.length === 0 ? (
            <div className="number-list-empty">
              <Hash size={25} />
              <p>Aún no has ingresado ningún número.</p>
            </div>
          ) : (
            <div className="number-list">
              {numbers.map((value, index) => (
                <div className="number-list-item" key={index}>
                  <div className="number-list-info">
                    <span className="number-list-index">
                      {index + 1}
                    </span>

                    <strong>{formatNumber(value)}</strong>
                  </div>

                  <button
                    type="button"
                    className="number-delete-button"
                    onClick={() => removeNumber(index)}
                    aria-label={`Eliminar número ${index + 1}`}
                    title="Eliminar número"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="number-classifier-actions">
          <button
            type="button"
            className="number-classifier-calculate"
            onClick={calculateAverage}
            disabled={numbers.length !== 100}
          >
            <Calculator size={17} />
            Calcular media
          </button>

          <button
            type="button"
            className="number-classifier-reset"
            onClick={clearAll}
          >
            <RotateCcw size={16} />
            Limpiar todo
          </button>
        </div>

        {result && (
          <div className="number-classifier-result">

            <div className="number-result-heading">
              <span>RESULTADO DEL CÁLCULO</span>

              <span className="number-result-success">
                <CheckCircle2 size={13} />
                Completado
              </span>
            </div>

            <div className="number-result-total">
              <p>Media aritmética</p>

              <h2>{formatNumber(result.average)}</h2>

              <span>
                Resultado de sumar los 100 números y dividir entre 100.
              </span>
            </div>

            <div className="number-zero-info">
              <span>Suma total de los números</span>
              <strong>{formatNumber(result.sum)}</strong>
              <small>100 números registrados y analizados.</small>
            </div>

            <p className="number-classifier-note">
              Media = Suma de los números ÷ Cantidad de números.
            </p>

          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
