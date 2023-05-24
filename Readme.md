<p align='right'>Developed by Igor Sergey</p>
<h1 align='center'>AQA-diploma project</h1>

Test framework includes unit, API, and UI (e2e) tests.

## Project Structure:

All tests are placed in separate folders.

![Untitled](README_IMAGES/root_dir.png)

The following folders/files were added to the `.gitignore` file: `.vscode`, `node_modules`, and `**/assets`.

## Unit Tests:

![Untitled](README_IMAGES/unit_dir.png)

### Unit tests use the "jest" and "log4js" npm packages.

To generate random values, the "randexp" npm package is used (random_values_generator.ts).

## API Tests:

![Untitled](README_IMAGES/api_dir.png)

### API tests use the "jest", "axios", and "log4js" npm packages.

To generate random values, the "randexp" npm package is used (request_body_generator.ts).

## UI (e2e) Tests:

![Untitled](README_IMAGES/e2e_dir.png)

### UI tests use the "playwright" framework.

For additional reporting, the "allure-playwright" reporter is connected.
