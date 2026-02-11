import {
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

const HeroImage = defineNestedType(() => ({
	name: "HeroImage",
	fields: {
		src: {
			type: "string",
			required: true,
		},
		alt: {
			type: "string",
		},
		caption: {
			type: "string",
		},
	},
}));

const ProjectLink = defineNestedType(() => ({
	name: "ProjectLink",
	fields: {
		src: {
			type: "string",
			required: true,
		},
		label: {
			type: "string",
		},
		alt: {
			type: "string",
		},
	},
}));

const ProjectLink2 = defineNestedType(() => ({
	name: "ProjectLink",
	fields: {
		src: {
			type: "string",
			required: true,
		},
		label: {
			type: "string",
		},
		alt: {
			type: "string",
		},
	},
}));

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",

	fields: {
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		jobTitle: {
			type: "string",
		},
		companyName: {
			type: "string",
		},
		description: {
			type: "string",
			required: true,
		},
		heroImages: {
			type: "list",
			of: HeroImage,
		},
		topics: {
			type: "list",
			of: {
				type: "string",
			},
		},
		tools: {
			type: "list",
			of: {
				type: "string",
			},
		},
		date: {
			type: "date",
		},
		url: {
			type: "list",
			of: ProjectLink,
		},
			url2: {
			type: "list",
			of: ProjectLink2,
		},
		repository: {
			type: "string",
		},
	},
	computedFields,
}));


export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Page, Project],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
