# Portfolio social preview

The shared preview uses `src/app/opengraph-image.jpg` through Next.js file-based metadata. It replaces the previous gradient image whose left-aligned text was clipped in LinkedIn Featured cards.

The image is 1536 × 1024. The name and subtitle are centered; the four sculptural motifs reference the existing ai-squad, SoundWave Summit, aiOS and Squadhouse covers. The 3:2 composition allows the narrower Featured crop without clipping the name. LinkedIn's existing Featured entry also receives this image directly because its uploaded thumbnail does not automatically follow site metadata.

Generated with the built-in ImageGen tool using the four project covers as references. The exact prompt is in `social-preview-prompt.txt`. The optimized JPEG is the production asset; the original generation is retained outside the repository.
