import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faMagnifyingGlass,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
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
            <span>
              <FontAwesomeIcon icon={faMapLocationDot} className="fa-2x" />
            </span>
            <span>Find Alpacas on Map</span>
          </Link>

          <Link href="/search">
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2x" />
            </span>
            <span>Search</span>
          </Link>

          <Link href="/about">
            <span>
              <FontAwesomeIcon icon={faCircleQuestion} className="fa-2x" />
            </span>
            <span>About</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
