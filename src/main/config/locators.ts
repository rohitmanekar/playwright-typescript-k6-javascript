export const locators = {
    loginPage: {
      acceptCookies: '//div[@id="cookiescript_accept"]',
      emailField: 'span[title="Email"]',
      passwordField: 'span[title="Password"]',
      loginButton: '//button[@data-testid="test-button"]',
    },
    nodePage: {
      nodesTab: '//div[text()="Nodes"]',
      createNodeButton: '//button[text()="Create a New Node"]',
      protocolDropdown: 'select#select-protoccol',
      networkDropdown: 'select#select-network',
      createNodeButton2: '//button[text()="Create Node"]',
      site1NodeUrlInput: '//span[text()="Site" and text()="1"]/parent::div//input',
    },
    apiKeyPage: {
      apiKeysTab: '//div[text()="API Keys"]',
      showHideButton: '//div[@data-testid="mui-showhide"]',
      apiKeyText: '//div[contains(@class,"TextContainerStyled")]',
    },
    common: {
      captchaFrame: 'iframe[src*="captcha"]',
    },
  };
  