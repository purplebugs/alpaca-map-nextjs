export const AlapacaDetailRow = ({ name, value, icon }) => {
  return (
    <>
      <div className="grid grid-cols-[2rem,auto]">
        <div className="text-center">{icon}</div>
        <div className="sm:grid sm:grid-cols-[10rem,auto]">
          <h4>{name}</h4>
          <div>{value}</div>
        </div>
      </div>
    </>
  );
};
