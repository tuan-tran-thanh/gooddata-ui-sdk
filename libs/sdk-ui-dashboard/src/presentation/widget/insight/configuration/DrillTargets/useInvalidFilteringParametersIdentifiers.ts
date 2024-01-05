// (C) 2020-2022 GoodData Corporation

import { IAttributeFilter, areObjRefsEqual, filterObjRef, idRef } from "@gooddata/sdk-model";
import { UrlDrillTarget, isDrillToCustomUrlConfig } from "../../../../drill/types.js";
import { useDashboardSelector, selectAllCatalogDisplayFormsMap } from "../../../../../model/index.js";
import { useMemo } from "react";
import uniq from "lodash/uniq.js";
import {
    getDashboardAttributeFilterPlaceholdersFromUrl,
    getInsightAttributeFilterPlaceholdersFromUrl,
} from "../../../../../_staging/drills/drillingUtils.js";

//
export function useInvalidFilteringParametersIdentifiers(
    urlDrillTarget: UrlDrillTarget | undefined,
    insightFilters: IAttributeFilter[] | undefined,
    dashboardFilters: IAttributeFilter[] | undefined,
) {
    const displayForms = useDashboardSelector(selectAllCatalogDisplayFormsMap);

    return useMemo(() => {
        if (isDrillToCustomUrlConfig(urlDrillTarget)) {
            const dashboardAttributeFilterParameters = getDashboardAttributeFilterPlaceholdersFromUrl(
                urlDrillTarget.customUrl,
            );
            const insightAttributeFilterParameters = getInsightAttributeFilterPlaceholdersFromUrl(
                urlDrillTarget.customUrl,
            );

            const invalidDashboardParameters = dashboardAttributeFilterParameters
                .filter(({ identifier }) => {
                    // parameter is invalid if either it points to display form that no longer exists
                    const relevantDf = displayForms.get(idRef(identifier, "displayForm"));
                    if (!relevantDf) {
                        return false;
                    }

                    return !dashboardFilters?.some((filter) => {
                        return areObjRefsEqual(filterObjRef(filter), idRef(identifier, "displayForm"));
                    });
                })
                .map(({ identifier }) => identifier);

            const invalidInsightParameters = insightAttributeFilterParameters
                .filter(({ identifier }) => {
                    // parameter is invalid if either it points to display form that no longer exists
                    const relevantDf = displayForms.get(idRef(identifier, "displayForm"));
                    if (!relevantDf) {
                        return false;
                    }

                    return !insightFilters?.some((filter) => {
                        return areObjRefsEqual(filterObjRef(filter), idRef(identifier, "displayForm"));
                    });
                })
                .map(({ identifier }) => identifier);

            return uniq([...invalidDashboardParameters, ...invalidInsightParameters]);
        }
        return [];
    }, [displayForms, urlDrillTarget, insightFilters, dashboardFilters]);
}
