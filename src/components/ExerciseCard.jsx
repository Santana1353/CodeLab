import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ExerciseCard({ exercise }) {
  return (
    <Link className="exercise-card" to={`/ejercicio/${exercise.id}`}>
      <div className="card-topline">
        <span className="exercise-number">EJERCICIO {String(exercise.id).padStart(2, '0')}</span>
        <ArrowUpRight size={18} />
      </div>
      <h3>{exercise.title}</h3>
      <p>{exercise.shortDescription}</p>
      <div className="card-bottom"><span>{exercise.category}</span><span className="open-label">Abrir aplicación</span></div>
    </Link>
  )
}
