import { hats, shaker, synth } from "../common";

// 1. 浮遊（8小節）：低音を抜き、ディレイとリバーブ（.room）を深くかけたシンセで包み込みます
export const breakFloat = stack(
  hats,
  shaker,
  synth
    .lpf(1200)
    .delay(0.4)
    .delayfeedback(0.6)
    .room(0.7),
);

// 2. 深まり（7小節）：シンセのフィルターを少し広げ（1500Hz）、さらにディレイを深くして空間の霧を濃くします
export const breakDrift = stack(
  hats,
  shaker,
  synth
    .lpf(1500)
    .delay(0.5)
    .delayfeedback(0.7)
    .room(0.8),
);

// 3. 静寂（1小節）：1拍目だけ「チッ」とハットとシンセが鳴り、残り3拍は吸い込まれるような完全な無音（真空状態）を作ります
export const breakSilence = stack(
  hats,
  synth
    .lpf(1500)
    .delay(0.5)
    .delayfeedback(0.7)
    .room(0.8),
).mask("[1 ~ ~ ~]");

export const breakPart = arrange(
  [8, breakFloat.color("thistle")],
  [7, breakDrift.color("darkcyan")],
  [1, breakSilence.color("aquamarine")],
);
