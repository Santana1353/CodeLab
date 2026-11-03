
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ExercisePageLayout({ exerciseNumber, title, statement, children }) {
  return (
    <div className="page-content exercise-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        Volver al catálogo
      </Link>

      <div className="page-eyebrow">
        DOCUMENTO ORIGINAL · EJERCICIO {String(exerciseNumber).padStart(2, '0')}
      </div>

      <h1>{title}</h1>

      <section className="statement-panel">
        <div className="panel-label">ENUNCIADO DEL DOCUMENTO</div>
        <p>{statement}</p>
      </section>

      <section className="workspace-panel">
        <div className="workspace-heading">
          <div>
            <span className="panel-label">ÁREA DE LA APLICACIÓN</span>
            <h2>Prueba el ejercicio</h2>
          </div>
        </div>

        {children}
      </section>
    </div>
  )
}
