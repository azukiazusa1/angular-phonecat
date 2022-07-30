import { test, expect } from '@playwright/test';

test.describe('PhoneCat Application', () => {

  test('should redirect `index.html` to `index.html#!/phones', async ({ page }) => {
    await page.goto('http://localhost:8000/');

    await expect(page).toHaveURL('http://localhost:8000/#!/phones');
  });

  test.describe('View: Phone list', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/#!/phones');
    });

    test('should filter the phone list as a user types into the search box', async ({ page }) => {
      const phoneList = page.locator('role=listitem');
      const input = page.locator("input");

      expect(phoneList).toHaveCount(20);

      await input.fill('nexus');
      await page.waitForTimeout(1000);
      expect(phoneList).toHaveCount(1);

      await input.fill('motorola');
      await page.waitForTimeout(1000);
      expect(phoneList).toHaveCount(8);
    })

    test('should be possible to control phone order via the drop-down menu', async ({ page }) => {
      const dropdown = page.locator('select');
      const input = page.locator("input");
      const phoneList = page.locator('role=listitem').locator('role=link');

      const getNames = async () => {
        const names = await phoneList.allInnerTexts();
        return names.filter((name) => !!name);
      }

      await input.fill('tablet');
      await page.waitForTimeout(1000);

      expect(await getNames()).toEqual([
        'Motorola XOOM\u2122 with Wi-Fi',
        'MOTOROLA XOOM\u2122'
      ])

      await dropdown.selectOption('name');
      await page.waitForTimeout(1000);

      expect(await getNames()).toEqual([
        'MOTOROLA XOOM\u2122',
        'Motorola XOOM\u2122 with Wi-Fi'
      ])
    })

    test('should render phone specific links', async ({ page }) => {
      const input = page.locator("input");

      await input.fill('nexus');
      await page.waitForTimeout(1000);

      const firstPhoneLink = page.locator('role=listitem').locator('role=link').first();

      await firstPhoneLink.click();

      expect(page).toHaveURL('http://localhost:8000/#!/phones/nexus-s');
    })
  })

  test.describe('View: Phone detail', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/#!/phones/nexus-s');
    })

    test('should display the `nexus-s` page', async ({ page }) => {
      expect(page.locator('role=heading').first()).toHaveText('Nexus S');
    })

    test('should display the first phone image as the main phone image', async ({ page }) => {
      const mainImage = page.locator('img.selected');
      expect(mainImage).toHaveAttribute('src', 'img/phones/nexus-s.0.jpg');
    })

    test('should swap main image if a thumbnail is clicked', async ({ page }) => {
      const mainImage = page.locator('img.selected');
      const thumbnails = page.locator('role=listitem').locator('role=img');

      await thumbnails.nth(2).click();
      expect(mainImage).toHaveAttribute('src', 'img/phones/nexus-s.2.jpg');

      await thumbnails.first().click();
      expect(mainImage).toHaveAttribute('src', 'img/phones/nexus-s.0.jpg');
    })
  })
})