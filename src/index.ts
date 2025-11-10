import { Project } from "ts-morph";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import { betterLogTransform } from "./better-log";
import type { Options } from "./types";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options,
) => {
	const project = new Project();

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

				console.log(sourceFile.getFilePath());

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
