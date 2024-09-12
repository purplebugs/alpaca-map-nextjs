import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faMagnifyingGlass,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import logo from "public/alpaca.life.logo.png";
import Image from "next/image";

import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav className="bg-blue py-2 text-white font-bold">
        <div className="px-2">
          <div id="nav-menu" className="flex items-center justify-between">
            <div id="nav-branding" className="">
              <Link href="/">
                {" "}
                <Image
                  alt="Alpaca.Life logo"
                  src={logo}
                  sizes="5rem"
                  style={{
                    width: "auto",
                    height: "100%",
                  }}
                />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-5">
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
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2x" />
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
            <div id="nav-branding" className="invisible">
              {/* Workaround: Invisible to balance centering of logo and icons. Left logo shows left, icons show completely centered, duplicate invisible logo on right*/}
              <Link href="/">
                {" "}
                <Image
                  alt="Alpaca.Life logo"
                  src={logo}
                  sizes="5rem"
                  style={{
                    width: "auto",
                    height: "100%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
