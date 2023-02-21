#!/bin/bash

docker container kill $(docker ps -q)
kill $(pgrep bash)