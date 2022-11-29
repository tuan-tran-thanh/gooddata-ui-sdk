#!/bin/bash
set -e

cd "$(dirname "$0")/.."

export NO_COLOR=1

TEST_BACKEND=$TEST_BACKEND NPM_TOKEN=$NPM_TOKEN docker-compose -f docker-compose-tiger-e2e-tests.yaml build
if [[ `echo "$RUN_GETTING_START_SPECS" | tr '[:upper:]' '[:lower:]'` == "true" ]]; then
    #run getting start specs
    TEST_BACKEND=$TEST_BACKEND NPM_TOKEN=$NPM_TOKEN FIXTURE_TYPE=demo TIGER_DATASOURCES_NAME=$TIGER_DATASOURCES_NAME KD_CYPRESS_TEST_TAGS=gettingStartedFlows_integrated_tiger docker-compose \
                        -f docker-compose-tiger-e2e-tests.yaml up --abort-on-container-exit --exit-code-from tiger-integration-tests --force-recreate --always-recreate-deps --renew-anon-volumes
fi
if [[ `echo "$RUN_SPECIFIC_SPECS" | tr '[:upper:]' '[:lower:]'` == "true" ]]; then
    TEST_BACKEND=$TEST_BACKEND NPM_TOKEN=$NPM_TOKEN FIXTURE_TYPE=goodsales TIGER_DATASOURCES_NAME=vertica_staging-goodsales KD_CYPRESS_TEST_TAGS=pre-merge_integrated_tiger docker-compose \
                        -f docker-compose-tiger-e2e-tests.yaml up --abort-on-container-exit --exit-code-from tiger-integration-tests --force-recreate --always-recreate-deps --renew-anon-volumes
fi
