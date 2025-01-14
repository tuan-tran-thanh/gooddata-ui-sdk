// (C) 2021 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes";
import { RemoveLayoutSection } from "../../commands";
import { invalidArgumentsProvided } from "../../events/general";
import { selectLayout } from "../../state/layout/layoutSelectors";
import { put, select } from "redux-saga/effects";
import { layoutActions } from "../../state/layout";
import { DashboardLayoutSectionRemoved, layoutSectionRemoved } from "../../events/layout";
import isEmpty from "lodash/isEmpty";
import { validateSectionExists } from "./validation/layoutValidation";
import { resolveRelativeIndex } from "../../utils/arrayOps";

export function* removeLayoutSectionHandler(
    ctx: DashboardContext,
    cmd: RemoveLayoutSection,
): SagaIterator<DashboardLayoutSectionRemoved> {
    const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
    const { index, stashIdentifier } = cmd.payload;

    if (isEmpty(layout.sections)) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to remove a section from an empty layout.`);
    }

    if (!validateSectionExists(layout, index)) {
        throw invalidArgumentsProvided(
            ctx,
            cmd,
            `Attempting to remove non-existing layout section at index ${index}.`,
        );
    }

    const absoluteIndex = resolveRelativeIndex(layout.sections, index);
    const section = layout.sections[absoluteIndex];

    yield put(
        layoutActions.removeSection({
            index: absoluteIndex,
            stashIdentifier,
            undo: {
                cmd,
            },
        }),
    );

    return layoutSectionRemoved(ctx, section, absoluteIndex, false, stashIdentifier, cmd.correlationId);
}
