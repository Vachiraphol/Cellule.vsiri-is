#!/bin/bash

if [ "$#" -eq 0 ]; then
    echo "no arguments suppiled"

for name in "$@"; do
    dir_name="ex${name}"
    mkdir -p "$dir_name"
    echo "Created directory: $dir_name"
done
