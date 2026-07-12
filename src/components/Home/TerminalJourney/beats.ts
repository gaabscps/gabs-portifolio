export type Beat =
  | { kind: "cmd"; weight: number }
  | { kind: "tool"; weight: number }
  | { kind: "item"; weight: number; index: number }
  | { kind: "end"; weight: number };

// One beat for the command, one for the tool call, one per streamed item,
// one for the end/handover dwell.
export function buildBeats(itemCount: number): Beat[] {
  const beats: Beat[] = [
    { kind: "cmd", weight: 1.1 },
    { kind: "tool", weight: 0.8 },
  ];
  for (let i = 0; i < itemCount; i++) beats.push({ kind: "item", weight: 1, index: i });
  beats.push({ kind: "end", weight: 1.2 });
  return beats;
}

// Maps each beat to a [start, end] slice of the scroll progress window.
export function beatBounds(beats: Beat[], start: number, end: number): [number, number][] {
  const total = beats.reduce((a, b) => a + b.weight, 0);
  const bounds: [number, number][] = [];
  let acc = 0;
  for (const b of beats) {
    const a = start + (acc / total) * (end - start);
    acc += b.weight;
    bounds.push([a, start + (acc / total) * (end - start)]);
  }
  return bounds;
}
