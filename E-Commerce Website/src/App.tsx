import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Placeholder from './pages/Placeholder'

const pages = [
  { path: '/', title: 'Home' },
  { path: '/signup', title: 'Sign Up' },
  { path: '/login', title: 'Log In' },
  { path: '/wishlist', title: 'Wishlist' },
  { path: '/cart', title: 'Cart' },
  { path: '/checkout', title: 'Checkout' },
  { path: '/account', title: 'Account' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
  { path: '/product/:id', title: 'Product Details' },
  { path: '*', title: '404 Not Found' },
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {pages.map(({ path, title }) => (
            <Route key={path} path={path} element={<Placeholder title={title} />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
