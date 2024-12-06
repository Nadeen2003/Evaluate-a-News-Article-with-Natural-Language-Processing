import { URLCheck } from "./URLChecker";

describe("URL Checker Testing", () => {
    test("URLCheck function should be defined", () => {
        expect(URLCheck).toBeDefined();
    });

    test("Should return true for valid URL", () => {
        expect(URLCheck("https://www.bbc.com/news")).toBeTruthy();
    });

    test("Should return false for empty URL", () => {
        expect(URLCheck("")).toBeFalsy();
    });
});