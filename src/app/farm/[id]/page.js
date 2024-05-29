import { db } from "@/functions/db.js";
import { AlpacaDetail } from "@/components/alpacaDetail.js";
import { AlpacasDetail } from "@/components/alpacasDetail.js";
import { Suspense } from "react";

export default async function Page({ params }) {
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
        <h2>{farm?.name}</h2>
      </header>
      <main>
        <article id="farm">
          <section className="overview">
            <div className="box">
              <h3>Farm Overview</h3>
              <div className="inner-box" data-testid="farm-public-private">
                <div className="box-row">
                  <div className="icon">
                    {/* {farm?.public === true ? <FontAwesomeIcon icon={faHouseFlag} /> : <FontAwesomeIcon icon={faKey} />} */}
                  </div>
                  <div className="text">{farm?.public === true ? "Public Farm" : "Private Farm"}</div>
                </div>
              </div>

              {farm?.url && (
                <address data-testid="farm-address-webpage">
                  <div className="inner-box">
                    <div className="box-row">
                      <div className="icon">{/* <FontAwesomeIcon icon={faGlobe} /> */}</div>
                      <div className="text">
                        <a href={farm?.url?.full} target="_blank" rel="noreferrer" data-testid="farm-webpage-link">
                          {farm?.url?.pretty}{" "}
                          <span className="icon link-arrow">
                            {/* <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> */}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </address>
              )}

              <address data-testid="farm-address" className="inner-box">
                <div className="box-row" data-testid="farm-address-city">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faLocationDot} />} */}</div>
                  <div className="text">City: {farm?.city}</div>
                </div>
                <div className="box-row" data-testid="farm-address-street">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faRoad} />} */}</div>
                  <div className="text"> Address: {farm?.location?.google?.formatted_address}</div>
                </div>
                <div className="box-row" data-testid="farm-address-email">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faEnvelope} />} */}</div>
                  <div className="text"> Email: {farm?.email}</div>
                </div>
              </address>

              {farmDirections && (
                <address data-testid="farm-directions">
                  <div className="inner-box">
                    <div className="box-row">
                      <div className="icon">{/* <FontAwesomeIcon icon={faCar} /> */}</div>
                      <div className="text">
                        <a href={farmDirections} target="_blank" rel="noreferrer" data-testid="farm-directions-link">
                          Directions
                          <span className="icon link-arrow">
                            {/* <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> */}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </address>
              )}
            </div>
          </section>
          <section className="more">
            <div className="box">
              <h3>Alpaca Overview</h3>
              <div className="inner-box" data-testid="alpaca-count">
                <div className="box-row">
                  <div className="icon">🦙</div>
                  <div className="text">Alpacas: {farm.count?.alpacas?.status?.active}</div>
                </div>
              </div>
              <div className="inner-box" data-testid="alpaca-gender">
                <div className="box-row">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faVenusMars} />} */}</div>
                  <div className="text">
                    <ul>
                      {farm?.aggregations?.alpacas?.gender?.buckets.map((bucket) => {
                        return (
                          <li key={bucket?.key}>
                            {bucket?.key} - {bucket?.doc_count}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="inner-box" data-testid="alpaca-colour">
                <div className="box-row">
                  <div className="icon">{/* {<FontAwesomeIcon icon={faPalette} />} */}</div>
                  <div className="text">
                    <ul>
                      {farm?.aggregations?.alpacas?.color1?.buckets.map((bucket) => {
                        return (
                          <li key={bucket?.key}>
                            {bucket?.key} - {bucket?.doc_count}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {alpacasActive?.length === 0 ? null : (
              <div className="box">
                <h3>Alpacas</h3>
                <Suspense fallback={<p>Loading alpacas...</p>}>
                  <AlpacasDetail status="active" alpacas={alpacasActive} />
                </Suspense>
              </div>
            )}

            {alpacasDead?.length === 0 ? null : (
              <div className="box">
                <h3>Alpacas - Dead</h3>
                <Suspense fallback={<p>Loading alpacas...</p>}>
                  <AlpacasDetail status="dead" alpacas={alpacasDead} />
                </Suspense>
              </div>
            )}

            {alpacasExport?.length === 0 ? null : (
              <div className="box">
                <h3>Alpacas - Export</h3>
                <Suspense fallback={<p>Loading alpacas...</p>}>
                  <AlpacasDetail status="dead" alpacas={alpacasExport} />
                </Suspense>
              </div>
            )}
          </section>
        </article>
      </main>
    </>
  );
}
