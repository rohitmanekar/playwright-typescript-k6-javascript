# playwright-typescript-k6-javascript
Scripts written for web3 project using playwright-typescript and tested for performance using k6-javascript

# Playwright JavaScript API Testing Project

This project is designed to test various API endpoints using Playwright and Typescript, JavaScript. The API requests are made using the `request-promise-native` library.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or later)
- npm (Node package manager)

## Installation

To set up the project, follow these steps:

1. Clone the repository:
     git clone https://github.com/your-username/your-repo-name.git

2. Navigate to the project directory:
    cd your-repo-name    

3. Install the dependencies:
    npm install

## Project Structure
src/main/api/apiHelper.ts: Contains the helper function for making API requests using request-promise-native.

src/main/config/functional-config.ts: Contains the configurations related to the functional tests.
src/main/config/performance-config.ts: Contains the configurations related to the performance tests.
src/main/config/locators.ts: Contains the locators used within the tests.

src/main/ui/*: Contains the page functions used within the tests.

src/test/functional/*: Contains the functional tests for the UI and API endpoints.
src/test/performance/*: Contains the performance tests for the API endpoints.

## Configuration

Ensure you have the necessary API keys and endpoint URLs along with the password configured in your environment or configuration files.

## Usage

### Running Tests

To run the functional tests, use the following command:
npx playwright test src/test/functional/task1.spec.ts
npx playwright test src/test/functional/task1.spec.ts

To run the performance tests, use the following command:
k6 run .\src\test\performance\getapi.spec.js
k6 run .\src\test\performance\postapi.spec.js

## Contributing
To contribute to this project, follow these steps:

Clone the repository.
Create a new branch: git checkout -b feature-branch.
Make your changes, add and commit them: git commit -am 'Add feature'.
Push to the branch: git push origin feature-branch.
Create a pull request.

Contact
If you have any questions or feedback, please contact rohitmanekar.work@gmail.com


### Explanation

- **Project Title and Description:** Clearly states the purpose of the project.
- **Prerequisites:** Lists the requirements needed before setting up the project.
- **Installation:** Provides step-by-step instructions for setting up the project.
- **Project Structure** Explains the project structure directories and files.
- **Configuration:** Mentions the need for API keys or endpoint configurations.
- **Usage:** Details how to run the tests.
- **Contributing:** Provides guidelines for contributing to the project.
- **Contact:** Offers a way to contact the project maintainer.

This README should help users understand and set up the project, run tests, and contribute if they wish.
