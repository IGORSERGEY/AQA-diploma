import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) {}
    protected Url!: string;
    public async openPage() {
        await this.page.goto(this.Url);
    }
    public async performSearch(textToSearch: string) {
        await this.page.keyboard.press('Control+K');
        await this.page.keyboard.type(textToSearch, { delay: 50 });
    }
    public async clickHeaderButtonByText(buttonText: string) {
        await this.page.locator('a.navbar__item ').getByText(buttonText).click();
    }
}
