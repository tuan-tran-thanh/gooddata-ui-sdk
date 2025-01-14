// (C) 2020-2021 GoodData Corporation
import { ComponentType } from "react";
import { IAnalyticalBackend, IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight } from "@gooddata/sdk-model";
import {
    IAvailableDrillTargets,
    IDrillableItem,
    IErrorProps,
    IHeaderPredicate,
    ILoadingProps,
    OnError,
    OnExportReady,
    OnLoadingChanged,
} from "@gooddata/sdk-ui";
import {
    OnDashboardDrill,
    OnDrillDown,
    OnDrillToAttributeUrl,
    OnDrillToCustomUrl,
    OnDrillToDashboard,
    OnDrillToInsight,
} from "../../drill/types";

///
/// Custom component types
///

/**
 * @internal
 */
export type CustomDashboardInsightComponent = ComponentType;

///
/// Component props
///

/**
 * @internal
 */
export interface IDashboardInsightProps {
    widget: IInsightWidget;
    insight: IInsight;

    clientHeight?: number;
    clientWidth?: number;

    backend?: IAnalyticalBackend;
    workspace?: string;

    disableWidgetImplicitDrills?: boolean;
    drillableItems?: Array<IDrillableItem | IHeaderPredicate>;
    drillTargets?: IAvailableDrillTargets;

    onAvailableDrillTargetsReceived?: (availableDrillTargets?: IAvailableDrillTargets) => void;

    onDrill?: OnDashboardDrill;
    onDrillDown?: OnDrillDown;
    onDrillToInsight?: OnDrillToInsight;
    onDrillToDashboard?: OnDrillToDashboard;
    onDrillToAttributeUrl?: OnDrillToAttributeUrl;
    onDrillToCustomUrl?: OnDrillToCustomUrl;

    onError?: OnError;
    onLoadingChanged?: OnLoadingChanged;
    onExportReady?: OnExportReady;

    ErrorComponent?: ComponentType<IErrorProps>;
    LoadingComponent?: ComponentType<ILoadingProps>;
}
