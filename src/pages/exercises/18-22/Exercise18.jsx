
import { useState } from 'react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

const vowels = 'aeiouáéíóúü'

export default function Exercise18() {
  const [character, setCharacter] = useState('')
  const [characters, setCharacters] = useState([])
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const processCharacter = (e) => {
    e.preventDefault()

    if (!character.trim()) {
      setError('Debes ingresar un carácter.')
      return
    }

    const enteredCharacter = character.trim().charAt(0)
    const updatedCharacters = [...characters, enteredCharacter]

    setCharacters(updatedCharacters)
    setCharacter('')
    setError('')

    if (vowels.includes(enteredCharacter.toLowerCase())) {
      setResult(enteredCharacter)
    }
  }

  const reset = () => {
    setCharacter('')
    setCharacters([])
    setResult('')
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={18}
      title="Primera vocal ingresada"
      statement="Hacer un programa para escribir la primera vocal leída del teclado. Se supone que se leen, uno a uno, caracteres desde el teclado."
    >
      <div className="first-vowel-container">

        <div className="first-vowel-intro">
          <div className="first-vowel-icon">A</div>
          <div>
            <h3>Detector de vocales</h3>
            <p>Ingresa caracteres uno por uno hasta encontrar una vocal.</p>
          </div>
        </div>

        <form onSubmit={processCharacter} className="first-vowel-form">
          <div className="first-vowel-field">
            <label htmlFor="character">Ingresa un carácter</label>

            <div className="first-vowel-input-group">
              <input
                id="character"
                type="text"
                maxLength={1}
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="Ej. B"
                disabled={Boolean(result)}
                autoComplete="off"
                autoFocus
              />

              <button
                type="submit"
                className="first-vowel-button"
                disabled={Boolean(result)}
              >
                Ingresar
              </button>
            </div>
          </div>

          <p className="first-vowel-hint">
            El programa se detendrá automáticamente cuando encuentre una vocal.
          </p>

          {error && (
            <div className="first-vowel-error">
              {error}
            </div>
          )}
        </form>

        {characters.length > 0 && (
          <div className="first-vowel-history">
            <div className="first-vowel-section-heading">
              <h4>Caracteres ingresados</h4>
              <span>{characters.length} caracteres</span>
            </div>

            <div className="first-vowel-character-list">
              {characters.map((item, index) => (
                <span
                  key={index}
                  className={
                    vowels.includes(item.toLowerCase())
                      ? 'found-vowel'
                      : ''
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="first-vowel-result">
            <span className="first-vowel-result-label">
              PRIMERA VOCAL ENCONTRADA
            </span>

            <strong>{result}</strong>

            <p>
              Se encontró una vocal después de ingresar {characters.length}{' '}
              {characters.length === 1 ? 'carácter' : 'caracteres'}.
            </p>
          </div>
        )}

        <div className="first-vowel-actions">
          <button
            type="button"
            className="first-vowel-reset"
            onClick={reset}
          >
            Reiniciar ejercicio
          </button>
        </div>

      </div>
    </ExercisePageLayout>
  )
}
