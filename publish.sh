#!/bin/bash
#* Changing package name according to git branch in package.json and webpack.config.js
sudo ./build.sh
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$BRANCH" == "dev" ]]; 
    # * If brach is dev -> name="maxtap_plugin_dev"
    then
        echo -e "\n Changing packagege name to maxtap_plugin_dev"
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin_dev/g" ./package.json 

elif [["$BRANCH" ==  "main"]]; 
    #* if bracn is main -> name="maxtap_plugin"
    then
        echo -e "\n Changing packagege name to $maxtap_plugin"
        sed -i "s/%PACKAGE_NAME%/maxtap_plugin/g" ./package.json
fi
# * -----------------------------------------

npm  publish
if [[ "$BRANCH" == "dev" ]]; 
    then
    sed -i "s/maxtap_plugin_dev/%PACKAGE_NAME%/g" ./package.json

elif [["$BRANCH" ==  "main"]]; 

    then
    sed -i "s/$maxtap_plugin/%PACKAGE_NAME%/g" ./package.json
fi
