// common.ts - 共通の素材定義ファイル

setcpm(126 / 4);

export const drum = "RolandTR909";

export const kick = sound("bd*4")
  .bank(drum)
  .gain(0.8);

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
