// strudel-music.ts - 曲全体を演奏するファイル
import { build } from "./parts/build";
import { intro } from "./parts/intro";

arrange([32, intro], [32, build]);
