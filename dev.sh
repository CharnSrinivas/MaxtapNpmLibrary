sed -i "s/package_name/maxtap_plugin_dev/g" ./package.json ./webpack.config.js
sed -i "s/maxtap_plugin_test/maxtap_plugin_dev/g" ./package.json ./webpack.config.js
sed -i "s/maxtap_plugin/maxtap_plugin_dev/g" ./package.json ./webpack.config.js

sudo npm link
echo -e "\n open other terminal and run 'npm run weback:w' \n"

npm run start:node