// The two following lines are due here due to: https://github.com/lit/lit/issues/4771
import {HTMLElement} from '@lit-labs/ssr-dom-shim';
globalThis.HTMLElement ??= HTMLElement;

import { AlpacaMap } from "@/components/map.js";

export default function Home() {
  return (
    <main>
      <AlpacaMap apikey="AIzaSyDRbvgttCBwylkqM9mcdBM5FoFEUKinng0"></AlpacaMap>
    </main>
  );
}
