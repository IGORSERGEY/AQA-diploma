import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class HomePage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.Url = 'https://playwright.dev/';
    }
    public async getPartnersButtonLinksByNumber(numberOfButton: Number) {
        return await this.page.locator(`.logosList_zAAF > li:nth-child(${numberOfButton}) > a`).getAttribute('href');
    }
}
