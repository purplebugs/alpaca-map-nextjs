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
      <nav className="bg-pale-blue py-5 text-white font-bold">
        <div id="nav-branding" className="absolute">
          <Link href="/">Logo</Link>
        </div>
        <div id="nav-menu" className="relative flex flex-col items-center">
          <div className="relative flex flex-row gap-5">
            <div>
              <Link href="/" className="flex items-center gap-1">
                <FontAwesomeIcon icon={faMapLocationDot} className="fa-2x" />
                <span className="hidden md:block hover:underline hover:decoration-8">
                  Find Alpacas on Map
                </span>
              </Link>
            </div>

            <div>
              <Link href="/search" className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="fa-2x hover:stroke-white stroke-2"
                />
                <span className="hidden md:block hover:underline hover:decoration-8">
                  Search
                </span>
              </Link>
            </div>

            <div>
              <Link href="/about" className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCircleQuestion} className="fa-2x" />
                <span className="hidden md:block hover:underline hover:decoration-8">
                  About
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
