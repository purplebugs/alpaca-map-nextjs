import { generateImageParams } from "@/functions/generateImageParams";
import { AlpacaDetail } from "@/components/alpacaDetail.js";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import db from "@/functions/db.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHouseFlag,
  faKey,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default async function Page({ params }) {
  // TODO error handling when getting data.
  // See old repo https://github.com/purplebugs/alpaca-map/blob/main/client/src/pages/Alpaca.js#L12

  const result = await db.getAnimal(params.id);
  const alpaca = result[0];
  const color = alpaca?.color?.color1?.original;
  const imageProps = generateImageParams(color);

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
        <h2 className="text-4xl font-bold text-center tracking-tight text-black-almost sm:text-6xl pt-2">
          {alpaca?.alpacaShortName}
        </h2>
      </header>
      <main>
        <article
          id="alpaca"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          <div
            data-testid="profile-graphic"
            className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg"
          >
            <Suspense fallback={<p>Loading alpacas...</p>}>
              <Image
                data-testid="profile-graphic-src"
                src={imageProps.source}
                alt={`Alpaca ${alpaca?.alpacaShortName}, graphic generated by AI`}
                width={imageProps.width}
                height={imageProps.height}
              />
            </Suspense>
          </div>

          <div className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg">
            <section className="space-y-4">
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Lives at
              </h3>

              <div
                data-testid="farm-name"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">
                  {" "}
                  {<FontAwesomeIcon icon={faCircleInfo} />}
                </div>
                <div className="text-left">
                  <Link
                    data-testid="farm-name-link"
                    href={`/farm/${alpaca?.companyId}`}
                    className="underline hover:underline hover:decoration-8"
                  >
                    {alpaca?.keeperName}
                  </Link>
                </div>
              </div>

              <div
                data-testid="farm-public-private"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">
                  {alpaca?.public === true ? (
                    <FontAwesomeIcon icon={faHouseFlag} />
                  ) : (
                    <FontAwesomeIcon icon={faKey} />
                  )}
                </div>
                <div className="text-left">
                  {alpaca?.public === true ? "Public Farm" : "Private Farm"}
                </div>
              </div>

              <address>
                <div
                  data-testid="farm-address-city"
                  className="grid grid-cols-[2rem,auto]"
                >
                  <div className="text-center">
                    {<FontAwesomeIcon icon={faLocationDot} />}
                  </div>
                  <div className="text-left">City: {alpaca?.city}</div>
                </div>
              </address>
            </section>
          </div>

          <div className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg md:col-span-2">
            <section className="space-y-4">
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Alpaca Detail
              </h3>
              <Suspense fallback={<p>Loading alpacas...</p>}>
                <AlpacaDetail status={status} alpaca={alpaca} />
              </Suspense>{" "}
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
