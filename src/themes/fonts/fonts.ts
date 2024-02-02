// app/fonts.ts
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700']
})

export const fonts = {
  roboto,
}