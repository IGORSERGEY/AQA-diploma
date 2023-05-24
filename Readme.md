 <p align='right'>Developed by Igor Sergey</p>
<h1 align='center'> AQA-diploma project</h1>

Test framework includes unit, API and UI(e2e) tests

## The project structure:

All tests are placed in the separate folders

![Untitled](README_IMAGES/root_dir.png)

`.vscode`, `node_modules` and `**/assets` were added to `.gitignore` file

## The unit tests:

![Untitled](README_IMAGES/unit_dir.png)

### For unit tests “jest” and “log4js” npm packages were used

For generating random values **randexp** npm was used (random_values_generator.ts)

## The API tests:

![Untitled](README_IMAGES/api_dir.png)

### For api tests “jest”, “axios” and “log4js” npm packages were used

For generating random values **randexp** npm was used (request_body_generator.ts)

## The UI(e2e) tests:

![Untitled](README_IMAGES/e2e_dir.png)

### For UI tests “playwright” framework was used

For additional reporting “allure-playwright” reporter was connected
