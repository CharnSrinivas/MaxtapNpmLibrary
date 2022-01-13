#!/bin/bash
# 1) If we come to dev branch, then change name placeholder Ex(%PACKAGE_NAME%) to maxtap_plugin_dev
# 2) 
#
#
#

#* Changing package name according to git branch in package.json

pacakge_name_placeholder="%PACKAGE_NAME%";

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
<<<<<<< HEAD
=======
PACKAGE_NAME_PLACEHOLDER="%PACKAGE_NAME%"

PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

>>>>>>> dev

if [[ "$BRANCH" == "dev" ]];
    # * If brach is dev -> name="maxtap_plugin_dev"
    then
<<<<<<< HEAD
        echo -e "\n Changing package name to maxtap_plugin_dev"
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin_dev/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        sed -i "s/$pacakge_name_placeholder/maxtap_plugin/g" ./package.json
=======
    echo -e "\n Changing packagege name to maxtap_plugin_dev"
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin_dev/g" ./package.json
        
elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        sed -i "s/$PACKAGE_NAME_PLACEHOLDER/maxtap_plugin/g" ./package.json
>>>>>>> dev
fi

# * -----------------------------------------

#* Building package

npm run build:node
npm run webpack

sed -i "s/%MAXTAP_VERSION%/$PACKAGE_VERSION/g" ./dist/*.js ./dist/*.map ./dist/*.ts

if [[ "$BRANCH" == "dev" ]];
    then
<<<<<<< HEAD
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
=======
        sed -i "s/maxtap_plugin_dev/$PACKAGE_NAME_PLACEHOLDER/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 
    then    
        sed -i "s/maxtap_plugin/$PACKAGE_NAME_PLACEHOLDER/g" ./package.json
fi
>>>>>>> dev
