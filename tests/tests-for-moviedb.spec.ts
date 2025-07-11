import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

//TODO: need to investigate and fix this issues with the selectors
//const selectors = require('./../page-objects/index.js');

const envVariables = dotenv.config({ path: path.resolve(__dirname, './../.env') });
const username = envVariables.parsed?.username;
const password = envVariables.parsed?.password;
//console.log("icon", selectors.logo);
//console.log("icon", selectors.mainPage.header.logo);

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.themoviedb.org/');
  console.info("Page is opened");
});

test.describe('tests for moviedb', () => {
    test('the page should be loaded', async ({ page }) => {
      //visibility check for welcome message, icon in the header
      await expect(page.locator('.page_wrap .title h2')).toBeVisible();
      await expect(page.locator('.page_wrap header .logo')).toBeVisible();
    });

    test('the selected language should be EN', async ({ page }) => {
      await expect(page.locator('.page_wrap header .translate')).toBeVisible();
      await expect(page.locator('.page_wrap header .translate div')).toHaveText("en");
    });

    test('login', async ({ page }) => {
      //visibility check for login button
      await expect(page.locator('.page_wrap header [href="/login"]')).toBeVisible();
      await page.locator('.page_wrap header [href="/login"]').click();

      //login page should be loaded
      await expect(page).toHaveURL('https://www.themoviedb.org/login');

      //add username and password
      await expect(page.locator('.page_wrap #login_form #username')).toBeVisible();
      await page.locator('.page_wrap #login_form #username').fill(username as string);

      await expect(page.locator('.page_wrap #login_form #password')).toBeVisible();
      await page.locator('.page_wrap #login_form #password').fill(password as string);

      //click on the button
      await expect(page.locator('.page_wrap #login_form #login_button')).toBeVisible();
      await page.locator('.page_wrap #login_form #login_button').click();

      //observe that the user is logged in
      const userProfileUrl = "https://www.themoviedb.org/u/" + username;
      await page.waitForURL(userProfileUrl);
      await expect(page.locator('.page_wrap header .user')).toBeVisible();
    });
});