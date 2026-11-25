import AuthLayout, { authInputClass } from '../components/auth/AuthLayout'

export default function Login() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-inter text-[30px] leading-[30px] font-medium tracking-[1.44px] md:text-heading-small">
          Log in to Exclusive
        </h1>
        <p className="text-mid leading-6">Enter your details below</p>
      </div>

      <form className="mt-12 flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-10">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Phone Number"
            autoComplete="username"
            required
            className={authInputClass}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className={authInputClass}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="cursor-pointer rounded bg-primary px-12 py-4 text-mid leading-6 font-medium text-heading-white hover:opacity-90"
          >
            Log In
          </button>
          <button type="button" className="cursor-pointer text-mid leading-6 text-primary">
            Forget Password?
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
