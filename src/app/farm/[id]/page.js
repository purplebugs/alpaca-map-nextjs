import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCar,
  faEnvelope,
  faGlobe,
  faHouseFlag,
  faKey,
  faLocationDot,
  faPalette,
  faRoad,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import db from "@/functions/db.js";
import { AlpacasDetail } from "@/components/alpacasDetail.js";
import { Suspense } from "react";

export default async function Page({ params }) {
  // TODO error handling when getting data.
  // See old repo https://github.com/purplebugs/alpaca-map/blob/main/client/src/pages/Alpaca.js#L12
  const result = await db.getCompany(params.id);
  const farm = result[0];
  const alpacasActive = farm?.alpacas?.status?.active;
  const alpacasDead = farm?.alpacas?.status?.dead;
  const alpacasExport = farm?.alpacas?.status?.export;
  const farmDirections = farm?.location?.google?.directions_url_href
    ? farm?.location?.google?.directions_url_href
    : null;

  return (
    <>
      <header>
        <h2 className="text-4xl font-bold text-center tracking-tight text-black-almost sm:text-6xl pt-2">
          {farm?.name}
        </h2>
      </header>
      <main>
        <article
          id="farm"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          <section className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Farm Overview
              </h3>

              <div
                data-testid="farm-public-private"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">
                  {farm?.public === true ? (
                    <FontAwesomeIcon icon={faHouseFlag} />
                  ) : (
                    <FontAwesomeIcon icon={faKey} />
                  )}
                </div>
                <div className="text-left">
                  {farm?.public === true ? "Public Farm" : "Private Farm"}
                </div>
              </div>

              {farm?.url && (
                <address>
                  <div
                    data-testid="farm-address-webpage"
                    className="grid grid-cols-[2rem,auto]"
                  >
                    <div className="text-center">
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <div className="text-left">
                      <Link
                        href={farm?.url?.full}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="farm-webpage-link"
                        className="text-blue-dark underline hover:underline hover:decoration-8"
                      >
                        {farm?.url?.pretty}{" "}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </Link>
                    </div>
                  </div>
                </address>
              )}

              <address data-testid="farm-address" className="space-y-4">
                <div
                  data-testid="farm-address-city"
                  className="grid grid-cols-[2rem,auto]"
                >
                  <div className="text-center">
                    {<FontAwesomeIcon icon={faLocationDot} />}
                  </div>
                  <div className="text-left">City: {farm?.city}</div>
                </div>

                <div
                  data-testid="farm-address-street"
                  className="grid grid-cols-[2rem,auto]"
                >
                  <div className="text-center">
                    {<FontAwesomeIcon icon={faRoad} />}
                  </div>
                  <div className="text-left">
                    {" "}
                    Address: {farm?.location?.google?.formatted_address}
                  </div>
                </div>

                <div
                  data-testid="farm-address-email"
                  className="grid grid-cols-[2rem,auto]"
                >
                  <div className="text-center">
                    {<FontAwesomeIcon icon={faEnvelope} />}
                  </div>
                  <div className="text-left"> Email: {farm?.email}</div>
                </div>
              </address>

              {farmDirections && (
                <address data-testid="farm-directions">
                  <div className="grid grid-cols-[2rem,auto]">
                    <div className="text-center">
                      <FontAwesomeIcon icon={faCar} />
                    </div>
                    <div className="text-left">
                      <Link
                        href={farmDirections}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="farm-directions-link"
                        className="text-blue-dark underline hover:underline hover:decoration-8"
                      >
                        Directions{" "}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </Link>
                    </div>
                  </div>
                </address>
              )}
            </div>
          </section>

          <section className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold leading-loose tracking-tight">
                Alpaca Overview
              </h3>
              <div
                data-testid="alpaca-count"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">🦙</div>
                <div className="text-left">
                  Alpacas: {farm.count?.alpacas?.status?.active}
                </div>
              </div>

              <div
                data-testid="alpaca-gender"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">
                  {<FontAwesomeIcon icon={faVenusMars} />}
                </div>
                <div className="text-left">
                  <ul>
                    {farm?.aggregations?.alpacas?.gender?.buckets.map(
                      (bucket) => {
                        return (
                          <li key={bucket?.key}>
                            {bucket?.key} - {bucket?.doc_count}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>

              <div
                data-testid="alpaca-colour"
                className="grid grid-cols-[2rem,auto]"
              >
                <div className="text-center">
                  {<FontAwesomeIcon icon={faPalette} />}
                </div>
                <div className="text-left">
                  <ul>
                    {farm?.aggregations?.alpacas?.color1?.buckets.map(
                      (bucket) => {
                        return (
                          <li key={bucket?.key}>
                            {bucket?.key} - {bucket?.doc_count}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg md:col-span-2">
            {alpacasActive?.length === 0 ? null : (
              <>
                <h3 className="text-2xl font-bold leading-loose tracking-tight">
                  Alpacas
                </h3>
                <div className="divide-y-2 divide-brown-200">
                  <Suspense fallback={<p>Loading alpacas...</p>}>
                    <AlpacasDetail status="active" alpacas={alpacasActive} />
                  </Suspense>
                </div>
              </>
            )}

            {alpacasDead?.length === 0 ? null : (
              <>
                <h3 className="text-2xl font-bold leading-loose tracking-tight">
                  Alpacas - Dead
                </h3>
                <div className="divide-y-2 divide-brown-200">
                  <Suspense fallback={<p>Loading alpacas...</p>}>
                    <AlpacasDetail status="dead" alpacas={alpacasDead} />
                  </Suspense>
                </div>
              </>
            )}

            {alpacasExport?.length === 0 ? null : (
              <>
                <h3 className="text-2xl font-bold leading-loose tracking-tight">
                  Alpacas - Export
                </h3>
                <div className="divide-y-2 divide-brown-200">
                  <Suspense fallback={<p>Loading alpacas...</p>}>
                    <AlpacasDetail status="dead" alpacas={alpacasExport} />
                  </Suspense>{" "}
                </div>
              </>
            )}
          </section>
        </article>
      </main>
    </>
  );
}
