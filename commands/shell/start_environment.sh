#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

gnome-terminal -- bash -c "bash $SCRIPTPATH/server/start_backend.sh; exec bash";
gnome-terminal -- bash -c "bash $SCRIPTPATH/server/start_frontend.sh; exec bash";
gnome-terminal -- bash -c "bash $SCRIPTPATH/server/start_aws.sh; exec bash";
gnome-terminal -- bash -c "bash $SCRIPTPATH/aws/create_aws_services.sh; exec bash";