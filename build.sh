#!/bin/bash
#* Changing package name according to git branch in package.json
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
PACKAGE_NAME_PLACEHOLDER="%PACKAGE_NAME%"

PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')


if [[ "$BRANCH" == "dev" ]];
    # * If brach is dev -> name="maxtap_plugin_dev"
    then
    echo -e "\n Changing packagege name to maxtap_plugin_dev"
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin_dev/g" ./package.json
        
elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin/g" ./package.json
fi

# * -----------------------------------------

#* Building package 

npm run build:node
npm run webpack

sed -i "s/%MAXTAP_VERSION%/$PACKAGE_VERSION/g" ./dist/*.js ./dist/*.map ./dist/*.ts

if [[ "$BRANCH" == "dev" ]];
    then
        sed -i "s/maxtap_plugin_dev/$PACKAGE_NAME_PLACEHOLDER/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    then    
        sed -i "s/maxtap_plugin/$PACKAGE_NAME_PLACEHOLDER/g" ./package.json
fi