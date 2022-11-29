#!/bin/bash
set -ex

cd "$(dirname "$0")/.."

CYPRESS_IMAGE='020413372491.dkr.ecr.us-east-1.amazonaws.com/3rdparty/cypress/included:8.4.1'

chmod +x ./test_new/scripts/run-integrated-with-workspace.sh
docker run --entrypoint scripts/run-integrated-with-workspace.sh \
    -e USERID=$(id -u $USER) \
    -e FORCE_COLOR=0 \
    -e HOST=$CYPRESS_HOST \
    -e USER_NAME=$TEST_USER_NAME \
    -e PASSWORD=$TEST_USER_PASSWORD \
    -e NPM_TOKEN=$NPM_TOKEN \
    -e AUTH_TOKEN=$TEST_PROJECT_TOKEN \
    -e FILTER=$CYPRESS_FILTERED_SUITES \
    -e NO_COLOR=1 \
    -e BUILD_URL=$BUILD_URL \
    -e CYPRESS_TEST_TAGS=pre-merge_integrated_bear \
    -e SDK_BACKEND=BEAR \
    -w /workspace/test_new \
    -v "$(pwd)":/workspace \
    $CYPRESS_IMAGE
