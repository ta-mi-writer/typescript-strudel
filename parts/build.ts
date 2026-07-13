import {
  bass,
  clap,
  hats,
  kick,
  shaker,
  synth,
} from "../common";

// === 🆕 ② ビルドセクション（32小節）===
export const build = arrange(
  // 1. 本編ドロップ（8小節）：すべてのフィルターを解禁し、シェイカーを加えて疾走感を出します
  [
    8,
    stack(
      kick,
      hats,
      clap,
      bass.lpf(800).room(0.5),
      shaker,
    ),
  ],

  // 2. ウワモノ導入（8小節）：シンセを追加。最初は300Hzでこもらせて不穏な気配を演出
  [
    8,
    stack(
      kick,
      hats,
      clap,
      bass.lpf(800).room(0.5),
      shaker,
      synth.lpf(300),
    ),
  ],

  // 3. フィルター解放（8小節）：8小節かけてシンセのフィルターを300Hzから1200Hzまで徐々に開きます
  [
    8,
    stack(
      kick,
      hats,
      clap,
      bass.lpf(800).room(0.5),
      shaker,
      synth.lpf(saw.range(300, 1200).slow(8)),
    ),
  ],

  // 4. ピーク（8小節）：フィルターが開いたシンセに、遅延エコー（ディレイ）を深くかけて空間を包み込みます
  [
    8,
    stack(
      kick,
      hats,
      clap,
      bass.lpf(800).room(0.5),
      shaker,
      synth
        .lpf(1200)
        .delay(0.3)
        .delayfeedback(0.5),
    ),
  ],
);
