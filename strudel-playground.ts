import {
  intro,
  introBass,
  introBreak,
  introFull,
  introHats,
  introKick,
} from "./parts/intro";

$: intro._punchcard();

_$: introKick._punchcard();
_$: introHats._punchcard();
_$: introBass._punchcard();
_$: introFull._punchcard();
_$: introBreak._punchcard();
