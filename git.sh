#!/bin/bash
 
# Set the new name and email
export NEW_NAME="aaquibCybertouch"
export NEW_EMAIL="aaquib@cybertouch.co"
 
# Get the date 30 days ago
export DATE_LIMIT=$(date -v-30d +%s)
 
# Rewrite the history
git filter-branch --env-filter '
if [ $(git show -s --format="%ct" $GIT_COMMIT) -ge $DATE_LIMIT ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags