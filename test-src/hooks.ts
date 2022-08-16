import * as puppeteer from "puppeteer";

import { port } from "./config";

(globalThis as any).page = null;
(globalThis as any).url = (path: string) => `http://localhost:${port}${path}`;

let browser: puppeteer.Browser | null;
declare let page: puppeteer.Page | null;

export const mochaHooks: Mocha.RootHookObject = {
    async beforeAll() {
        browser = await puppeteer.launch();
    },

    async beforeEach() {
        page = (await browser?.newPage()) ?? null;
    },

    async afterEach() {
        await page?.close();

        page = null;
    },

    async afterAll() {
        await browser?.close();

        browser = null;
    },
};
