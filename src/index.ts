import { Project, ts } from "ts-morph";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import { betterLogTransform } from "./better-log";
import type { Options } from "./types";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options,
) => {
	const project = new Project({
		compilerOptions: {
			jsx: ts.JsxEmit.React,
			jsxFactory: "React.createElement",
			jsxFragmentFactory: "React.Fragment",
			module: ts.ModuleKind.ESNext,
			target: ts.ScriptTarget.ESNext,
			noUnusedParameters: false,
			declaration: false,
			noEmit: true,
			allowJs: true,
		},
		// tsConfigFilePath: tsConfigPath,
		skipAddingFilesFromTsConfig: true,
		skipFileDependencyResolution: true,
		skipLoadingLibFiles: true,
		useInMemoryFileSystem: true,
	});

	return {
		name: "unplugin-better-ts-log",
		transform: {
			filter: {
				id: {
					exclude: options?.exclude,
					include: options?.include,
				},
			},

			handler(code, id) {
				const sourceFile = project.createSourceFile(id, code, {
					overwrite: true,
				});

				const newCode = betterLogTransform(sourceFile);
				return {
					code: newCode,
				};
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
