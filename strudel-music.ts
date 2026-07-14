// strudel-music.ts - 曲全体を演奏するファイル
import { intro } from "./parts/intro";
import { build } from "./parts/build";

arrange([32, intro], [32, build])._punchcard();
