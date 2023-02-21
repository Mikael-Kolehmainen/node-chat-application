#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

gnome-terminal -- bash -c "bash $SCRIPTPATH/stop_environment.sh; exec bash";
gnome-terminal -- bash -c "bash $SCRIPTPATH/start_environment.sh; exec bash";