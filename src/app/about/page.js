import Image from "next/image";

export default function Page() {
  return (
    <>
      <header>
        <h2>About</h2>
      </header>
      <main>
        <article className="info">
          <section>
            <div>
              <h3>Why</h3> <p> 😊 Alpacas make me happy, so I wanted to solve how to find and visit them</p>
              <figure>
                <Image
                  class="photo"
                  src="/Anita_visits_alpaca_Trygve.JPG"
                  alt="Anita visits alpaca Trygve and friends at Alpakkahagen, Norway"
                  width={567}
                  height={756}
                  priority
                />

                <figcaption>Anita visits alpaca Trygve and friends at Alpakkahagen, Norway</figcaption>
              </figure>
            </div>
            <div>
              <h3>Donate</h3>
              <p>
                🫖 To help with the cost of running the site, feel free to
                <a href="https://ko-fi.com/anitalipsky" target="_blank" rel="noreferrer">
                  buy me a cuppa tea
                </a>
              </p>
            </div>
            <div>
              <h3>Credits</h3>
              <p>
                🦙 Data with kind permission from
                <a href="https://www.alpakkaforeningen.no/" target="_blank" rel="noreferrer" title="alpaca icons">
                  Den Norske Alpakkaforening
                </a>
              </p>
              <p>
                🙋‍♀️ By Anita Lipsky - A
                <a href="https://www.purplebugs.com/" target="_blank" rel="noreferrer" title="alpaca icons">
                  Purple Bugs
                </a>
                project
              </p>
            </div>

            <div>
              <p>
                <Image src="/alpaca.life.logo.png" alt="Alpaca.Life logo" width={300} height={300} priority />
              </p>
            </div>

            <aside>
              <h3>
                The &ldquo;<span className="strikethrough">Silicon</span> Alpaca Valley&ldquo; pitch
              </h3>
              <p>
                🤖 This website is made with AI<sup>*</sup> technology
              </p>

              <p>🦄 Alpaca life started as a wild dream, to make finding alpacas accessible to all</p>

              <p>
                💖 I believed no matter your location, abilities or profession, everyone, everywhere should have the
                power to discover and connect over alpacas
              </p>

              <p>🌏 Alpaca.Life - Making the world an alpaca place</p>
              <p>
                <em>*Alpaca innovation</em>
              </p>
            </aside>
          </section>
        </article>
      </main>
    </>
  );
}
