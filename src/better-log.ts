import { Node, type SourceFile, ts } from "ts-morph";

export function betterLogTransform(sourceFile: SourceFile): string {
	sourceFile.forEachDescendant((node) => {
		if (Node.isCallExpression(node)) {
			const expression = node.getExpressionIfKind(
				ts.SyntaxKind.PropertyAccessExpression,
			);

			if (!expression) return;
			if (!isConsoleLog(expression.getFullText())) return;

			const args = node.getArguments().map((arg) => {
				return arg.getFullText();
			});

			const { line: expressionLine, column: expressionColumn } =
				sourceFile.getLineAndColumnAtPos(expression.getStartLinePos());

			const replaceText = `console.log("from: ${generateVsCodeLink(sourceFile.getFilePath(), expressionLine, expressionColumn)} --> ", ${argumentsMap(args)})`;
			node.replaceWithText(replaceText);
		}

		return;
	});

	return sourceFile.getText();
}

function isConsoleLog(text: string): boolean {
	return [
		"console.log",
		"console.warn",
		"console.error",
		"console.time",
		"console.debug",
	].some((value) => text.includes(value));
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
