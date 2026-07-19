import {
  bass,
  clap,
  hats,
  kick,
  shaker,
  synth,
} from "../common";

// 1. フルパワー・ドロップ（16小節）：真空状態の静寂から、全要素が解放された最もファットな状態
export const peakDrop = stack(
  kick,
  hats,
  clap,
  bass.lpf(1000).room(0.5),
  shaker,
  synth.lpf(1500).delay(0.3).delayfeedback(0.5),
);

// 2. 呼吸（16小節）：4小節の周期でシンセのフィルターが「開く・閉じる」を繰り返し、ウネり（呼吸）を作ります
export const peakBreathe = stack(
  kick,
  hats,
  clap,
  bass.lpf(1000).room(0.5),
  shaker,
  synth
    .lpf(sine.range(1000, 2500).slow(4))
    .delay(0.3)
    .delayfeedback(0.5),
);

// 3. 飽和（16小節）：ディレイのフィードバック（エコーの量）を周期的に変化させ、空間全体を飽和させます
export const peakSwell = stack(
  kick,
  hats,
  clap,
  bass.lpf(1000).room(0.5),
  shaker,
  synth
    .lpf(2000)
    .delay(0.4)
    .delayfeedback(sine.range(0.4, 0.85).slow(8)),
);

// 4. クライマックス（16小節）：次の展開（アウトロ）への予兆として、シンセのフィルターを限界（3500Hz）まで開いていきます
export const peakClimax = stack(
  kick,
  hats,
  clap,
  bass.lpf(1000).room(0.5).gain("0.8 2"),
  shaker,
  synth
    .lpf(saw.range(2000, 3500).slow(16))
    .delay(0.4)
    .delayfeedback(0.6),
);

export const peak = arrange(
  [16, peakDrop.color("lightpink")],
  [16, peakBreathe.color("plum")],
  [16, peakSwell.color("coral")],
  [16, peakClimax.color("crimson")],
);
