#!/usr/bin/env node
// (C) 2021-2022 GoodData Corporation

import fs from "fs";

import "../../scripts/env.js";
import { getTigerBackendSdk, exportTigerFixture } from "@gooddata/fixtures";
import { logLn } from "@gooddata/fixtures/logger.js";
import _ from "lodash";
import stringify from "json-stable-stringify";

import { exportCatalogTiger } from "../export_catalog.js";
import { TIGER_FIXTURE_METADATA_EXTENSIONS } from "../constant.js";

import { runPrettierOnFile } from "./prettierUtils.js";

async function main() {
    try {
        const { HOST, TIGER_API_TOKEN, TEST_WORKSPACE_ID, SDK_BACKEND, FIXTURE_TYPE } = process.env;

        if (!TEST_WORKSPACE_ID) {
            logLn("TEST_WORKSPACE_ID not specified in the .env file. Skipping.");
            return;
        }

        const outputFile = TIGER_FIXTURE_METADATA_EXTENSIONS["goodsales"];
        await exportTigerFixture(
            "goodsales",
            TEST_WORKSPACE_ID,
            TIGER_API_TOKEN,
            HOST,
            SDK_BACKEND,
            outputFile,
        );
        runPrettierOnFile(outputFile);

        if (FIXTURE_TYPE === "goodsales") {
            exportCatalogTiger(HOST, TEST_WORKSPACE_ID, TIGER_API_TOKEN);
        }

        logLn("Export workspace fixtures successfully");
    } catch (e) {
        logLn(e.toString());
        // eslint-disable-next-line no-console
        console.error(e);
    }
}

main();
