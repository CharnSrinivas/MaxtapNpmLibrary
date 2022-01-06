PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo "Current npm Version -> $PACKAGE_VERSION"
sed -i "s/%NPM_VERSION%/$PACKAGE_VERSION/g" dist/*.js dist/*.map dist/*.ts