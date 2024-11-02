import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCircleInfo,
  faCross,
  faHeart,
  faMicrochip,
  faPalette,
  faPaw,
  faTag,
  faTags,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

import { AlapacaDetailRow } from "./alpacaDetailRow";

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
      {alpaca?.alpacaRegisteredName && (
        <AlapacaDetailRow
          name="Registered Name"
          value={alpaca?.alpacaRegisteredName}
          icon="🦙"
        />
      )}

      {alpaca?.alpacaShortName && (
        <AlapacaDetailRow
          name="Short Name"
          value={alpaca?.alpacaShortName}
          icon="🦙"
        />
      )}

      {alpaca?.gender && (
        <AlapacaDetailRow
          name="Gender"
          value={alpaca?.gender}
          icon={<FontAwesomeIcon icon={faVenusMars} />}
        />
      )}

      {alpaca?.DOB?.pretty && (
        <AlapacaDetailRow
          name="DOB"
          value={alpaca?.DOB?.pretty}
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
        />
      )}

      {alpaca?.DOD?.pretty && (
        <AlapacaDetailRow
          name="DOD"
          value={alpaca?.DOD?.pretty}
          icon={<FontAwesomeIcon icon={faCross} />}
        />
      )}

      {alpaca?.breed && (
        <AlapacaDetailRow
          name="Breed"
          value={alpaca?.breed}
          icon={<FontAwesomeIcon icon={faPaw} />}
        />
      )}

      {alpaca?.status && (
        <AlapacaDetailRow
          name="Status"
          value={alpaca?.status}
          icon={<FontAwesomeIcon icon={faHeart} />}
        />
      )}

      {alpaca?.tagId && (
        <AlapacaDetailRow
          name="Tag Id"
          value={alpaca?.tagId}
          icon={<FontAwesomeIcon icon={faTag} />}
        />
      )}

      {alpaca?.tagColor && (
        <AlapacaDetailRow
          name="Tag Colour"
          value={alpaca?.tagColor}
          icon={<FontAwesomeIcon icon={faTags} />}
        />
      )}

      {alpaca?.microchipNumber && (
        <AlapacaDetailRow
          name="Tag Microchip Number"
          value={alpaca?.microchipNumber}
          icon={<FontAwesomeIcon icon={faMicrochip} />}
        />
      )}

      {alpaca?.microchipLOC && (
        <AlapacaDetailRow
          name="Tag Microchip LOCL"
          value={alpaca?.microchipLOC}
          icon={<FontAwesomeIcon icon={faMicrochip} />}
        />
      )}

      {color1 && (
        <AlapacaDetailRow
          name="Colour 1"
          value={color1}
          icon={<FontAwesomeIcon icon={faPalette} />}
        />
      )}

      {color2 && (
        <AlapacaDetailRow
          name="Colour 2"
          value={color2}
          icon={<FontAwesomeIcon icon={faPalette} />}
        />
      )}

      {color3 && (
        <AlapacaDetailRow
          name="Colour 3"
          value={color3}
          icon={<FontAwesomeIcon icon={faPalette} />}
        />
      )}

      {colorSolid && (
        <AlapacaDetailRow
          name="Colour Solid"
          value={colorSolid}
          icon={<FontAwesomeIcon icon={faPalette} />}
        />
      )}

      {alpaca?.descriptionAlpaca && (
        <AlapacaDetailRow
          name="Description"
          value={alpaca?.descriptionAlpaca}
          icon={<FontAwesomeIcon icon={faCircleInfo} />}
        />
      )}
    </section>
  );
};
