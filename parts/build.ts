import {
  bass,
  clap,
  hats,
  kick,
  shaker,
  synth,
} from "../common";

// 1. 本編ドロップ（16小節）：すべてのフィルターを解禁し、シェイカーを加えて疾走感を出します
export const buildGroove = stack(
  kick,
  hats,
  clap,
  bass.lpf(800).room(0.5),
  shaker,
);

// 2. ウワモノ導入（16小節）：シンセを追加。最初は300Hzでこもらせて不穏な気配を演出
export const buildLow = stack(
  buildGroove,
  synth.lpf(300),
);

// 3. フィルター解放（16小節）：16小節かけてシンセのフィルターを300Hzから1200Hzまで徐々に開きます
export const buildRise = stack(
  buildGroove,
  synth.lpf(saw.range(300, 1200).slow(16)),
);

// 4. ピーク（16小節）：フィルターが開いたシンセに、遅延エコー（ディレイ）を深くかけて空間を包み込みます
export const buildPeak = stack(
  buildGroove,
  synth.lpf(1200).delay(0.3).delayfeedback(0.5),
);

// === 🆕 ② ビルドセクション（32小節）===
export const build = arrange(
  [16, buildGroove.color("paleturquoise")],
  [16, buildLow.color("khaki")],
  [16, buildRise.color("plum")],
  [16, buildPeak.color("indianred")],
);
