// strudel-music.ts - 曲全体を演奏するファイル
import { intro } from "./parts/intro";
import { build } from "./parts/build";
import { breakPart } from "./parts/break";

arrange(
  [32, intro],
  [64, build],
  [16, breakPart],
)._punchcard();
