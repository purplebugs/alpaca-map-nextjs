import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import { AlpacaDetail } from "@/components/alpacaDetail.js";
import { db } from "@/functions/db.js";
import { generateImageSource } from "@/functions/generateImageSource";

export default async function Page({ params }) {
  // TODO error handling when getting data.
  // See old repo https://github.com/purplebugs/alpaca-map/blob/main/client/src/pages/Alpaca.js#L12

  noStore(); // Opt-into dynamic rendering
  const result = await db.getAnimal(params.id);
  const alpaca = result[0];
  const color = alpaca?.color?.color1?.original;
  const imageSource = generateImageSource(color);

  const statusText = alpaca?.status; // TODO Cleanup status coming from API instead of here

  let status = undefined;

  switch (statusText) {
    case "STATUS_ACTIVE":
      status = "active";
      break;
    case "STATUS_DEAD":
      status = "dead";
      break;
    case "STATUS_EXPORT":
      status = "export";
      break;
    default:
      console.log(`[LOG] No status match for ${status}`);
  }

  return (
    <>
      <header>
        <h2>{alpaca?.alpacaShortName}</h2>
      </header>
      <main>
        <article id="alpaca">
          <section className="overview">
            <div className="box profile-graphic" data-testid="profile-graphic">
              <Suspense fallback={<p>Loading alpacas...</p>}>
                <img
                  // TODO image size and sizing options with next <Image> tag
                  data-testid="profile-graphic-src"
                  className="graphic"
                  src={imageSource}
                  alt={`Alpaca ${alpaca?.alpacaShortName}, graphic generated by AI`}
                />
              </Suspense>
            </div>

            <div className="box">
              <h3>Lives at</h3>
              <div className="inner-box" data-testid="farm-name">
                <div className="box-row">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faCircleInfo} />} */}</div>
                  <div className="text">
                    <a data-testid="farm-name-link" href={`/farm/${alpaca?.companyId}`}>
                      {alpaca?.keeperName}
                    </a>
                  </div>
                </div>
              </div>
              <div className="inner-box" data-testid="farm-public-private">
                <div className="box-row">
                  <div className="icon">
                    {/* {alpaca?.public === true ? (
                      <FontAwesomeIcon icon={faHouseFlag} />
                    ) : (
                      <FontAwesomeIcon icon={faKey} />
                    )} */}
                  </div>
                  <div className="text">{alpaca?.public === true ? "Public Farm" : "Private Farm"}</div>
                </div>
              </div>

              <address data-testid="farm-address" className="inner-box">
                <div className="box-row" data-testid="farm-address-city">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faLocationDot} />} */}</div>
                  <div className="text">City: {alpaca?.city}</div>
                </div>
              </address>
            </div>
          </section>
          <section className="more">
            <div className="box">
              <h3>Alpaca Detail</h3>
              <Suspense fallback={<p>Loading alpacas...</p>}>
                <AlpacaDetail status={status} alpaca={alpaca} />
              </Suspense>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
