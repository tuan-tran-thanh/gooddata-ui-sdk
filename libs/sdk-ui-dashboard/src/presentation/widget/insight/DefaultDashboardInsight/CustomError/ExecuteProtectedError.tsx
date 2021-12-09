// (C) 2007-2021 GoodData Corporation
import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";

import { CompactContentError } from "./CompactContentError";
import { ErrorContainer } from "./ErrorContainer";

interface IExecuteProtectedErrorProps {
    fullContent: boolean;
}

export const ExecuteProtectedError: React.FC<IExecuteProtectedErrorProps> = ({ fullContent }) => {
    return (
        <ErrorContainer>
            {fullContent ? (
                <div className="info-label-icon gd-icon-warning">
                    <Typography tagName="h2">
                        <FormattedHTMLMessage id="visualization.execute_protected_report.headline" />
                    </Typography>
                    <Typography tagName="h2">
                        <FormattedHTMLMessage id="visualization.execute_protected_report.text" />
                    </Typography>
                </div>
            ) : (
                <CompactContentError
                    className="gd-icon-warning"
                    headline="visualization.execute_protected_report.headline"
                    text="visualization.execute_protected_report.text"
                />
            )}
        </ErrorContainer>
    );
};
