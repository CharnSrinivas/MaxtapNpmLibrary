#!/bin/bash
# 1) If we come to dev branch, then change name placeholder Ex(%PACKAGE_NAME%) to maxtap_plugin_dev
# 2) 
#
#
#

#* Changing package name according to git branch in package.json

pacakge_name_placeholder="%PACKAGE_NAME%";

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$BRANCH" == "dev" ]];
    # * If brach is dev -> name="maxtap_plugin_dev"
    then
        echo -e "\n Changing package name to maxtap_plugin_dev"
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin_dev/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin/g" ./package.json
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
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin_dev/g" ./dist/*.js ./dist/*.map ./dist/*.ts
        sed -i "s/maxtap_plugin_dev/$pacakge_name_placeholder/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    then    
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin/g" ./dist/*.js ./dist/*.map ./dist/*.ts
        sed -i "s/maxtap_plugin/$pacakge_name_placeholder/g" ./package.json

fi

sed -i "s/@latest/@$PACKAGE_VERSION/g" ./dist/*.js ./dist/*.map ./dist/*.ts

cp -r src/styles.css ./dist
cp  -r ./dist/plugin.js ./examples/classic_web/src