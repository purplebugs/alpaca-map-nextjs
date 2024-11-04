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
            <h3>Farm Overview</h3>
            <div data-testid="farm-public-private">
              <div>
                <div>
                  {farm?.public === true ? (
                    <FontAwesomeIcon icon={faHouseFlag} />
                  ) : (
                    <FontAwesomeIcon icon={faKey} />
                  )}
                </div>
                <div>
                  {farm?.public === true ? "Public Farm" : "Private Farm"}
                </div>
              </div>
            </div>

            {farm?.url && (
              <address data-testid="farm-address-webpage">
                <div>
                  <div>
                    <div>
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <div>
                      <a
                        href={farm?.url?.full}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="farm-webpage-link"
                      >
                        {farm?.url?.pretty}{" "}
                        <span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </address>
            )}

            <address data-testid="farm-address">
              <div data-testid="farm-address-city">
                <div>{<FontAwesomeIcon icon={faLocationDot} />}</div>
                <div>City: {farm?.city}</div>
              </div>
              <div data-testid="farm-address-street">
                <div>{<FontAwesomeIcon icon={faRoad} />}</div>
                <div> Address: {farm?.location?.google?.formatted_address}</div>
              </div>
              <div data-testid="farm-address-email">
                <div>{<FontAwesomeIcon icon={faEnvelope} />}</div>
                <div> Email: {farm?.email}</div>
              </div>
            </address>

            {farmDirections && (
              <address data-testid="farm-directions">
                <div>
                  <div>
                    <div>
                      <FontAwesomeIcon icon={faCar} />
                    </div>
                    <div>
                      <a
                        href={farmDirections}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="farm-directions-link"
                      >
                        Directions
                        <span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </address>
            )}
          </section>
          <section className="p-4 border border-2 border-brown-100 rounded-xl shadow-lg">
            <h3>Alpaca Overview</h3>
            <div data-testid="alpaca-count">
              <div>
                <div>🦙</div>
                <div>Alpacas: {farm.count?.alpacas?.status?.active}</div>
              </div>
            </div>
            <div data-testid="alpaca-gender">
              <div>
                <div>{<FontAwesomeIcon icon={faVenusMars} />}</div>
                <div>
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
            </div>
            <div data-testid="alpaca-colour">
              <div>
                <div>{<FontAwesomeIcon icon={faPalette} />}</div>
                <div>
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
