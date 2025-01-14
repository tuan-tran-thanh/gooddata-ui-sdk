// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { IWidgetAlert } from "@gooddata/sdk-backend-spi";
import { objRefToString } from "@gooddata/sdk-model";
import { DashboardContext } from "../../types/commonTypes";
import { RemoveAlert } from "../../commands/alerts";
import { alertRemoved, DashboardAlertRemoved } from "../../events/alerts";
import { alertsActions } from "../../state/alerts";

function removeAlert(ctx: DashboardContext, alert: IWidgetAlert): Promise<void> {
    const { backend, workspace } = ctx;

    return backend.workspace(workspace).dashboards().deleteWidgetAlert(alert.ref);
}

export function* removeAlertHandler(
    ctx: DashboardContext,
    cmd: RemoveAlert,
): SagaIterator<DashboardAlertRemoved> {
    yield call(removeAlert, ctx, cmd.payload.alert);

    yield put(alertsActions.removeAlert(objRefToString(cmd.payload.alert.ref)));

    return alertRemoved(ctx, cmd.payload.alert, cmd.correlationId);
}
