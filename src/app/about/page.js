import logo from "public/alpaca.life.logo.png";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <header>
        <h2 className="text-4xl font-bold text-center tracking-tight text-black-almost sm:text-6xl pt-2">
          About
        </h2>
      </header>
      <main className="text-black-almost">
        <article>
          <section className="space-y-0">
            <div>
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Why
              </h3>{" "}
              <p>
                {" "}
                😊 Alpacas make me happy, so I wanted to solve how to find and
                visit them
              </p>
              <div className="flex justify-center">
                <figure className="w-11/12 py-8">
                  <Image
                    src="/Anita_visits_alpaca_Trygve.jpg"
                    alt="Anita visits alpaca Trygve and friends at Alpakkahagen, Norway"
                    width={567}
                    height={756}
                    priority
                    className="border border-2 border-black-almost rounded-2xl ring-8 ring-pink"
                  />

                  <figcaption className="py-4">
                    Anita visits alpaca Trygve and friends at Alpakkahagen,
                    Norway
                  </figcaption>
                </figure>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Donate
              </h3>
              <p>
                🫖 To help with the cost of running the site, feel free to{" "}
                <a
                  href="https://ko-fi.com/anitalipsky"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-dark underline hover:decoration-8"
                >
                  buy me a cuppa tea
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Credits
              </h3>
              <p>
                🦙 Data with kind permission from{" "}
                <a
                  href="https://www.alpakkaforeningen.no/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-dark underline hover:decoration-8"
                >
                  Den Norske Alpakkaforening
                </a>
              </p>
              <p>
                🙋‍♀️ By Anita Lipsky - A{" "}
                <a
                  href="https://www.purplebugs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-dark underline hover:decoration-8"
                >
                  Purple Bugs{" "}
                </a>
                project
              </p>
            </div>

            <div>
              <p>
                <Image
                  alt="Alpaca.Life logo"
                  src={logo}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </p>
            </div>

            <div className="py-12">
              <aside className="border border-2 border-black-almost rounded-2xl ring-8 ring-yellow p-4">
                <h4 className="text-xl font-bold leading-loose tracking-tight">
                  The &quot;<span className="line-through">Silicon</span> Alpaca
                  Valley&quot; pitch
                </h4>
                <p>
                  🤖 This website is made with AI<sup>*</sup> technology
                </p>

                <p>
                  🦄 Alpaca life started as a wild dream, to make finding
                  alpacas accessible to all
                </p>

                <p>
                  💖 I believed no matter your location, abilities or
                  profession, everyone, everywhere should have the power to
                  discover and connect over alpacas
                </p>

                <p>🌏 Alpaca.Life - Making the world an alpaca place</p>
                <p>
                  <em>*Alpaca innovation</em>
                </p>
              </aside>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
