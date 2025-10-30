import "./App.css";

function Nav() {
  return (
    <>
      <div className="h-12 w-screen text-2xl md:text-3xl overflow-hidden no-scrollbar fixed bg-white z-30">
        <ul className="flex flex-row pt-3 px-4">
          <li className="px-4">
            <a href="/">SV </a>
          </li>
          <li className="px-4">
            <a href="/#about">About</a>
          </li>
          <li className="px-4">
            <a href="#personal">Projects</a>
          </li>
                    <li className="px-4">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Nav;