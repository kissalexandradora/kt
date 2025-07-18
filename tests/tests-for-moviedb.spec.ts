import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import {
    logoSelector,
    languageSelector,
    selectedLanguageSelector,
    welcomeMessageSelector,
    loginButtonSelector,
    usernameFieldSelector,
    passwordFieldSelector,
    formLoginButtonSelector,
    userProfileSelector
} from './../page-objects/index.js';

const envVariables = dotenv.config({ path: path.resolve(__dirname, './../.env') });
const username = envVariables.parsed?.username;
const password = envVariables.parsed?.password;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.themoviedb.org/');
  console.info("Page is opened");
});

test.describe('tests for moviedb', () => {
    test('the page should be loaded', async ({ page }) => {
      //visibility check for welcome message, icon in the header
      await expect(page.locator(welcomeMessageSelector)).toBeVisible();
      await expect(page.locator(logoSelector)).toBeVisible();
    });

    test('the selected language should be EN', async ({ page }) => {
      await expect(page.locator(languageSelector)).toBeVisible();
      await expect(page.locator(selectedLanguageSelector)).toHaveText("en");
    });

    test('login', async ({ page }) => {
      //visibility check for login button
      await expect(page.locator(loginButtonSelector)).toBeVisible();
      await page.locator(loginButtonSelector).click();

      //login page should be loaded
      await expect(page).toHaveURL('https://www.themoviedb.org/login');

      //add username and password
      await expect(page.locator(usernameFieldSelector)).toBeVisible();
      await page.locator(usernameFieldSelector).fill(username as string);

      await expect(page.locator(passwordFieldSelector)).toBeVisible();
      await page.locator(passwordFieldSelector).fill(password as string);

      //click on the button
      await expect(page.locator(formLoginButtonSelector)).toBeVisible();
      await page.locator(formLoginButtonSelector).click();

      //observe that the user is logged in
      const userProfileUrl = "https://www.themoviedb.org/u/" + username;
      await page.waitForURL(userProfileUrl);
      await expect(page.locator(userProfileSelector)).toBeVisible();
    });
});