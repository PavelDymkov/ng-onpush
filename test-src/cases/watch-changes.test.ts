import { ok } from "assert/strict";

it("should check WatchChanges", async () => {
    await page.goto(url("/watch-changes"));

    const testContainer = await page.waitForSelector(".test");
    const textContent = await testContainer!.evaluate(
        (element) => element.textContent,
    );

    ok(textContent === "Success");
});
