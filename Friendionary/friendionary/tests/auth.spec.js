import { test, expect } from '@playwright/test';

test('user login with groupID test', async ({ page }) => {
  
    await page.goto('http://localhost:5173');
    
    await page.click('.Loginbutton');

   await expect(page).toHaveURL('http://localhost:5173/login');

  await page.fill('input[name="username"]', 'user1');
  await page.fill('input[name="password"]', 'password1');
  await page.fill('input[name="groupID"]', '1');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:5173/start');

  await expect(page.getByText('Welcome !')).toBeVisible();
});



test('end-to-end-login-play-mode', async ({ page }) => {
  
    //main Page
    await page.goto('http://localhost:5173');
    
    await page.click('.Loginbutton');
  
    //Login Page
    await expect(page).toHaveURL('http://localhost:5173/login');

    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.fill('input[name="groupID"]', '1');
  
    await page.click('button[type="submit"]');
  
    await expect(page).toHaveURL('http://localhost:5173/start');
  
    await expect(page.getByText('Welcome !')).toBeVisible();
  
    //start Page
    await page.click('.game-button');
    await expect(page).toHaveURL('http://localhost:5173/game');
  
    //Game Page
    await expect(page.getByText('Friendionary - Joc')).toBeVisible();

  });

  
test('end-to-end-register-edit-words', async ({ page }) => {
  
  await page.goto('http://localhost:5173');
  
  await page.click('.Registerbutton');

  await expect(page).toHaveURL('http://localhost:5173/register');

  await page.fill('input[name="username"]', 'userTest');
  await page.fill('input[name="password"]', 'test');
  await page.fill('input[name="groupID"]', '100');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:5173/start');

  await expect(page.getByText('Welcome !')).toBeVisible();

  await page.click('.modify-button');
  await expect(page).toHaveURL('http://localhost:5173/modifyWord');

  await expect(page.getByText('Elements')).toBeVisible();

});