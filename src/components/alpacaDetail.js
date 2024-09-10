export const AlpacaDetail = ({ status, alpaca }) => {
  const color1 = alpaca?.color?.color1?.pretty;
  const color2 = alpaca?.color?.color2?.pretty;
  const color3 = alpaca?.color?.color3?.pretty;
  const colorSolid = alpaca?.color?.colorSolid?.pretty;

  return (
    <section
      data-testid={`alpaca-detail-${status}`}
      id={`alpaca-id-${alpaca?.alpacaId}`}
    >
      <div>
        <div>🦙</div>
        <div>
          <div>
            <h4>Registered name</h4>
            <div>{alpaca?.alpacaRegisteredName}</div>
          </div>

          <div>
            <h4>Short name</h4>
            <div>{alpaca?.alpacaShortName}</div>
          </div>

          {alpaca?.gender && (
            <div>
              <h4>Gender</h4>
              <div>{alpaca?.gender}</div>
            </div>
          )}

          {alpaca?.DOB?.pretty && (
            <div>
              <h4>DOB</h4>
              <div>{alpaca?.DOB?.pretty}</div>
            </div>
          )}

          {alpaca?.DOD?.pretty && (
            <div>
              <h4>DOD</h4>
              <div>{alpaca?.DOD?.pretty}</div>
            </div>
          )}

          {alpaca?.breed && (
            <div>
              <h4>Breed</h4>
              <div>{alpaca?.breed}</div>
            </div>
          )}

          {alpaca?.status && (
            <div>
              <h4>Status</h4>
              <div>{alpaca?.status}</div>
            </div>
          )}

          {alpaca?.tagId && (
            <div>
              <h4>Tag Id</h4>
              <div>{alpaca?.tagId}</div>
            </div>
          )}

          {alpaca?.tagColor && (
            <div>
              <h4>Tag Colour</h4>
              <div>{alpaca?.tagColor}</div>
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
        </div>
      </div>
    </section>
  );
};
