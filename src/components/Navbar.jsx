
const Navbar = () => {
  return (
    <header className="h-16 flex items-center shadow-sm">
    <nav className="flex justify-between items-center w-9/12 mx-auto">
      <a href="/" className="text-zinc-800 font-bold uppercase">
        <img src="/images/logo.png" alt="logo" />
      </a>
      <div className="space-x-5 flex items-center">
        <ul className="space-x-5 sm:flex hidden">
          <li className="hover:text-yellow-500"><a href="/">How it works?</a></li>
          <li className="hover:text-yellow-500"><a href="/">Features</a></li>
          <li className="hover:text-yellow-500"><a href="/">About us</a></li>
        </ul>
        <button
          className="font-medium px-5 py-1 border border-[#FCC822] rounded text-[#FCC822]"
        >
          Login
        </button>
      </div>
    </nav>
  </header>
  )
}

export default Navbar