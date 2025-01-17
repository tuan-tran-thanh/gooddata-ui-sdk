// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { actionChannel, call, getContext, take } from "redux-saga/effects";
import { loadDashboardHandler } from "./dashboard/loadDashboardHandler";
import { DashboardContext } from "../types/commonTypes";
import { DashboardCommands, IDashboardCommand } from "../commands";
import { dispatchDashboardEvent } from "../state/_infra/eventDispatcher";
import { commandRejected, internalErrorOccurred, isDashboardCommandFailed } from "../events/general";
import { changeDateFilterSelectionHandler } from "./filterContext/dateFilter/changeDateFilterSelectionHandler";
import { addAttributeFilterHandler } from "./filterContext/attributeFilter/addAttributeFilterHandler";
import { removeAttributeFiltersHandler } from "./filterContext/attributeFilter/removeAttributeFiltersHandler";
import { moveAttributeFilterHandler } from "./filterContext/attributeFilter/moveAttributeFilterHandler";
import { changeAttributeFilterSelectionHandler } from "./filterContext/attributeFilter/changeAttributeFilterSelectionHandler";
import { setAttributeFilterParentHandler } from "./filterContext/attributeFilter/setAttributeFilterParentHandler";
import { addLayoutSectionHandler } from "./layout/addLayoutSectionHandler";
import { moveLayoutSectionHandler } from "./layout/moveLayoutSectionHandler";
import { removeLayoutSectionHandler } from "./layout/removeLayoutSectionHandler";
import { changeLayoutSectionHeaderHandler } from "./layout/changeLayoutSectionHeaderHandler";
import { addSectionItemsHandler } from "./layout/addSectionItemsHandler";
import { moveSectionItemHandler } from "./layout/moveSectionItemHandler";
import { removeSectionItemHandler } from "./layout/removeSectionItemHandler";
import { undoLayoutChangesHandler } from "./layout/undoLayoutChangesHandler";
import { createAlertHandler } from "./alerts/createAlertHandler";
import { removeAlertHandler } from "./alerts/removeAlertHandler";
import { updateAlertHandler } from "./alerts/updateAlertHandler";
import { createScheduledEmailHandler } from "./scheduledEmail/createScheduledEmailHandler";
import { replaceSectionItemHandler } from "./layout/replaceSectionItemHandler";
import { isDashboardEvent } from "../events/base";
import { drillHandler } from "./drill/drillHandler";
import { drillDownHandler } from "./drill/drilDownHandler";
import { drillToInsightHandler } from "./drill/drillToInsightHandler";
import { drillToCustomUrlHandler } from "./drill/drillToCustomUrlHandler";
import { drillToAttributeUrlHandler } from "./drill/drillToAttributeUrlHandler";
import { drillToDashboardHandler } from "./drill/drillToDashboardHandler";
import { changeFilterContextSelectionHandler } from "./filterContext/changeFilterContextSelectionHandler";
import { drillToLegacyDashboardHandler } from "./drill/drillToLegacyDashboardHandler";
import { addDrillTargetsHandler } from "./drillTargets/addDrillTargetsHandler";
import { requestAsyncRenderHandler } from "./render/requestAsyncRenderHandler";
import { resolveAsyncRenderHandler } from "./render/resolveAsyncRenderHandler";
import { changeInsightWidgetHeaderHandler } from "./widgets/changeInsightWidgetHeaderHandler";
import { modifyDrillsForInsightWidgetHandler } from "./widgets/modifyDrillsForInsightWidgetHandler";
import { removeDrillsForInsightWidgetHandler } from "./widgets/removeDrillsForInsightWidgetHandler";
import { changeInsightWidgetVisPropertiesHandler } from "./widgets/changeInsightWidgetVisPropertiesHandler";
import { changeInsightWidgetFilterSettingsHandler } from "./widgets/changeInsightWidgetFilterSettingsHandler";
import { changeKpiWidgetHeaderHandler } from "./widgets/changeKpiWidgetHeaderHandler";
import { changeKpiWidgetFilterSettingsHandler } from "./widgets/changeKpiWidgetFilterSettingsHandler";
import { triggerEventHandler } from "./events/triggerEventHandler";
import { changeKpiWidgetMeasureHandler } from "./widgets/changeKpiWidgetMeasureHandler";
import { changeKpiWidgetComparisonHandler } from "./widgets/changeKpiWidgetComparisonHandler";

const DefaultCommandHandlers: {
    [cmd in DashboardCommands["type"]]?: (...args: any[]) => SagaIterator<any> | any;
} = {
    "GDC.DASH/CMD.LOAD": loadDashboardHandler,
    "GDC.DASH/CMD.SAVE": unhandledCommand,
    "GDC.DASH/CMD.SAVEAS": unhandledCommand,
    "GDC.DASH/CMD.RESET": unhandledCommand,
    "GDC.DASH/CMD.RENAME": unhandledCommand,
    "GDC.DASH/CMD.EVENT.TRIGGER": triggerEventHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.CHANGE_SELECTION": changeFilterContextSelectionHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.DATE_FILTER.CHANGE_SELECTION": changeDateFilterSelectionHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADD": addAttributeFilterHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVE": removeAttributeFiltersHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVE": moveAttributeFilterHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.CHANGE_SELECTION": changeAttributeFilterSelectionHandler,
    "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_PARENT": setAttributeFilterParentHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.ADD_SECTION": addLayoutSectionHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_SECTION": moveLayoutSectionHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_SECTION": removeLayoutSectionHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.CHANGE_SECTION_HEADER": changeLayoutSectionHeaderHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.ADD_ITEMS": addSectionItemsHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM": moveSectionItemHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM": removeSectionItemHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.REPLACE_ITEM": replaceSectionItemHandler,
    "GDC.DASH/CMD.FLUID_LAYOUT.UNDO": undoLayoutChangesHandler,
    "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER": changeKpiWidgetHeaderHandler,
    "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE": changeKpiWidgetMeasureHandler,
    "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS": changeKpiWidgetFilterSettingsHandler,
    "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON": changeKpiWidgetComparisonHandler,
    "GDC.DASH/CMD.KPI_WIDGET.REFRESH": unhandledCommand,
    "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_HEADER": changeInsightWidgetHeaderHandler,
    "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS": changeInsightWidgetFilterSettingsHandler,
    "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_PROPERTIES": changeInsightWidgetVisPropertiesHandler,
    "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_INSIGHT": unhandledCommand,
    "GDC.DASH/CMD.INSIGHT_WIDGET.MODIFY_DRILLS": modifyDrillsForInsightWidgetHandler,
    "GDC.DASH/CMD.INSIGHT_WIDGET.REMOVE_DRILLS": removeDrillsForInsightWidgetHandler,
    "GDC.DASH/CMD.INSIGHT_WIDGET.REFRESH": unhandledCommand,
    "GDC.DASH/CMD.ALERT.CREATE": createAlertHandler,
    "GDC.DASH/CMD.ALERT.UPDATE": updateAlertHandler,
    "GDC.DASH/CMD.ALERT.REMOVE": removeAlertHandler,
    "GDC.DASH/CMD.SCHEDULED_EMAIL.CREATE": createScheduledEmailHandler,
    "GDC.DASH/CMD.DRILL": drillHandler,
    "GDC.DASH/CMD.DRILL.DRILL_DOWN": drillDownHandler,
    "GDC.DASH/CMD.DRILL.DRILL_TO_INSIGHT": drillToInsightHandler,
    "GDC.DASH/CMD.DRILL.DRILL_TO_DASHBOARD": drillToDashboardHandler,
    "GDC.DASH/CMD.DRILL.DRILL_TO_ATTRIBUTE_URL": drillToAttributeUrlHandler,
    "GDC.DASH/CMD.DRILL.DRILL_TO_CUSTOM_URL": drillToCustomUrlHandler,
    "GDC.DASH/CMD.DRILL.DRILL_TO_LEGACY_DASHBOARD": drillToLegacyDashboardHandler,
    "GDC.DASH/CMD.DRILL_TARGETS.ADD": addDrillTargetsHandler,
    "GDC.DASH/CMD.RENDER.ASYNC.REQUEST": requestAsyncRenderHandler,
    "GDC.DASH/CMD.RENDER.ASYNC.RESOLVE": resolveAsyncRenderHandler,
};

function* unhandledCommand(ctx: DashboardContext, cmd: IDashboardCommand) {
    yield dispatchDashboardEvent(commandRejected(ctx, cmd.correlationId));
}

/**
 * Root command handler is the central point through which all command processing is done. The handler registers
 * for all actions starting with `GDC.DASH/CMD` === all dashboard commands.
 *
 * The commands are intended for serial processing, without any forking. A buffering action channel is in place to
 * prevent loss of commands.
 */
export function* rootCommandHandler(): SagaIterator<void> {
    const commandChannel = yield actionChannel((action: any) => action.type.startsWith("GDC.DASH/CMD"));

    while (true) {
        const command: DashboardCommands = yield take(commandChannel);
        const dashboardContext: DashboardContext = yield getContext("dashboardContext");
        const commandHandler = DefaultCommandHandlers[command.type] ?? unhandledCommand;

        try {
            const result = yield call(commandHandler, dashboardContext, command);

            if (isDashboardEvent(result)) {
                yield dispatchDashboardEvent(result);
            }
        } catch (e) {
            if (isDashboardCommandFailed(e)) {
                yield dispatchDashboardEvent(e);
            } else {
                // Errors during command handling should be caught and addressed in the handler, possibly with a
                // more meaningful error message. If the error bubbles up to here then there are holes in error
                // handling or something is seriously messed up.
                yield dispatchDashboardEvent(
                    internalErrorOccurred(
                        dashboardContext,
                        command,
                        `Internal error has occurred while handling ${command.type}`,
                        e,
                    ),
                );
            }
        }
    }
}
