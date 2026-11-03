import { NavLink } from 'react-router-dom'
import { Code2, House, Calculator, Clock3, Shapes, GraduationCap, Wrench } from 'lucide-react'
import { exercises } from '../../data/exercises'

const groups = [
  { label: 'Ejercicios 01–05', ids: [1,2,3,4,5] },
  { label: 'Ejercicios 06–10', ids: [6,7,8,9,10] },
  { label: 'Ejercicios 11–15', ids: [11,12,13,14,15] },
  { label: 'Ejercicios 18–22', ids: [18,19,20,21,22] },
  { label: 'Ejercicios 23–27', ids: [23,24,25,26,27] },
  { label: 'Ejercicios 28–32', ids: [28,29,30,31,32] },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-icon"><Code2 size={23} /></span>
        <span><strong>CodeLab</strong><small></small></span>
      </NavLink>
      <NavLink to="/" end className="home-link"><House size={17}/> Inicio</NavLink>
      <div className="side-caption">CATÁLOGO</div>
      <nav className="exercise-nav">
        {groups.map(group => (
          <section className="nav-group" key={group.label}>
            <div className="nav-group-title">{group.label}</div>
            {group.ids.map(id => {
              const item = exercises.find(ex => ex.id === id)
              return <NavLink key={id} to={`/ejercicio/${id}`} className={({isActive}) => `nav-exercise ${isActive ? 'active' : ''}`}>
                <span>{String(id).padStart(2, '0')}</span>{item.title}
              </NavLink>
            })}
          </section>
        ))}
      </nav>
      <div className="sidebar-footer">30 ejercicios · React + Vite</div>
    </aside>
  )
}
