// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes";
import { DashboardLayoutCommands, UndoLayoutChanges, UndoPointSelector } from "../../commands";
import { invalidArgumentsProvided } from "../../events/general";
import { selectLayout, selectUndoableLayoutCommands } from "../../state/layout/layoutSelectors";
import { put, select } from "redux-saga/effects";
import { layoutActions } from "../../state/layout";
import { DashboardLayoutChanged, layoutChanged } from "../../events/layout";

/*
 * Default impl returns 0 -> meaning drop everything that the latest command achieved.
 */
const latestCommandUndoSelector: UndoPointSelector = (
    _cmds: ReadonlyArray<DashboardLayoutCommands>,
): number => {
    return 0;
};

export function* undoLayoutChangesHandler(
    ctx: DashboardContext,
    cmd: UndoLayoutChanges,
): SagaIterator<DashboardLayoutChanged> {
    const undoableCommands: ReturnType<typeof selectUndoableLayoutCommands> = yield select(
        selectUndoableLayoutCommands,
    );
    const { undoPointSelector = latestCommandUndoSelector } = cmd.payload;
    const undoUpToIncludingCmd = undoPointSelector(undoableCommands.map((entry) => entry.cmd));

    if (undoUpToIncludingCmd < 0 || undoUpToIncludingCmd >= undoableCommands.length) {
        throw invalidArgumentsProvided(
            ctx,
            cmd,
            `Undo point selector returned result out of bounds. Undoable commands: ${undoableCommands.length}. Got index: ${undoUpToIncludingCmd}`,
        );
    }

    const selectedCommand = undoableCommands[undoUpToIncludingCmd];

    yield put(
        layoutActions.undoLayout({
            undoDownTo: selectedCommand.firstOccurrenceOnStack,
        }),
    );

    const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

    return layoutChanged(ctx, layout, cmd.correlationId);
}
