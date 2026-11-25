import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Placeholder from './pages/Placeholder'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

const pages = [
  { path: '/', title: 'Home' },
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {pages.map(({ path, title }) => (
            <Route key={path} path={path} element={<Placeholder title={title} />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
