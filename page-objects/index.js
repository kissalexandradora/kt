const selectors = require('./selectors.json');

const mainPageSelector = `${selectors.mainPage.selector}`;
const headerSelector = `${mainPageSelector} ${selectors.mainPage.children.header.selector}`;
const logoSelector = `${headerSelector} ${selectors.mainPage.children.header.children.logo}`;
const languageSelector = `${headerSelector} ${selectors.mainPage.children.header.children.language.selector}`;
const selectedLanguageSelector = `${languageSelector} ${selectors.mainPage.children.header.children.language.children.selectedLanguage}`;
const welcomeMessageSelector = `${mainPageSelector} ${selectors.mainPage.children.welcomeMessage}`;
const loginButtonSelector = `${headerSelector} ${selectors.mainPage.children.header.children.loginButton}`;
const loginFormSelector = `${mainPageSelector} ${selectors.mainPage.loginForm.selector}`;
const usernameFieldSelector = `${loginFormSelector} ${selectors.mainPage.loginForm.children.usernameField}`;
const passwordFieldSelector = `${loginFormSelector} ${selectors.mainPage.loginForm.children.passwordField}`;
const formLoginButtonSelector = `${loginFormSelector} ${selectors.mainPage.loginForm.children.loginButton}`;
const userProfileSelector = `${mainPageSelector} ${selectors.mainPage.children.header.children.userProfile}`;

module.exports = {
    logoSelector,
    languageSelector,
    selectedLanguageSelector,
    welcomeMessageSelector,
    loginButtonSelector,
    loginFormSelector,
    usernameFieldSelector,
    passwordFieldSelector,
    formLoginButtonSelector,
    userProfileSelector
};