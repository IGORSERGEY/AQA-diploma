import { test, expect } from '@playwright/test';
import { HomePage } from '../src/home_page';
import { PageFactory } from '../src/page_factory';
import { PAGES } from '../helpers/types';
import { HEADER_SECTIONS, COMPANIES_LINKS, RIGHT_MENU_SECTIONS } from '../helpers/constants';
import { DocsPage } from '../src/docs_page';

test.describe.configure({ mode: 'parallel' });

let homePage: HomePage;
let docsPage: DocsPage;

test.describe('Tests for playwright.dev home page', () => {
    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        homePage = PageFactory.getPage(page, PAGES.HOME) as HomePage;
        await homePage.openPage();
    });
    test('Can toggle theme with button in header', async () => {
        const themeBeforeToggle = await homePage.getTheme();
        await homePage.toggleTheme();
        const themeAfterToggle = await homePage.getTheme();
        expect(themeBeforeToggle).not.toBe(themeAfterToggle);
    });
    test('The buttons in "Chosen by companies" section links have correct links', async () => {
        for (let [index, link] of COMPANIES_LINKS.entries()) {
            expect(await homePage.getPartnersButtonLinksByNumber(index + 1)).toEqual(link);
        }
    });
    test('Can open search bar by hotkeys', async () => {
        await homePage.performSearch();
        expect(await homePage.isSearchBarVisible()).toBeTruthy();
    });
});

test.describe('Tests for "docs" page', () => {
    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        docsPage = PageFactory.getPage(page, PAGES.DOCKS) as DocsPage;
        await docsPage.openPage();
    });
    for (const [section, menuItem] of Array.from(HEADER_SECTIONS)) {
        test(`Can open ${section} section and see ${menuItem} left menu item`, async () => {
            await docsPage.clickHeaderButtonByText(section);
            expect(docsPage.getLeftMenuItemByText(menuItem)).toBeVisible();
        });
    }
    for (const [rightMenuSection, leftMenuSections] of Array.from(RIGHT_MENU_SECTIONS)) {
        test(`The "${rightMenuSection}" section contains "${leftMenuSections
            .toString()
            .split(',')
            .join(', ')}" table of contents`, async () => {
            await docsPage.getLeftMenuItemByText(rightMenuSection as string).click();

            for (let section of leftMenuSections) {
                expect(await docsPage.isRightMenuItemVisible(section)).toBeTruthy();
            }
        });
    }
});

//
