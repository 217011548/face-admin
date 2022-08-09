#!/usr/bin/env bash


# shellcheck disable=SC2162
read -t 30 -p "Desc:" message

git add .
git commit -m "$message"
git push origin master
