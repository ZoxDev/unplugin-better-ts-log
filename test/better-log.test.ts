import { Project } from "ts-morph";
import { describe, expect, it } from "vitest";
import { betterLogTransform } from "../src/better-log";

describe("better log tests", () => {
	it("nominal case", () => {
		const project = new Project();
		const sourceFile = project.addSourceFileAtPath(
			"/Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/nominal-case.fake-file.ts",
		);

		expect(betterLogTransform(sourceFile)).toMatchInlineSnapshot(`
			"console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/nominal-case.fake-file.ts:1:1 --> ", 123,  ["123"],  "123",  { test: "test" });
			"
		`);
	});
	it("playground code", () => {
		const project = new Project();
		const sourceFile = project.addSourceFileAtPath(
			"/Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/playground.fake-file.ts",
		);

		expect(betterLogTransform(sourceFile)).toMatchInlineSnapshot(`
			"document.getElementById("app")!.innerHTML = "__UNPLUGIN__";
			console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/playground.fake-file.ts:2:1 --> ", "pipi");
			"
		`);
	});
	it("handle multiple logs", () => {
		const project = new Project();
		const sourceFile = project.addSourceFileAtPath(
			"/Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/multiple-log.fake-file.ts",
		);

		expect(betterLogTransform(sourceFile)).toMatchInlineSnapshot(`
			"console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/multiple-log.fake-file.ts:1:1 --> ", "pipi");
			console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/multiple-log.fake-file.ts:2:1 --> ", "popo");
			"
		`);
	});
	it("whitespace logs", () => {
		const project = new Project();
		const sourceFile = project.addSourceFileAtPath(
			"/Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/whitespace.fake-file.ts",
		);

		expect(betterLogTransform(sourceFile)).toMatchInlineSnapshot(`
			"console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/whitespace.fake-file.ts:1:1 --> ", "");

			console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/whitespace.fake-file.ts:3:1 --> ", "white-sapce");

			console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/whitespace.fake-file.ts:5:1 --> ", "white-sapce");

			const _ = () => {
				console.log("from: vscode://file//Users/mathiasbarczewski/projects/unplugin-better-ts-log/test/test-files/whitespace.fake-file.ts:8:2 --> ", "white-sapce");
			};
			"
		`);
	});
});
