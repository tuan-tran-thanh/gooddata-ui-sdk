// (C) 2007-2020 GoodData Corporation
import range from "lodash/range";
import get from "lodash/get";
import head from "lodash/head";
import last from "lodash/last";
import inRange from "lodash/inRange";
import { numberFormat } from "@gooddata/numberjs";
import { IColorLegendItem } from "./types";
import { LEFT, RIGHT, TOP, BOTTOM } from "./PositionTypes";

export const RESPONSIVE_ITEM_MIN_WIDTH = 200;
export const RESPONSIVE_VISIBLE_ROWS = 2;
export const FLUID_PAGING_WIDTH = 30;
export const LEGEND_PADDING = 12;
export const ITEM_HEIGHT = 20;
export const SKIPPED_LABEL_TEXT = "...";
export const UTF_NON_BREAKING_SPACE = "\u00A0";
const STATIC_PAGING_HEIGHT = 44;

export interface IColorLegendBox {
    class: string | null;
    key: string;
    style?: {
        backgroundColor: string;
        border: string;
    };
}

interface IColorLabelConfigItem {
    type: string;
    labelIndex?: number;
    style?: {
        width?: number;
        height?: number;
        lineHeight?: string;
        textAlign?: string;
    };
}

export interface IHeatmapLegendLabel {
    class?: string;
    key: string;
    label: string;
    style: object;
}

export interface IColorLegendConfig {
    boxes: IColorLegendBox[];
    classes: string[];
    labels: IHeatmapLegendLabel[];
    position: string;
}

function getEmptyBlock(style: any, index: number) {
    return {
        key: `empty-${index}`,
        label: UTF_NON_BREAKING_SPACE,
        style,
    };
}

function getLabelStyle(width: number, textAlign: string) {
    return { width, textAlign };
}

const ALEFT = "left";
const ARIGHT = "right";
const ACENTER = "center";
const DOTS_WIDTH = 10;

function getSkippedLabelBlock(index: number) {
    return {
        key: `dots-${index}`,
        label: SKIPPED_LABEL_TEXT,
        style: getLabelStyle(DOTS_WIDTH, ACENTER),
    };
}

const verticalHeatmapMiddleLabelStyle = { height: 30, textAlign: ALEFT, lineHeight: "30px" };

export const verticalHeatmapConfig: IColorLabelConfigItem[] = [
    { type: "label", labelIndex: 0, style: { height: 15, textAlign: ALEFT, lineHeight: "11px" } },
    { type: "label", labelIndex: 1, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 2, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 3, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 4, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 5, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 6, style: verticalHeatmapMiddleLabelStyle },
    { type: "label", labelIndex: 7, style: { height: 15, textAlign: ALEFT, lineHeight: "20px" } },
];

const defaultHeatmapLegendLabelStyle = { width: 40, textAlign: ACENTER };

export const heatmapLegendConfigMatrix: IColorLabelConfigItem[][] = [
    [
        { type: "label", labelIndex: 0, style: { width: 175, textAlign: ALEFT } },
        { type: "label", labelIndex: 7, style: { width: 175, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 145, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 145, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 95, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 95, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 55, textAlign: ALEFT } },
        { type: "label", labelIndex: 2, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 5, style: { width: 90, textAlign: ACENTER } },
        { type: "label", labelIndex: 7, style: { width: 55, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 45, textAlign: ALEFT } },
        { type: "dots" },
        { type: "label", labelIndex: 2, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 5, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 45, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 30, textAlign: ALEFT } },
        { type: "label", labelIndex: 1, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 2, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 3, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 4, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 5, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 6, style: defaultHeatmapLegendLabelStyle },
        { type: "label", labelIndex: 7, style: { width: 30, textAlign: ARIGHT } },
    ],
];

export const colorLegendConfigMatrix: IColorLabelConfigItem[][] = [
    [
        { type: "label", labelIndex: 0, style: { width: 175, textAlign: ALEFT } },
        { type: "label", labelIndex: 6, style: { width: 175, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 145, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 6, style: { width: 145, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 95, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 6, style: { width: 95, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 55, textAlign: ALEFT } },
        { type: "label", labelIndex: 2, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 4, style: { width: 90, textAlign: ACENTER } },
        { type: "label", labelIndex: 6, style: { width: 55, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 45, textAlign: ALEFT } },
        { type: "dots" },
        { type: "label", labelIndex: 2, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 40 } },
        { type: "dots" },
        { type: "label", labelIndex: 4, style: { width: 90, textAlign: ACENTER } },
        { type: "dots" },
        { type: "label", labelIndex: 6, style: { width: 45, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 30, textAlign: ALEFT } },
        { type: "label", labelIndex: 1, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 2, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 3, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 4, style: defaultHeatmapLegendLabelStyle },
        { type: "space", style: { width: 10 } },
        { type: "label", labelIndex: 5, style: defaultHeatmapLegendLabelStyle },
        { type: "label", labelIndex: 6, style: { width: 30, textAlign: ARIGHT } },
    ],
];

const defaultHeatmapSmallLegendStyle = { width: 40, textAlign: ACENTER };

export const heatmapSmallLegendConfigMatrix: IColorLabelConfigItem[][] = [
    [
        { type: "label", labelIndex: 0, style: { width: 138, textAlign: ALEFT } },
        { type: "label", labelIndex: 7, style: { width: 138, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 115, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 26 } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 115, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 75, textAlign: ALEFT } },
        { type: "dots" },
        { type: "space", style: { width: 30 } },
        { type: "dots" },
        { type: "space", style: { width: 26 } },
        { type: "dots" },
        { type: "space", style: { width: 30 } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 75, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 45, textAlign: ALEFT } },
        { type: "label", labelIndex: 2, style: { width: 70, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 26 } },
        { type: "dots" },
        { type: "label", labelIndex: 5, style: { width: 70, textAlign: ACENTER } },
        { type: "label", labelIndex: 7, style: { width: 45, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 35, textAlign: ALEFT } },
        { type: "dots" },
        { type: "label", labelIndex: 2, style: { width: 70, textAlign: ACENTER } },
        { type: "dots" },
        { type: "space", style: { width: 26 } },
        { type: "dots" },
        { type: "label", labelIndex: 5, style: { width: 70, textAlign: ACENTER } },
        { type: "dots" },
        { type: "label", labelIndex: 7, style: { width: 35, textAlign: ARIGHT } },
    ],
    [
        { type: "label", labelIndex: 0, style: { width: 20, textAlign: ALEFT } },
        { type: "label", labelIndex: 1, style: defaultHeatmapSmallLegendStyle },
        { type: "label", labelIndex: 2, style: defaultHeatmapSmallLegendStyle },
        { type: "label", labelIndex: 3, style: { width: 38, textAlign: ACENTER } },
        { type: "label", labelIndex: 4, style: { width: 38, textAlign: ACENTER } },
        { type: "label", labelIndex: 5, style: defaultHeatmapSmallLegendStyle },
        { type: "label", labelIndex: 6, style: defaultHeatmapSmallLegendStyle },
        { type: "label", labelIndex: 7, style: { width: 20, textAlign: ARIGHT } },
    ],
];

export function buildColorLabelsConfig(labels: string[], config: any) {
    return config
        .map((element: any, index: number) => {
            switch (element.type) {
                case "label":
                    return {
                        label: labels[element.labelIndex],
                        style: element.style,
                        key: `${element.type}-${index}`,
                    };

                case "space":
                    return getEmptyBlock(element.style, index);

                case "dots":
                    return getSkippedLabelBlock(index);
                default:
                    return null;
            }
        })
        .filter((value: any) => value !== null);
}

const LABEL_LENGHT_THRESHOLDS = [5, 8, 10, 15, 18];
const SMALL_LABEL_LENGHT_THRESHOLDS = [4, 7, 9, 13, 15];

function getColorLegendLabelsConfiguration(legendLabels: string[], isSmall: boolean, isVertical: boolean) {
    const numberOfLabels = legendLabels.length;
    const firstLabelLength = head(legendLabels)?.length ?? 0;
    const lastLabelLength = last(legendLabels)?.length ?? 0;
    const maxLabelLength = firstLabelLength > lastLabelLength ? firstLabelLength : lastLabelLength;
    const labelLengths = isSmall ? SMALL_LABEL_LENGHT_THRESHOLDS : LABEL_LENGHT_THRESHOLDS;

    const shorteningConfig = isVertical
        ? verticalHeatmapConfig
        : getHorizontalShorteningLabelConfig(labelLengths, maxLabelLength, isSmall, numberOfLabels);

    return buildColorLabelsConfig(legendLabels, shorteningConfig);
}

function getHorizontalShorteningLabelConfig(
    labelLengths: number[],
    maxLabelLength: number,
    isSmall: boolean,
    numberOfLabels: number,
): IColorLabelConfigItem[] {
    const shorteningLevel = getColorLabelShorteningLevel(labelLengths, maxLabelLength);
    if (isSmall) {
        return heatmapSmallLegendConfigMatrix[shorteningLevel];
    }
    if (numberOfLabels === 8) {
        return heatmapLegendConfigMatrix[shorteningLevel];
    }
    return colorLegendConfigMatrix[shorteningLevel];
}

function getColorLabelShorteningLevel(labelLengths: number[], maxLabelLength: number): number {
    let shorteningLevel: number;
    if (inRange(maxLabelLength, 0, labelLengths[0])) {
        shorteningLevel = 5;
    } else if (inRange(maxLabelLength, labelLengths[0], labelLengths[1])) {
        shorteningLevel = 4;
    } else if (inRange(maxLabelLength, labelLengths[1], labelLengths[2])) {
        shorteningLevel = 3;
    } else if (inRange(maxLabelLength, labelLengths[2], labelLengths[3])) {
        shorteningLevel = 2;
    } else if (inRange(maxLabelLength, labelLengths[3], labelLengths[4])) {
        shorteningLevel = 1;
    } else {
        shorteningLevel = 0;
    }
    return shorteningLevel;
}

export function calculateFluidLegend(seriesCount: number, containerWidth: number) {
    // -1 because flex dimensions provide rounded number and the real width can be float
    const realWidth = containerWidth - 2 * LEGEND_PADDING - 1;

    if (seriesCount <= 2) {
        return {
            hasPaging: false,
            itemWidth: realWidth / seriesCount,
            visibleItemsCount: seriesCount,
        };
    }

    let columnsCount = Math.floor(realWidth / RESPONSIVE_ITEM_MIN_WIDTH);
    let itemWidth = realWidth / columnsCount;
    let hasPaging = false;

    const rowsCount = Math.ceil(seriesCount / columnsCount);

    // Recalculate with paging
    if (rowsCount > RESPONSIVE_VISIBLE_ROWS) {
        const legendWidthWithPaging = realWidth - FLUID_PAGING_WIDTH;
        columnsCount = Math.floor(legendWidthWithPaging / RESPONSIVE_ITEM_MIN_WIDTH);
        itemWidth = legendWidthWithPaging / columnsCount;
        hasPaging = true;
    }

    const visibleItemsCount = columnsCount * RESPONSIVE_VISIBLE_ROWS;

    return {
        itemWidth,
        hasPaging,
        visibleItemsCount,
    };
}

function getStaticVisibleItemsCount(containerHeight: number, withPaging: boolean = false) {
    const pagingHeight = withPaging ? STATIC_PAGING_HEIGHT : 0;
    return Math.floor((containerHeight - pagingHeight) / ITEM_HEIGHT);
}

export function calculateStaticLegend(seriesCount: number, containerHeight: number) {
    const visibleItemsCount = getStaticVisibleItemsCount(containerHeight);
    if (visibleItemsCount >= seriesCount) {
        return {
            hasPaging: false,
            visibleItemsCount,
        };
    }
    return {
        hasPaging: true,
        visibleItemsCount: getStaticVisibleItemsCount(containerHeight, true),
    };
}

function getColorLegendLabels(
    series: IColorLegendItem[],
    format: string | undefined,
    numericSymbols: string[],
): string[] {
    const min = get(head(series), "range.from", 0);
    const max = get(last(series), "range.to", 0);
    const diff = max - min;

    return range(series.length + 1).map((index) => {
        let value: number;

        if (index === 0) {
            value = get(series, "0.range.from", 0);
        } else if (index === series.length) {
            value = get(series, `${index - 1}.range.to`, 0);
        } else {
            value = get(series, `${index}.range.from`, 0);
        }

        return formatLegendLabel(value, format, diff, numericSymbols);
    });
}

const MIDDLE_LEGEND_BOX_INDEX = 3;

function getColorBoxes(series: IColorLegendItem[]): IColorLegendBox[] {
    const getBoxStyle = (item: IColorLegendItem) => ({
        backgroundColor: item.color,
        border: item.color === "rgb(255,255,255)" ? "1px solid #ccc" : "none",
    });

    return series.map((item: IColorLegendItem, index: number) => {
        const style = getBoxStyle(item);
        const middle = index === MIDDLE_LEGEND_BOX_INDEX ? "middle" : null;

        return {
            class: middle,
            key: `item-${index}`,
            style,
        };
    });
}

export function getColorLegendConfiguration(
    series: IColorLegendItem[],
    format: string | undefined,
    numericSymbols: string[],
    isSmall: boolean,
    position: string | null,
): IColorLegendConfig {
    const legendLabels = getColorLegendLabels(series, format, numericSymbols);
    let finalPosition;

    // tslint:disable-next-line:prefer-conditional-expression
    if (isSmall) {
        finalPosition = position === TOP ? TOP : BOTTOM;
    } else {
        finalPosition = position || RIGHT;
    }

    const classes = ["viz-legend", "color-legend", `position-${finalPosition}`];

    if (isSmall) {
        classes.push("small");
    }

    const isVertical = finalPosition === LEFT || finalPosition === RIGHT;
    const finalLabels = getColorLegendLabelsConfiguration(legendLabels, isSmall, isVertical);
    const boxes = getColorBoxes(series);

    return {
        classes,
        labels: finalLabels,
        boxes,
        position: finalPosition,
    };
}

export const LEGEND_AXIS_INDICATOR = "legendAxisIndicator";
export const LEGEND_SEPARATOR = "legendSeparator";

/**
 * @internal
 */
export function formatLegendLabel(
    value: number,
    format: string | undefined,
    diff: number,
    numericSymbols: string[],
): string {
    if (format && format.includes("%")) {
        return numberFormat(value, "#,#0%");
    }

    const sign = Math.sign(value) === -1 ? "-" : "";
    const positiveValue = Math.abs(value);
    let formattingString = "";

    if (diff < 10) {
        formattingString += "[<1]0.00;[<10]#.#;[<100]#.#;";
    }

    const k =
        diff < 10000
            ? "[<999500]0;"
            : `[<1000]0;[<10000]#.#,${numericSymbols[0]};[<999500]#,${numericSymbols[0]};`;
    const m = `[<10000000]#.#,,${numericSymbols[1]};[<999500000]#,,${numericSymbols[1]};`;
    const b = `[<10000000000]#.#,,,${numericSymbols[2]};[<999500000000]#,,,${numericSymbols[2]};`;
    const t = `[<10000000000000]#.#,,,${numericSymbols[3]};[>=10000000000000]#,,,${numericSymbols[3]}`;
    formattingString += k + m + b + t;
    return sign + numberFormat(positiveValue, formattingString);
}

/**
 * @internal
 */
export const FLUID_LEGEND_THRESHOLD = 768;

/**
 * @internal
 */
export function shouldShowFluid(documentObj: Document) {
    if (!documentObj) {
        return false;
    }

    return documentObj.documentElement.clientWidth < FLUID_LEGEND_THRESHOLD;
}
