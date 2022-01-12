#!/bin/bash
#* Changing package name according to git branch in package.json
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" == "dev" ]];
    # * If brach is dev -> name="maxtap_plugin_dev"
    then
    echo -e "\n Changing packagege name to maxtap_plugin_dev"
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin_dev/g" ./package.json
elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin/g" ./package.json
fi

# * -----------------------------------------

#* Building package 

npm run build:node
npm run tsc
npm run webpack

#* Setting package version in all files in dist folder to current pacakge version which is in package.json -> [For CSS file version mismatch]

PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo -e "\n \n Current npm Version -> $PACKAGE_VERSION"

if [[ "$BRANCH" == "dev" ]];
    then
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin_dev/g" ./dist/*.js ./dist/*.map ./dist/*.ts
        sed -i "s/maxtap_plugin_dev/%PACKAGE_NAME%/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    then    
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin/g" ./dist/*.js ./dist/*.map ./dist/*.ts
        sed -i "s/maxtap_plugin/%PACKAGE_NAME%/g" ./package.json

fi

sed -i "s/@latest/@$PACKAGE_VERSION/g" ./dist/*.js ./dist/*.map ./dist/*.ts

cp -r src/styles.css ./dist
cp  -r ./dist/plugin.js ./examples/classic_web/src