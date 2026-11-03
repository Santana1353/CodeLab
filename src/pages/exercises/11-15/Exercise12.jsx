
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

const REQUIRED_NUMBERS = 50

export default function Exercise12() {
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

    if (!Number.isSafeInteger(value)) {
      setError('Introduce un número entero válido.')
      return
    }

    if (numbers.includes(value)) {
      setError('Este número ya fue ingresado. No se permiten números repetidos.')
      return
    }

    if (numbers.length >= REQUIRED_NUMBERS) {
      setError('Ya has ingresado los 50 números.')
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

  const calculateResults = () => {
    if (numbers.length !== REQUIRED_NUMBERS) {
      setError(
        `Debes ingresar los 50 números. Actualmente llevas ${numbers.length}.`
      )
      setResult(null)
      return
    }

    const even = numbers.filter((value) => value % 2 === 0)
    const odd = numbers.filter((value) => value % 2 !== 0)
    const positive = numbers.filter((value) => value > 0)
    const negative = numbers.filter((value) => value < 0)
    const zero = numbers.filter((value) => value === 0)

    setResult({
      even: even.length,
      odd: odd.length,
      positive: positive.length,
      negative: negative.length,
      zero: zero.length,
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

  return (
    <ExercisePageLayout
      exerciseNumber={12}
      title="Clasificación de 50 números"
      statement="Pedir 50 números naturales y determinar e imprimir cuántos son pares, impares, positivos y negativos."
    >
      <div className="number-classifier">

        <div className="number-classifier-intro">
          <div className="number-classifier-icon">
            <Hash size={22} />
          </div>

          <div>
            <h3>Registro de números</h3>
            <p>
              Ingresa 50 números enteros diferentes para clasificarlos
              según sus características.
            </p>
          </div>
        </div>

        <div className="number-progress-section">
          <div className="number-progress-heading">
            <strong>Progreso de ingreso</strong>
            <span>{numbers.length} de 50 números</span>
          </div>

          <div className="number-progress-track">
            <div
              className="number-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="number-progress-hint">
            {numbers.length === 50
              ? '¡Has completado los 50 números!'
              : `Faltan ${50 - numbers.length} números por ingresar.`}
          </span>
        </div>

        <form onSubmit={addNumber}>
          <div className="number-classifier-field">
            <label htmlFor="classifier-number">
              Número entero
            </label>

            <div className="number-classifier-input">
              <Hash size={18} />

              <input
                id="classifier-number"
                type="number"
                step="1"
                placeholder="Ej. 25 o -12"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value)
                  setError('')
                }}
                disabled={numbers.length === 50}
              />

              <span>Entero</span>
            </div>
          </div>

          <button
            type="submit"
            className="number-add-button"
            disabled={numbers.length === 50}
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

            <span>{numbers.length}/50</span>
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

                    <strong>{value}</strong>

                    <span className={`number-type ${
                      value === 0
                        ? 'zero'
                        : value > 0
                          ? 'positive'
                          : 'negative'
                    }`}>
                      {value === 0
                        ? 'Cero'
                        : value > 0
                          ? 'Positivo'
                          : 'Negativo'}
                    </span>

                    <span className="number-parity">
                      {value % 2 === 0 ? 'Par' : 'Impar'}
                    </span>
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
            onClick={calculateResults}
            disabled={numbers.length !== 50}
          >
            <Calculator size={17} />
            Clasificar números
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
              <span>RESULTADO DE LA CLASIFICACIÓN</span>

              <span className="number-result-success">
                <CheckCircle2 size={13} />
                Completado
              </span>
            </div>

            <div className="number-result-total">
              <p>Total de números analizados</p>
              <h2>50</h2>
              <span>Todos los números fueron clasificados.</span>
            </div>

            <div className="number-result-grid">

              <div className="number-result-card even">
                <span>Pares</span>
                <strong>{result.even}</strong>
                <small>Divisibles entre 2</small>
              </div>

              <div className="number-result-card odd">
                <span>Impares</span>
                <strong>{result.odd}</strong>
                <small>No divisibles entre 2</small>
              </div>

              <div className="number-result-card positive">
                <span>Positivos</span>
                <strong>{result.positive}</strong>
                <small>Mayores que cero</small>
              </div>

              <div className="number-result-card negative">
                <span>Negativos</span>
                <strong>{result.negative}</strong>
                <small>Menores que cero</small>
              </div>

            </div>

            <div className="number-zero-info">
              <span>Ceros ingresados</span>
              <strong>{result.zero}</strong>
              <small>
                El cero se considera par, pero no es positivo ni negativo.
              </small>
            </div>

            <p className="number-classifier-note">
              La cantidad de pares más impares debe ser igual a 50.
              Los positivos, negativos y ceros también suman 50.
            </p>

          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
