import { Node, Project, ts } from "ts-morph";

export function betterLog(fileSource: string): Array<string> {
	const project = new Project();
	const sourceFile = project.addSourceFileAtPath(fileSource);

	const replaceTexts: Array<string> = [];

	sourceFile.forEachChild((node) => {
		const firstChild = node.getFirstChild();

		if (Node.isCallExpression(firstChild)) {
			const expression = firstChild.getExpressionIfKind(
				ts.SyntaxKind.PropertyAccessExpression,
			);

			if (!expression) return;
			if (!isConsoleLog(expression.getFullText())) return;

			const args = firstChild.getArguments().map((arg) => {
				return arg.getFullText();
			});

			const replaceText = `console.log("from: ${generateVsCodeLink(fileSource, firstChild.getStartLineNumber(), firstChild.getStartLinePos())}, ts-pos: (${sourceFile.getPos()}) --> ", ${argumentsMap(args)})`;
			firstChild.replaceWithText(replaceText);

			return replaceTexts.push(replaceText);
		}
	});

	return replaceTexts;
}

function isConsoleLog(text: string): boolean {
	return [
		"console.log",
		"console.warn",
		"console.error",
		"console.time",
		"console.debug",
	].includes(text);
}

function generateVsCodeLink(
	fileAbsolutePath: string,
	lineNumber: number,
	linePos: number,
): string {
	return `vscode://file/${fileAbsolutePath}:${lineNumber}:${linePos}`;
}

function argumentsMap(
	args: string[],
): string | { [k: string]: string } | undefined {
	if (args.length === 0) return undefined;
	if (args.length === 1) return args[0];

	return `${args.join(", ")}`;
}
