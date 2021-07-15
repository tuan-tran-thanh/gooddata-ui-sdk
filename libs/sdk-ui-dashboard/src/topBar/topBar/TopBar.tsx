// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts";

/**
 * @internal
 */
export const TopBar = (): JSX.Element => {
    const { TopBarComponent } = useDashboardComponentsContext();

    return <TopBarComponent />;
};
