
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const correctKeys = [
  'TIENES',
  'QUE SER',
  'INVITADO',
  'PARA',
  'INGRESAR'
]

export default function Exercise32() {
  const [keys, setKeys] = useState(['', '', '', '', ''])
  const [result, setResult] = useState(null)

  const handleChange = (index, value) => {
    const updatedKeys = [...keys]
    updatedKeys[index] = value
    setKeys(updatedKeys)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const allCorrect = keys.every(
      (key, index) =>
        key.trim().toUpperCase() === correctKeys[index]
    )

    setResult(allCorrect ? 'success' : 'error')
  }

  const handleReset = () => {
    setKeys(['', '', '', '', ''])
    setResult(null)
  }

  return (
    <ExercisePageLayout
      exerciseNumber={32}
      title="Control de acceso a una fiesta"
      statement="Controlar el ingreso a una fiesta mediante cinco claves en el siguiente orden: 1. TIENES, 2. QUE SER, 3. INVITADO, 4. PARA y 5. INGRESAR. Si se ingresa al menos una clave incorrecta, mostrar “TE EQUIVOCASTE DE FIESTA” y no permitir el ingreso. Si las cinco claves son correctas, mostrar “BIENVENIDO A LA FIESTA”."
    >
      <div className="party-access">
        <div className="party-access-header">
          <span className="party-access-icon">🔐</span>
          <h3>Verificación De Acceso</h3>
          <p>Introduce las cinco claves para comprobar tu entrada.</p>
        </div>

        {result === null ? (
          <form onSubmit={handleSubmit} className="party-access-form">
            <div className="party-access-fields">
              {keys.map((key, index) => (
                <div className="party-access-field" key={index}>
                  <label htmlFor={`party-key-${index}`}>
                    Clave {index + 1}
                  </label>

                  <input
                    id={`party-key-${index}`}
                    type="text"
                    value={key}
                    onChange={(event) =>
                      handleChange(index, event.target.value)
                    }
                    placeholder={`Introduce la clave ${index + 1}`}
                    autoComplete="off"
                    required
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="party-access-button">
              Verificar Acceso
            </button>
          </form>
        ) : (
          <div
            className={`party-access-result ${
              result === 'success'
                ? 'party-access-success'
                : 'party-access-error'
            }`}
          >
            <span className="party-access-result-icon">
              {result === 'success' ? '🎉' : '🚫'}
            </span>

            <h3>
              {result === 'success'
                ? 'BIENVENIDO A LA FIESTA'
                : 'TE EQUIVOCASTE DE FIESTA'}
            </h3>

            <p>
              {result === 'success'
                ? 'Las cinco claves son correctas. ¡Puedes ingresar!'
                : 'Una o más claves son incorrectas. No se permite el ingreso.'}
            </p>

            <button
              type="button"
              className="party-access-button"
              onClick={handleReset}
            >
              Volver a Intentar
            </button>
          </div>
        )}
      </div>
    </ExercisePageLayout>
  )
}
