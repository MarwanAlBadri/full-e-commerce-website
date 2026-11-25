import { Outlet } from 'react-router-dom'
import TopHeader from './TopHeader'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-text-black">
      <TopHeader />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
