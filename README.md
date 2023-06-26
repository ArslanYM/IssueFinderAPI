# Starter Hive Issues Finder
- Created For [Starter Hive](https://starter-hive.vercel.app/)  


## Development Guide  :

- Clone this repo
- `cd IssueFinderAPI` 
- `npm i `
- `node index.js` 

## Available endpoints  : 

- `/api/goodfirstissues/:org/:repo` -> to get all of the good first issues. 

 - e.g. "http://localhost:3000/api/goodfirstissues/coral-xyz/backpack"

- `/api/helpwantedissues/:org/:repo` -> to get all of the help wanted issues.  

 - e.g. "http://localhost:3000/api/helpwantedissues/coral-xyz/backpack"

- `/api/firsttimersonly/:org/:repo` -> to get all of the first timers issues.

 - e.g. "http://localhost:3000/api/firsttimersonly/coral-xyz/backpack"

- `/api/all/:org/:repo` -> to get all issues from the repo.

 - e.g. "http://localhost:3000/api/all/coral-xyz/backpack"