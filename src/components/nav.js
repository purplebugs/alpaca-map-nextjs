import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav>
        <div id="nav-branding">
          <Link href="/">Logo</Link>
        </div>
        <div id="nav-menu">
          <Link href="/">
            <span className="icon">{/* <FontAwesomeIcon icon={faMapLocationDot} size="2x" /> */}</span>
            <span className="hidden-mobile">Find Alpacas on Map</span>
          </Link>

          <Link href="/search">
            <span className="icon">{/* <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /> */}</span>
            <span className="hidden-mobile">Search</span>
          </Link>

          <Link href="/about">
            <span className="icon">{/* <FontAwesomeIcon icon={faCircleQuestion} size="2x" /> */}</span>
            <span className="hidden-mobile">About</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
