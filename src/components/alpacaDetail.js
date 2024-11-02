import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faHeart,
  faMars,
  faNeuter,
  faPalette,
  faPaw,
  faTag,
  faTags,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

export const AlpacaDetail = ({ status, alpaca }) => {
  const color1 = alpaca?.color?.color1?.pretty;
  const color2 = alpaca?.color?.color2?.pretty;
  const color3 = alpaca?.color?.color3?.pretty;
  const colorSolid = alpaca?.color?.colorSolid?.pretty;

  return (
    <section
      data-testid={`alpaca-detail-${status}`}
      id={`alpaca-id-${alpaca?.alpacaId}`}
      className="space-y-4"
    >
      <div className="grid grid-cols-[2rem,auto]">
        <div className="text-center">🦙</div>
        <div className="text-left">
          <h4>Registered name</h4>
          <div>{alpaca?.alpacaRegisteredName}</div>
        </div>
      </div>

      <div className="grid grid-cols-[2rem,auto]">
        <div className="text-center">🦙</div>
        <div className="text-left">
          <h4>Short name</h4>
          <div>{alpaca?.alpacaShortName}</div>
        </div>
      </div>

      {alpaca?.gender && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faVenusMars} />
          </div>
          <div className="text-left">
            <h4>Gender</h4>
            <div>{alpaca?.gender}</div>
          </div>
        </div>
      )}

      {alpaca?.DOB?.pretty && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div className="text-left">
            <h4>DOB</h4>
            <div>{alpaca?.DOB?.pretty}</div>
          </div>{" "}
        </div>
      )}

      {alpaca?.DOD?.pretty && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div className="text-left">
            <h4>DOD</h4>
            <div>{alpaca?.DOD?.pretty}</div>
          </div>{" "}
        </div>
      )}

      {alpaca?.breed && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faPaw} />
          </div>
          <div className="text-left">
            <h4>Breed</h4>
            <div>{alpaca?.breed}</div>
          </div>{" "}
        </div>
      )}

      {alpaca?.status && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="text-left">
            <h4>Status</h4>
            <div>{alpaca?.status}</div>
          </div>{" "}
        </div>
      )}

      {alpaca?.tagId && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faTag} />
          </div>
          <div className="text-left">
            <h4>Tag Id</h4>
            <div>{alpaca?.tagId}</div>
          </div>{" "}
        </div>
      )}
      {alpaca?.tagColor && (
        <div className="grid grid-cols-[2rem,auto]">
          <div className="text-center">
            <FontAwesomeIcon icon={faTags} />
          </div>
          <div className="text-left">
            <h4>Tag Colour</h4>
            <div>{alpaca?.tagColor}</div>
          </div>{" "}
        </div>
      )}

      {alpaca?.microchipNumber && (
        <div>
          <h4>Tag Microchip Number</h4>
          <div>{alpaca?.microchipNumber}</div>
        </div>
      )}

      {alpaca?.microchipLOC && (
        <div>
          <h4>Tag Microchip LOC</h4>
          <div>{alpaca?.microchipLOC}</div>
        </div>
      )}

      {color1 && (
        <div>
          <h4>Colour 1</h4>
          <div>{color1}</div>
        </div>
      )}

      {color2 && (
        <div>
          <h4>Colour 2</h4>
          <div>{color2}</div>
        </div>
      )}

      {color3 && (
        <div>
          <h4>Colour 3</h4>
          <div>{color3}</div>
        </div>
      )}

      {colorSolid && (
        <div>
          <h4>Colour Solid</h4>
          <div>{colorSolid}</div>
        </div>
      )}

      {alpaca?.descriptionAlpaca && (
        <div>
          <h4>Description</h4>
          <div>{alpaca?.descriptionAlpaca}</div>
        </div>
      )}
    </section>
  );
};
