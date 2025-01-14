// (C) 2020-2021 GoodData Corporation
import { useCallback, useRef } from "react";
import { IExportConfig, isProtectedDataError } from "@gooddata/sdk-backend-spi";
import { IExportFunction } from "@gooddata/sdk-ui";
import { useToastMessage } from "@gooddata/sdk-ui-kit";
import { downloadFile } from "../../../../../_staging/fileUtils/downloadFile";

type ExportHandler = (exportFunction: IExportFunction, exportConfig: IExportConfig) => Promise<void>;

export const useExportHandler = (): ExportHandler => {
    const { addProgress, addSuccess, addError, removeMessage } = useToastMessage();
    const lastExportMessageId = useRef("");
    return useCallback(
        async (exportFunction: IExportFunction, exportConfig: IExportConfig): Promise<void> => {
            try {
                lastExportMessageId.current = addProgress(
                    { id: "messages.exportResultStart" },
                    // make sure the message stays there until removed by either success or error
                    { duration: 0 },
                );

                const exportResult = await exportFunction(exportConfig);

                if (lastExportMessageId.current) {
                    removeMessage(lastExportMessageId.current);
                }
                addSuccess({ id: "messages.exportResultSuccess" });

                downloadFile(exportResult.uri);
            } catch (err) {
                if (lastExportMessageId.current) {
                    removeMessage(lastExportMessageId.current);
                }

                if (isProtectedDataError(err)) {
                    addError({ id: "messages.exportResultRestrictedError" });
                } else {
                    addError({ id: "messages.exportResultError" });
                }
            }
        },
        [],
    );
};
