// (C) 2020 GoodData Corporation
import React from "react";

import { WithDrillSelect } from "../../../drill";
import { IDashboardInsightProps } from "../types";

import { DashboardInsightCore } from "./DashboardInsightCore";

/**
 * @internal
 */
export const DefaultDashboardInsightWithDrillSelect = (props: IDashboardInsightProps): JSX.Element => {
    const { onDrillDown, onDrillToInsight, onDrillToAttributeUrl, onDrillToCustomUrl, onDrillToDashboard } =
        props;

    return (
        <WithDrillSelect
            insight={props.insight}
            onDrillDown={onDrillDown}
            onDrillToInsight={onDrillToInsight}
            onDrillToAttributeUrl={onDrillToAttributeUrl}
            onDrillToCustomUrl={onDrillToCustomUrl}
            onDrillToDashboard={onDrillToDashboard}
        >
            {({ onDrill }) => {
                return <DashboardInsightCore {...props} onDrill={onDrill} />;
            }}
        </WithDrillSelect>
    );
};
