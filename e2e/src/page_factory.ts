import { Page } from '@playwright/test';
import { PAGES } from '../helpers/types';
import { HomePage } from './home_page';
import { DocsPage } from './docs_page';
import { BasePage } from './base_page';

export class PageFactory {
    static getPage(page: Page, pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage(page);

            case PAGES.DOCKS:
                return new DocsPage(page);
            default:
                return new BasePage(page);
        }
    }
}
