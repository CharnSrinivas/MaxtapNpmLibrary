#!/bin/bash

PACKAGE_NAME_PLACEHOLDER="%PACKAGE_NAME%"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$BRANCH" == "dev" ]];
    then
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin_dev/g" ./package.json

elif [[ "$BRANCH" ==  "main" ]]; 
    then    
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin/g" ./package.json
fi

sudo npm link

echo -e "\n Press any key and  open other terminal and run 'npm run weback:w' \n"
read _
sudo npm run start:node