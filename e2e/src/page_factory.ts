import { Page } from '@playwright/test';
import { PAGES } from '../helpers/types';
import { HomePage } from './home_page';

export class PageFactory {
    static getPage(page: Page, pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage(page);
        }
    }
}
