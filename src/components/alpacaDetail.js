export const AlpacaDetail = ({ status, alpaca }) => {
  const color1 = alpaca?.color?.color1?.pretty;
  const color2 = alpaca?.color?.color2?.pretty;
  const color3 = alpaca?.color?.color3?.pretty;
  const colorSolid = alpaca?.color?.colorSolid?.pretty;

  return (
    <section className="inner-box" data-testid={`alpaca-detail-${status}`} id={`alpaca-id-${alpaca?.alpacaId}`}>
      <div className="box-row">
        <div className="icon">🦙</div>
        <div className="wrapper">
          <div className="content">
            <h4 className="heading">Registered name</h4>
            <div className="text">{alpaca?.alpacaRegisteredName}</div>
          </div>

          <div className="content">
            <h4 className="heading">Short name</h4>
            <div className="text">{alpaca?.alpacaShortName}</div>
          </div>

          {alpaca?.gender && (
            <div className="content">
              <h4 className="heading">Gender</h4>
              <div className="text">{alpaca?.gender}</div>
            </div>
          )}

          {alpaca?.DOB?.pretty && (
            <div className="content">
              <h4 className="heading">DOB</h4>
              <div className="text">{alpaca?.DOB?.pretty}</div>
            </div>
          )}

          {alpaca?.DOD?.pretty && (
            <div className="content">
              <h4 className="heading">DOD</h4>
              <div className="text">{alpaca?.DOD?.pretty}</div>
            </div>
          )}

          {alpaca?.breed && (
            <div className="content">
              <h4 className="heading">Breed</h4>
              <div className="text">{alpaca?.breed}</div>
            </div>
          )}

          {alpaca?.status && (
            <div className="content">
              <h4 className="heading">Status</h4>
              <div className="text">{alpaca?.status}</div>
            </div>
          )}

          {alpaca?.tagId && (
            <div className="content">
              <h4 className="heading">Tag Id</h4>
              <div className="text">{alpaca?.tagId}</div>
            </div>
          )}

          {alpaca?.tagColor && (
            <div className="content">
              <h4 className="heading">Tag Colour</h4>
              <div className="text">{alpaca?.tagColor}</div>
            </div>
          )}

          {alpaca?.microchipNumber && (
            <div className="content">
              <h4 className="heading">Tag Microchip Number</h4>
              <div className="text">{alpaca?.microchipNumber}</div>
            </div>
          )}

          {alpaca?.microchipLOC && (
            <div className="content">
              <h4 className="heading">Tag Microchip LOC</h4>
              <div className="text">{alpaca?.microchipLOC}</div>
            </div>
          )}

          {color1 && (
            <div className="content">
              <h4 className="heading">Colour 1</h4>
              <div className="text">{color1}</div>
            </div>
          )}

          {color2 && (
            <div className="content">
              <h4 className="heading">Colour 2</h4>
              <div className="text">{color2}</div>
            </div>
          )}

          {color3 && (
            <div className="content">
              <h4 className="heading">Colour 3</h4>
              <div className="text">{color3}</div>
            </div>
          )}

          {colorSolid && (
            <div className="content">
              <h4 className="heading">Colour Solid</h4>
              <div className="text">{colorSolid}</div>
            </div>
          )}

          {alpaca?.descriptionAlpaca && (
            <div className="content">
              <h4 className="heading">Description</h4>
              <div className="text">{alpaca?.descriptionAlpaca}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
