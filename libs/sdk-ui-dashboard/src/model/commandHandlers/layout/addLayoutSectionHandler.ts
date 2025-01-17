// (C) 2021 GoodData Corporation

import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes";
import { AddLayoutSection } from "../../commands";
import { invalidArgumentsProvided } from "../../events/general";
import { selectLayout, selectStash } from "../../state/layout/layoutSelectors";
import { call, put, SagaReturnType, select } from "redux-saga/effects";
import { ExtendedDashboardLayoutSection } from "../../types/layoutTypes";
import isEmpty from "lodash/isEmpty";
import { layoutActions } from "../../state/layout";
import { DashboardLayoutSectionAdded, layoutSectionAdded } from "../../events/layout";
import { validateSectionPlacement } from "./validation/layoutValidation";
import { StashValidationResult, validateAndResolveStashedItems } from "./validation/stashValidation";
import { resolveIndexOfNewItem } from "../../utils/arrayOps";
import { selectInsightsMap } from "../../state/insights/insightsSelectors";
import { batchActions } from "redux-batched-actions";
import { insightsActions } from "../../state/insights";
import { validateAndNormalizeItems } from "./validation/itemValidation";

type AddLayoutSectionContext = {
    readonly ctx: DashboardContext;
    readonly cmd: AddLayoutSection;
    readonly layout: ReturnType<typeof selectLayout>;
    readonly stash: ReturnType<typeof selectStash>;
    readonly availableInsights: ReturnType<typeof selectInsightsMap>;
};

function validateAndResolve(commandCtx: AddLayoutSectionContext): StashValidationResult {
    const {
        ctx,
        layout,
        stash,
        cmd: {
            payload: { index, initialItems = [] },
        },
    } = commandCtx;

    if (!validateSectionPlacement(layout, index)) {
        throw invalidArgumentsProvided(
            ctx,
            commandCtx.cmd,
            `Attempting to insert new section at wrong index ${index}. There are currently ${layout.sections.length} sections.`,
        );
    }

    const stashValidationResult = validateAndResolveStashedItems(stash, initialItems);

    if (!isEmpty(stashValidationResult.missing)) {
        throw invalidArgumentsProvided(
            ctx,
            commandCtx.cmd,
            `Attempting to use non-existing stashes. Identifiers of missing stashes: ${stashValidationResult.missing.join(
                ", ",
            )}`,
        );
    }

    return stashValidationResult;
}

// TODO: this needs to include validation of the filter settings
export function* addLayoutSectionHandler(
    ctx: DashboardContext,
    cmd: AddLayoutSection,
): SagaIterator<DashboardLayoutSectionAdded> {
    const commandCtx: AddLayoutSectionContext = {
        ctx,
        cmd,
        layout: yield select(selectLayout),
        stash: yield select(selectStash),
        availableInsights: yield select(selectInsightsMap),
    };

    const stashValidationResult = validateAndResolve(commandCtx);
    const {
        payload: { index, initialHeader },
    } = cmd;

    const normalizationResult: SagaReturnType<typeof validateAndNormalizeItems> = yield call(
        validateAndNormalizeItems,
        ctx,
        stashValidationResult.resolved,
        cmd,
    );

    const section: ExtendedDashboardLayoutSection = {
        type: "IDashboardLayoutSection",
        header: initialHeader,
        items: normalizationResult.normalizedItems,
    };

    yield put(
        batchActions([
            insightsActions.addInsights(normalizationResult.resolvedInsights.loaded),
            layoutActions.addSection({
                section,
                usedStashes: stashValidationResult.existing,
                index,
                undo: {
                    cmd,
                },
            }),
        ]),
    );

    return layoutSectionAdded(
        ctx,
        section,
        resolveIndexOfNewItem(commandCtx.layout.sections, index),
        cmd.correlationId,
    );
}
