https://github.com/facebook/react/issues/24304#issuecomment-1094565891

Yarn v1
npx yarn-deduplicate --packages @types/react for now. Any package requiring v17 explicitly should be asked to either bump it (if they support React 18) or you should find an alternative library anyway if you want to use React 18.