// app/fonts.ts
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '700'],
  // 'optional' lets the browser paint with the metric-adjusted fallback and
  // never swap to Montserrat if it misses the ~100ms window. The preloaded
  // font still applies on most visits; on a slow first load it stays on the
  // fallback instead of shifting the whole page. Kills the font-load CLS.
  display: 'optional',
})

export const fonts = {
  montserrat,
}