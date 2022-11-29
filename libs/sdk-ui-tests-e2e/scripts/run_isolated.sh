#!/bin/bash
# (C) 2021-2022 GoodData Corporation

#*
# Run Isolated tests
# This is useful to run isolated tests for bear/tiger. Supports also record mode.
#
# SDK_BACKEND BEAR | TIGER (mandatory)
# CYPRESS_TEST_TAGS (mandatory) list of tags compatible with chosen backend
# ISOLATED_MODE record | test (optional, defaults to test)
# TEST_WORKSPACE_ID (mandatory when ISOLATED_MODE is record) workspace created for recording
#
# Note that you need to make sure that the tests you choose by the tags can
# run against the SDK_BACKEND you provide


export $(grep -v '^#' .env | xargs -0)

if [ -z "$SDK_BACKEND" ]; then
    echo "Isolated tests need SDK_BACKEND"
    exit 1
fi

if [[ $ISOLATED_MODE = "record" ]] && [[ -z $TEST_WORKSPACE_ID ]]; then
    echo "Isolated tests need TEST_WORKSPACE_ID"
    exit 1
fi

if [ -z "$CYPRESS_TEST_TAGS" ]; then
    echo "Isolated tests need CYPRESS_TEST_TAGS. Make sure tags combination is compatible with SDK_BACKEND"
    exit 1
fi

echo "Running against $SDK_BACKEND with mode $ISOLATED_MODE"
echo "Filtering by tags: $CYPRESS_TEST_TAGS"

[[ $ISOLATED_MODE = "record" ]] && COMPOSE_FILE="docker-compose-isolated-record.yaml" || COMPOSE_FILE="docker-compose-isolated.yaml"

if [ -z "$IMAGE_ID" ]; then
    echo "Build docker image with what's already in the 'dist' folder, using IMAGE_ID=kpi-dashboards"
    docker build --file ../Dockerfile_local -t kpi-dashboards ..
    export IMAGE_ID=kpi-dashboards
else
    echo "Skipping image build, using given image in IMAGE_ID: $IMAGE_ID"
fi

if [ $SDK_BACKEND = "BEAR" ]; then
    export PRESERVE_HOST_HEADER_OPTION=--preserve-host-header
fi

echo "Run tests in Docker"
cd "$(dirname "$0")/.."
docker-compose -f ./$COMPOSE_FILE  -p kd-e2e-tests-$BUILD_ID up --abort-on-container-exit --exit-code-from isolated-tests --force-recreate --always-recreate-deps --renew-anon-volumes
