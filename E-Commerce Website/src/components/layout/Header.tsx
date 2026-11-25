import { Link, NavLink } from 'react-router-dom'
import searchIcon from '../../assets/icons/search.svg'
import wishlistIcon from '../../assets/icons/wishlist.svg'
import cartIcon from '../../assets/icons/cart.svg'
import underline from '../../assets/icons/underline.svg'

const links = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
  { to: '/signup', label: 'Sign Up' },
]

export default function Header() {
  return (
    <header className="border-b border-black/30 pt-10 pb-4">
      <div className="mx-auto flex max-w-[1170px] items-center justify-between">
        <div className="flex items-start gap-[190px]">
          <Link to="/" className="font-inter text-xxl leading-6 font-bold tracking-[0.72px] text-text-black">
            Exclusive
          </Link>
          <nav className="flex items-start gap-12">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className="flex flex-col items-center text-mid leading-6 text-text-black">
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && <img src={underline} alt="" className="h-px w-12" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-[34px] rounded bg-secondary py-[7px] pr-3 pl-5">
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-[160px] bg-transparent text-[12px] leading-[18px] outline-none placeholder:text-text-black/50"
            />
            <img src={searchIcon} alt="Search" className="size-6" />
          </label>
          <div className="flex items-center gap-4">
            <Link to="/wishlist">
              <img src={wishlistIcon} alt="Wishlist" className="size-8" />
            </Link>
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" className="size-8" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
