import {
  kick,
  hats,
  bass,
  clap,
} from "../common";

// parts/intro.ts

// 1. 各段階を定義
export const introKick = kick.lpf(200).lpq(0.1);

export const introHats = stack(
  kick.lpf(400).lpq(0.1),
  hats,
);

export const introBass = stack(
  kick.lpf(600).lpq(0.1),
  hats,
  bass.lpf(600).room(0.5),
);

export const introFull = stack(
  kick.lpf(1000).lpq(0.1),
  hats,
  bass.lpf(600).room(0.5),
  clap,
);

// 最後の1小節：キックを抜き、maskで最後の拍をカットするブレイク
export const introBreak = stack(
  hats,
  bass.lpf(600).room(0.5),
  clap,
).mask("[1 1 1 ~]");

// 2. アレンジメントに流し込み、ビジュアライザ用に色分けする
export const intro = arrange(
  [8, introKick.color("paleturquoise")], // 青：キックのみ
  [8, introHats.color("khaki")], // 緑：ハット追加
  [8, introBass.color("plum")], // 紫：ベース追加
  [7, introFull.color("indianred")], // 黄：クラップ追加（フル）
  [1, introBreak.color("mistyrose")], // 赤：ブレイク（キメ）
);
