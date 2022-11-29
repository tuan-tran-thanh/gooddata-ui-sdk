#!/usr/bin/env node
// (C) 2021-2022 GoodData Corporation
import { spawn } from "child_process";

import "./env.js";

const npmToken = process.env.NPM_TOKEN;

if (!npmToken) {
    process.stderr.write(`NPM_TOKEN has to be specified in .env file`);
}

const ls = spawn("docker", ["build", "--build-arg", `NPM_TOKEN=${npmToken}`, "-t", "kpi-dashboards", ".."]);

ls.stdout.on("data", (data) => {
    process.stdout.write(data);
});

ls.stderr.on("data", (data) => {
    process.stderr.write(data);
});
