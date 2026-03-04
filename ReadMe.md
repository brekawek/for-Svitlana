# Installation guide

1. Clone the repository
2. Use correct node version - `nvm use`
2. Install dependencies - `npm install`
3. Install playwright browsers - `npx playwright install chromium`
4. Run the tests - `npm run test`

## Generate Allure report locally

1. `npm install -g allure-commandline --save-dev`
2. `allure generate ./allure-results -o ./allure-report`
3. `allure open ./allure-report`