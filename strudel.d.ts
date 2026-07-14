// strudel.d.ts - 日本語解説付き Strudel 型定義ファイル

/**
 * ピアノロール（パンチカード）の描画オプションを設定するインターフェース。
 */
interface PunchcardOptions {
  /** 表示するサイクルの数。デフォルトは 4 です。 */
  cycles?: number;
  /** 再生ヘッドのタイムライン上の位置。0.0（左端・上端）から 1.0（右端・下端）。デフォルトは 0.5 です。 */
  playhead?: number;
  /** ピアノロールを垂直（縦書き）方向に表示するかどうか。デフォルトは 0 (false) です。 */
  vertical?: boolean | number;
  /** 各ノートに音階名などのラベルを表示するかどうか。デフォルトは 0 (false) です。 */
  labels?: boolean | number;
  /** 時間の進行方向（スクロール方向）を反転するかどうか。デフォルトは 0 (false) です。 */
  flipTime?: boolean | number;
  /** 音高（ノートの高さ）の表示位置を上下反転するかどうか。デフォルトは 0 (false) です。 */
  flipValues?: boolean | number;
  /** 表示エリア外（事前ロードするサイクル数）の描画補完範囲。デフォルトは 1 です。 */
  overscan?: number;
  /** 再生開始前（マイナスの時間）の音符を非表示にするかどうか。デフォルトは 0 (false) です。 */
  hideNegative?: boolean | number;
  /** 音符がスクロールする際、残響のように塗りつぶした軌跡（トレース）を残すかどうか。デフォルトは 0 (false) です。 */
  smear?: boolean | number;
  /** 音高の範囲に関わらず、描画エリアの縦幅いっぱいにノートを折り畳んで（拡大して）表示するかどうか。デフォルトは 0 (false) です。 */
  fold?: boolean | number;
  /** アクティブな（現在鳴っている）ノートの色。CSSカラー文字列（例: "#FFCA28"）で指定します。 */
  active?: string;
  /** アクティブではないノートの色。CSSカラー文字列。 */
  inactive?: string;
  /** 背景色。CSSカラー文字列。 */
  background?: string;
  /** 再生ヘッドを表す線の色。デフォルトは "white" です。 */
  playheadColor?: string;
  /** 音符全体を塗りつぶして表示するかどうか。 */
  fill?: boolean | number;
  /** アクティブな音符全体を塗りつぶして表示するかどうか。 */
  fillActive?: boolean | number;
  /** 音符に枠線を表示するかどうか。 */
  stroke?: boolean | number;
  /** アクティブな音符に枠線を表示するかどうか。 */
  strokeActive?: boolean | number;
  /** アクティブではない音符を完全に非表示にする（鳴っている音だけ表示する）かどうか。デフォルトは 0 (false) です。 */
  hideInactive?: boolean | number;
  /** アクティブではない音符にも、パターンに設定された色（color）を反映するかどうか。デフォルトは 1 (true) です。 */
  colorizeInactive?: boolean | number;
  /** 音符ラベルに使用するフォントファミリー。デフォルトは "monospace" です。 */
  fontFamily?: string;
  /** 表示する音高（MIDIノート番号）の最小値。デフォルトは 10 です。 */
  minMidi?: number;
  /** 表示する音高（MIDIノート番号）の最大値。デフォルトは 90 です。 */
  maxMidi?: number;
  /** minMidi と maxMidi をパターンの音階に合わせて自動的に計算・調整するかどうか。デフォルトは 0 (false) です。 */
  autorange?: boolean | number;
}

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
   * ローパスフィルターのカットオフ周波数を設定します（ショートハンド）。
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

  // ==========================================
  // 7. ビジュアルフィードバック / 可視化
  // ==========================================

  /**
   * パターンの音高やリズムをピアノロール（パンチカード）風に、コードのすぐ下にインラインで可視化します。
   * 後続のすべてのトランスフォーメーション（音程変更やエフェクト等）が適用された結果を反映して描画されます。
   * @param options 描画オプション（表示サイクル数、色、ラベル設定など。省略した場合はデフォルト値で描画されます）
   * @example ._punchcard({ cycles: 4, labels: true, active: "cyan" })
   */
  _punchcard(
    options?: PunchcardOptions,
  ): Pattern<T>;

  /**
   * パターンのビジュアルカラーを設定します。
   * CSSカラー文字列（色名や#HEXコード）を指定します。
   * @param colorStr 色名（例: "red", "paleturquoise"）やHEXコード（例: "#FF0000"）
   * @example .color("crimson")
   * @example .color("paleturquoise")
   * @example .color("#FF5733")
   */
  color(colorStr: ColorValue): Pattern<T>;

// ==========================================
// 8. グローバルに利用する基本関数
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
 * 音階やノート番号의 パターンを作成します。
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
 * 複数のパターンを重ねて同時に演奏するスタック構成を作成します。
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

/**
 * 文字列型（CSSカラー名や数値）のためのユーティリティ型
 */
type ColorValue = string;

/**
 * 色付け（カラー）を設定するインターフェース
 */
interface Colorable {
  color(color: ColorValue): this;
}

/**
 * 色を設定します（パターンのビジュアルカラー）。
 * CSSカラー文字列（色名や#HEXコード）を指定します。
 * @param colorStr 色名（例: "red", "paleturquoise"）やHEXコード（例: "#FF0000"）
 * @example .color("crimson")
 * @example .color("paleturquoise")
 * @example .color("#FF5733")
 */
declare function color(colorStr: ColorValue): Pattern<any>;

  /**
   * パターンのビジュアルカラーを設定します。
   * CSSカラー文字列（色名や#HEXコード）を指定します。
   * @param colorStr 色名（例: "red", "paleturquoise"）やHEXコード（例: "#FF0000"）
   * @example .color("crimson")
   * @example .color("paleturquoise")
   * @example .color("#FF5733")
   */
  color(colorStr: ColorValue): Pattern<T>;

// ==========================================
// 8. グローバルに利用する基本関数
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
 * 音階やノート番号의 パターンを作成します。
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
 * 複数のパターンを重ねて同時に演奏するスタック構成を作成します。
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

/**
 * 文字列型（CSSカラー名や数値）のためのユーティリティ型
 */
type ColorValue = string;

/**
 * 色付け（カラー）を設定するインターフェース
 */
interface Colorable {
  color(color: ColorValue): this;
}

/**
 * 色を設定します（パターンのビジュアルカラー）。
 * CSSカラー文字列（色名や#HEXコード）を指定します。
 * @param colorStr 色名（例: "red", "paleturquoise"）やHEXコード（例: "#FF0000"）
 * @example .color("crimson")
 * @example .color("paleturquoise")
 * @example .color("#FF5733")
 */
declare function color(colorStr: ColorValue): Pattern<any>;

  /**
   * パターンのビジュアルカラーを設定します。
   * CSSカラー文字列（色名や#HEXコード）を指定します。
   * @param colorStr 色名（例: "red", "paleturquoise"）やHEXコード（例: "#FF0000"）
   * @example .color("crimson")
   * @example .color("paleturquoise")
   * @example .color("#FF5733")
   */
  color(colorStr: ColorValue): Pattern<T>;
