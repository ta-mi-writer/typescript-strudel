// common.ts - 共通の素材定義ファイル

setcpm(126 / 4);

export const drum = "RolandTR909";

export const kick = sound("bd*4")
  .bank(drum)
  .gain(0.5);

export const hats = sound("[~ hh]*4")
  .bank(drum)
  .gain(0.6);

export const clap = sound("~ cp")
  .bank(drum)
  .fast(2)
  .gain(0.5);

export const bass = note(
  "[~ ~ c2 c2]*2 [~ ~ db2 db2]*2",
)
  .sound("gm_acoustic_bass")
  .gain(0.6);

// === 🆕 ビルド用に追加する新しい素材 ===
// 1. 細かい16分音符で刻むシェイカー（全体の疾走感をドライブさせます）
export const shaker = sound("sh*8").gain(0.25);

// 2. 不穏なマイナーキーのシンセ（1拍4分割の隙間を縫うようなポコポコしたフレーズ）
export const synth = note(
  "[c3 ~ eb3 c3] [~ f3 c3 ~]",
)
  .sound("sawtooth")
  .gain(0.22);
