import { test, expect } from '@playwright/test';
import { HomePage } from '../src/home_page';
import { PageFactory } from '../src/page_factory';
import { PAGES } from '../helpers/types';
import { partnerLinks } from '../helpers/constants';

test.describe.configure({ mode: 'serial' });

let homePage: HomePage;

test.describe('Tests for playwright.dev home page', () => {
    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        homePage = PageFactory.getPage(page, PAGES.HOME) as HomePage;
        await homePage.openPage();
    });
    test('The partners links are correct:', async () => {
        for (let [index, link] of partnerLinks.entries()) {
            expect(await homePage.getPartnersButtonLinksByNumber(index + 1)).toEqual(link);
        }
    });
});
