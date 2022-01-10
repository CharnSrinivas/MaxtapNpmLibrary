  #!/bin/bash
  #* Changing package name according to git branch in package.json and webpack.config.js
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  maxtap_plugin="maxtap_plugin"
  maxtap_plugin_dev="maxtap_plugin_dev" 

  if [[ "$BRANCH" == "dev" ]]; 
      # * If brach is dev -> name="maxtap_plugin_dev"
      then
          echo -e "\n Changing packagege name to $maxtap_plugin_dev"
          sed -i "s/package_name/$maxtap_plugin_dev/g" ./package.json ./webpack.config.js

  elif [["$BRANCH" ==  "main"]]; 
      #* if bracn is main -> name="maxtap_plugin"
      then

          echo -e "\n Changing packagege name to $maxtap_plugin"
          sed -i "s/package_name/$maxtap_plugin/g" ./package.json ./webpack.config.js
          sed -i "s/maxtap_plugin_dev/$maxtap_plugin/g" ./package.json ./webpack.config.js
  fi
  # * -----------------------------------------

npm  publish

sed -i "s/$maxtap_plugin_dev/package_name/g" ./package.json webpack.config.js
sed -i "s/$maxtap_plugin/package_name/g" ./package.json webpack.config.js
