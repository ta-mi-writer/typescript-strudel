// strudel.d.ts - 日本語解説付き Strudel 型定義ファイル

declare class Pattern<T> {
  // ==========================================
  // 1. 音源・音色の選択とコントロール
  // ==========================================

  /**
   * 音色やサンプルフォルダを指定します（s のエイリアスです）。
   * @example .sound("bd hh")
   */
  sound(
    value: string | Pattern<string>,
  ): Pattern<T>;

  /**
   * 使用するサンプル音源のバンク（フォルダ）を指定します。
   * @example .bank("RolandTR909")
   */
  bank(
    value: string | Pattern<string>,
  ): Pattern<T>;

  /**
   * ノート番号（MIDIノートや階名）を指定します（n のエイリアスです）。
   * @example .note("c3 e3 g3")
   */
  note(
    value:
      string | number | Pattern<string | number>,
  ): Pattern<T>;

  // ==========================================
  // 2. 音量・位置・ピッチ
  // ==========================================

  /**
   * 音量（ゲイン）を設定します。通常は 0.0（無音）から 1.0（最大）以上を設定します。
   * @example .gain(0.8)
   */
  gain(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * 左右の定位（パン）を設定します。-1.0 (左端) から 1.0 (右端) で指定します。
   * @example .pan(-0.5) // やや左寄りに配置
   */
  pan(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * 音の再生スピードを設定します。1.0が通常、2.0にするとピッチが1オクターブ上がって倍速になります。
   * @example .speed(1.5)
   */
  speed(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  // ==========================================
  // 3. 時間とリズムのモディファイア
  // ==========================================

  /**
   * パターンの再生スピードを N 倍（早く）します。
   * @example .fast(2) // 2倍速で再生
   */
  fast(
    value: number | Pattern<number>,
  ): Pattern<T>;

  /**
   * パターンの再生スピードを 1/N（遅く）します。
   * @example .slow(2) // 2倍の時間をかけてゆっくり再生
   */
  slow(
    value: number | Pattern<number>,
  ): Pattern<T>;

  /**
   * パターンを時間的に反転（逆再生）させます。
   * @example .rev()
   */
  rev(): Pattern<T>;

  /**
   * パターンを順方向、逆方向の順に交互にループさせます。
   * @example .palindrome()
   */
  palindrome(): Pattern<T>;

  // ==========================================
  // 4. フィルターとエンベロープ
  // ==========================================

  /**
   * ローパスフィルターの遮断周波数（カットオフ）をHzで指定します。低い値にするほどこもった音になります。
   * @example .cutoff(1200)
   */
  cutoff(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * フィルターの共振（レゾナンス）を設定します。高くすると「ミョー」といったクセのある音色になります。
   * @example .resonance(5)
   */
  resonance(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * 音が鳴り始めてから最大音量に達するまでの時間（アタックタイム、秒）を設定します。
   * @example .attack(0.1) // じんわり音が立ち上がる
   */
  attack(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * 音が消えるまでの時間（リリースタイム、秒）を設定します。
   * @example .release(0.5) // 余韻を残して消える
   */
  release(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  // ==========================================
  // 5. エフェクト（ディレイ、残響、音響効果）
  // ==========================================

  /**
   * ディレイ（やまびこ）のウェット量（音量）を設定します。0.0 〜 1.0。
   * @example .delay(0.5)
   */
  delay(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * ディレイのフィードバック量（やまびこの回数）を設定します。1.0に近づくほど長く響きます。
   * @example .delayfeedback(0.6)
   */
  delayfeedback(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * リバーブ（残響・コーラス効果）のウェット量を設定します。0.0 〜 1.0。
   * @example .room(0.4)
   */
  room(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * リバーブが響く部屋のサイズを設定します。1.0に近づくほど大きな空間（ホール等）を模倣します。
   * @example .size(0.8)
   */
  size(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * 音質を粗くし、ファミコンのようなレトロでざらざらしたビットクラッシュ効果を与えます。
   * @example .coarse(8) // 8ビット風の音質に
   */
  coarse(
    value: number | Pattern<number> | string,
  ): Pattern<T>;

  /**
   * フォルマントフィルターを適用し、母音のような特徴的な音色（"a", "e", "i", "o", "u"）に変化させます。
   * @example .vowel("a")
   */
  vowel(
    value: string | Pattern<string>,
  ): Pattern<T>;

  // ==========================================
  // 6. 条件分岐・ランダム・特殊効果
  // ==========================================

  /**
   * N サイクルに1回のペースで、指定した加工（関数）を適用します。
   * @example .every(4, p => p.fast(2)) // 4サイクルに1回、倍速にする
   */
  every(
    n: number,
    fn: (p: Pattern<T>) => Pattern<T>,
  ): Pattern<T>;

  /**
   * 確率的に（ときどき）指定した加工（関数）を適用します。
   * @example .sometimes(p => p.vowel("a")) // ときどき母音フィルターがかかる
   */
  sometimes(
    fn: (p: Pattern<T>) => Pattern<T>,
  ): Pattern<T>;

  /**
   * 高い確率で（しばしば）指定した加工（関数）を適用します。
   * @example .often(p => p.rev())
   */
  often(
    fn: (p: Pattern<T>) => Pattern<T>,
  ): Pattern<T>;

  /**
   * 低い確率で（ごく稀に）指定した加工（関数）を適用します。
   * @example .rarely(p => p.coarse(4))
   */
  rarely(
    fn: (p: Pattern<T>) => Pattern<T>,
  ): Pattern<T>;

  /**
   * 左右のスピーカー（チャンネル）で異なる加工をおこない、ステレオの広がり感を作ります。
   * @example .jux(p => p.fast(2)) // 片側スピーカーのテンポだけが倍速になる
   */
  jux(
    fn: (p: Pattern<T>) => Pattern<T>,
  ): Pattern<T>;

  /**
   * 周期的な値の範囲を指定します。
   * @example saw.range(200, 600)
   */
  range(min: number, max: number): Pattern<T>;

  /**
   * ローパスフィルターのカットオフ周波只を設定します（ショートハンド）。
   * @example .lpf(600)
   */
  lpf(
    value: number | Pattern<number>,
  ): Pattern<T>;

  /**
   * ローパスフィルターのレゾナンスを設定します（ショートハンド）。
   * @example .lpq(0.1)
   */
  lpq(
    value: number | Pattern<number>,
  ): Pattern<T>;

  /**
   * パターンの一部をマスク（ミュート）して一部だけ有効にします。
   * @example .mask("[1 1 1 ~]")
   */
  mask(
    maskPattern: string | Pattern<number>,
  ): Pattern<T>;
}

// ==========================================
// 7. グローバルに利用する基本関数
// ==========================================

/**
 * リズムの記述（ミニノテーション）から、サンプラー音源のパターンを作成します。
 * @param patternStr サンプル名（音色名）を含むリズムパターン文字列
 * @example s("bd*4, [~ cp]*2")
 */
declare function s(
  patternStr: string,
): Pattern<any>;

/**
 * リズムの記述（ミニノテーション）から、サンプラー音源のパターンを作成します（sの完全な名前版）。
 * @param patternStr サンプル名（音色名）を含むリズムパターン文字列
 * @example sound("bd*4")
 */
declare function sound(
  patternStr: string,
): Pattern<any>;

/**
 * 音階やノート番号のパターンを作成します（n のエイリアスです）。
 * @param patternStr MIDIノート番号や、c3, e3, g3 といった音階の文字列
 * @example note("c3 e3 g3 a3")
 */
declare function note(
  patternStr:
    string | number | Pattern<string | number>,
): Pattern<any>;

/**
 * 音階やノート番号のパターンを作成します。
 * @param patternStr MIDIノート番号や、c3, e3, g3 といった音階の文字列
 * @example n("0 4 7 11")
 */
declare function n(
  patternStr:
    string | number | Pattern<string | number>,
): Pattern<any>;

/**
 * Strudelの演奏エンジンにコードを登録して鳴らすための、トリガー用のグローバルシンボルです。
 */
declare const $: any;

/**
 * Cycles per minute (CPM) を設定してテンポを制御します。
 * 1Cycle = 4小節分の時間なので、120CPMは1分に120サイクル = 30BPM相当です。
 * @param cpm サイクル数/分
 */
declare function setcpm(
  cpm: number | Pattern<number>,
): void;

/**
 * 複数のパターンを重ねて同時に演奏するステック構成を作成します。
 */
declare function stack(
  ...patterns: Pattern<any>[]
): Pattern<any>;

/**
 * パターンを複数のセクションに分けてアレンジメントを作成します。
 */
declare function arrange(
  ...sections: [number, Pattern<any>][]
): Pattern<any>;

/**
 * 周期的な値を生成します（ノコギリ波）。
 * @example saw.range(200, 600).slow(8)
 */
declare const saw: Pattern<number>;

/**
 * 周期的な値を生成します（サイン波）。
 */
declare const sine: Pattern<number>;

/**
 * スライダーを作成します。
 * @param min 最小値
 * @param max 最大値
 * @param defaultValue デフォルト値
 * @param step ステップ幅
 */
declare function slider(
  min: number,
  max: number,
  defaultValue: number,
  step: number,
): Pattern<number>;
