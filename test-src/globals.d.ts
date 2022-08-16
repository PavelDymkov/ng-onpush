import { Page } from "puppeteer";

declare global {
    const page: Page;

    const url: (path: string) => string;
}
