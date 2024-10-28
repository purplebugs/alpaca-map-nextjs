// The two following lines are due to this issue in next.js and web components: https://github.com/vercel/next.js/issues/70502 
// This is a workaround: https://github.com/lit/lit/issues/4771
// When React 19, or with a later version of Lit, this workaround is probably not needed and this can be removed.
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
