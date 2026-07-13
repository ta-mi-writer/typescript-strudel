// strudel-kick.ts - キック単体を演奏するファイル
import { kick } from "./common";

$: kick.fast(slider(1, 0.25, 4, 0.25));
