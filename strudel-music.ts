// strudel-music.ts - 曲全体を演奏するファイル
import { kick, hats, bass, clap } from "./common";

const intro = arrange(
  [8, kick.lpf(200).lpq(0.1)],
  [8, stack(kick.lpf(400).lpq(0.1), hats)],
  [
    8,
    stack(
      kick.lpf(600).lpq(0.1),
      hats,
      bass.lpf(600).room(0.5),
    ),
  ],
  [
    7,
    stack(
      kick.lpf(1000).lpq(0.1),
      hats,
      bass.lpf(600).room(0.5),
      clap,
    ),
  ],
  [
    1,
    stack(
      hats,
      bass.lpf(600).room(0.5),
      clap,
    ).mask("[1 1 1 ~]"),
  ],
);

arrange([32, intro]);
