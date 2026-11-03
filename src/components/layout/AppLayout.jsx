import Sidebar from './Sidebar'
import './layout.css'

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">{children}</main>
    </div>
  )
}
