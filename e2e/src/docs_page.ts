import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class DocsPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.Url = 'https://playwright.dev/docs/intro';
    }
    public async getMenuItemByText(itemText: string) {
        return this.page.locator('a.menu__link').getByText(itemText);
    }
}
