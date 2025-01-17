// (C) 2020-2021 GoodData Corporation

import {
    DashboardCommandFailed,
    drillToAttributeUrl,
    DashboardDrillToAttributeUrlResolved,
    useDashboardCommandProcessing,
} from "../../../model";

/**
 * @internal
 */
export interface UseDrillToAttributeUrlProps {
    onSuccess?: (event: DashboardDrillToAttributeUrlResolved) => void;
    onError?: (event: DashboardCommandFailed) => void;
    onBeforeRun?: () => void;
}

/**
 * @internal
 */
export const useDrillToAttributeUrl = ({
    onSuccess,
    onError,
    onBeforeRun,
}: UseDrillToAttributeUrlProps = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToAttributeUrl,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
