import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) {}
    protected Url!: string;
    public async openPage() {
        await this.page.goto(this.Url);
    }
    public async performSearch(textToSearch?: string) {
        await this.page.keyboard.press('Control+K');
        textToSearch ? await this.page.keyboard.type(textToSearch, { delay: 50 }) : await this.page.waitForTimeout(100);
    }
    public async isSearchBarVisible() {
        return await this.page.locator('header.DocSearch-SearchBar').isVisible();
    }
    public async clickHeaderButtonByText(buttonText: string) {
        await this.page.locator('a.navbar__item ').getByText(buttonText).click();
    }
    public async toggleTheme() {
        await this.page.locator('svg.lightToggleIcon_pyhR').click();
    }
    public async getTheme() {
        return await this.page.locator('html[class="plugin-pages plugin-id-default"]').getAttribute('data-theme');
    }
}