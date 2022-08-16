import { ok } from "assert/strict";

it("should check UpdateImmediately", async () => {
    await page.goto(url("/update-immediately"));

    const testContainer = await page.waitForSelector(".test");
    const textContent = await testContainer!.evaluate(
        (element) => element.textContent,
    );

    ok(textContent === "Success");
});
