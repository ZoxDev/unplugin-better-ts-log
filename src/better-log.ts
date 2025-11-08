import { Node, Project, ts } from 'ts-morph'

export function betterLog(fileSource: string): void {
  const project = new Project()
  const sourceFile = project.getSourceFileOrThrow(fileSource)

  sourceFile.forEachChild((node) => {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpressionIfKind(
        ts.SyntaxKind.PropertyAccessExpression,
      )

      if (!expression)
        return
      if (!isConsoleLog(expression.getFullText()))
        return

      const args = node.getArguments().map((arg) => {
        return arg.getFullText()
      })

      return node.replaceWithText(
        `console.log("from: ${generateVsCodeLink(fileSource, node.getStartLineNumber(), node.getStartLinePos())}(${sourceFile.getPos()}) --> ", ${argumentsMap(args)})`,
      )
    }
  })
}

function isConsoleLog(text: string): boolean {
  return [
    'console.log',
    'console.warn',
    'console.error',
    'console.time',
    'console.debug',
  ].includes(text)
}

function generateVsCodeLink(fileAbsolutePath: string, lineNumber: number, linePos: number): string {
  return `vscode://file/${fileAbsolutePath}:${lineNumber}:${linePos}`
}

function argumentsMap(args: string[]): string | { [k: string]: string } | undefined {
  if (args.length === 0)
    return undefined
  if (args.length === 1)
    return args[0]

  return Object.fromEntries(args.map((value, index) => [index, value]))
}
