import { describe, expect, it } from "vitest";
import { betterLog } from "../src/better-log";

describe("better log tests", () => {
	it("it works", () => {
		expect(
			betterLog(
				"/Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/fake-file.ts",
			),
		).toMatchInlineSnapshot(`
			[
			  "console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/fake-file.ts:1:0, ts-pos: (0) --> ", 123,  ["123"],  "123",  { test: "test" })",
			]
		`);
	});
});
