import { AlpacaDetail } from "@/components/alpacaDetail";

// TODO error handling, loading state. eg alpacas.map() without chaining operator "?" throws error
export const AlpacasDetail = ({ status, alpacas }) => {
  return alpacas?.map((alpaca) => <AlpacaDetail status={status} alpaca={alpaca} />);
};
