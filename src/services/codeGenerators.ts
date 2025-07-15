import type { IFormData } from "@/types/seo";

export class CodeGeneratorService {
	static generateNextJSCode(formData: IFormData, enabledCategories: string[]): string {
		let code = 'import { Metadata } from "next";\n\n';
		code += "export const metadata: Metadata = {\n";

		// Basic SEO
		if (enabledCategories.includes("basic")) {
			if (formData.title) code += `  title: "${formData.title}",\n`;
			if (formData.description) code += `  description: "${formData.description}",\n`;
			if (formData.keywords) code += `  keywords: "${formData.keywords}",\n`;
			if (formData.author) code += `  authors: [{ name: "${formData.author}" }],\n`;
			if (formData.canonicalUrl) {
				code += `  alternates: {\n    canonical: "${formData.canonicalUrl}",\n  },\n`;
			}
			if (formData.robots) code += `  robots: "${formData.robots}",\n`;
		}

		// Open Graph
		if (enabledCategories.includes("openGraph")) {
			code += "  openGraph: {\n";
			if (formData.ogTitle) code += `    title: "${formData.ogTitle}",\n`;
			if (formData.ogDescription) code += `    description: "${formData.ogDescription}",\n`;
			if (formData.ogUrl) code += `    url: "${formData.ogUrl}",\n`;
			if (formData.ogSiteName) code += `    siteName: "${formData.ogSiteName}",\n`;
			code += `    type: "${formData.ogType}",\n`;
			if (formData.ogImage) {
				code += "    images: [{\n";
				code += `      url: "${formData.ogImage}",\n`;
				code += "      width: 1200,\n";
				code += "      height: 630,\n";
				code += `      alt: "${formData.ogTitle || formData.title}",\n`;
				code += "    }],\n";
			}
			code += "  },\n";
		}

		// Twitter
		if (enabledCategories.includes("twitter")) {
			code += "  twitter: {\n";
			code += '    card: "summary_large_image",\n';
			if (formData.twitterTitle) code += `    title: "${formData.twitterTitle}",\n`;
			if (formData.twitterDescription) code += `    description: "${formData.twitterDescription}",\n`;
			if (formData.twitterImage) code += `    images: ["${formData.twitterImage}"],\n`;
			if (formData.twitterSite) code += `    site: "${formData.twitterSite}",\n`;
			if (formData.twitterCreator) code += `    creator: "${formData.twitterCreator}",\n`;
			code += "  },\n";
		}

		code += "};";

		// Add JSON-LD if enabled
		if (enabledCategories.includes("jsonld")) {
			code += this.generateJSONLD(formData);
		}

		return code;
	}

	static generateNextJSPagesCode(formData: IFormData): string {
		let code = 'import Head from "next/head";\n\n';
		code += "export default function Page() {\n";
		code += "  return (\n    <>\n      <Head>\n";

		if (formData.title) code += `        <title>${formData.title}</title>\n`;
		if (formData.description) code += `        <meta name="description" content="${formData.description}" />\n`;
		if (formData.viewport) code += `        <meta name="viewport" content="${formData.viewport}" />\n`;
		if (formData.canonicalUrl) code += `        <link rel="canonical" href="${formData.canonicalUrl}" />\n`;
		if (formData.robots) code += `        <meta name="robots" content="${formData.robots}" />\n`;
		if (formData.keywords) code += `        <meta name="keywords" content="${formData.keywords}" />\n`;
		if (formData.author) code += `        <meta name="author" content="${formData.author}" />\n`;

		// Open Graph
		if (formData.ogTitle) code += `        <meta property="og:title" content="${formData.ogTitle}" />\n`;
		if (formData.ogDescription)
			code += `        <meta property="og:description" content="${formData.ogDescription}" />\n`;
		if (formData.ogImage) code += `        <meta property="og:image" content="${formData.ogImage}" />\n`;
		if (formData.ogUrl) code += `        <meta property="og:url" content="${formData.ogUrl}" />\n`;
		code += `        <meta property="og:type" content="${formData.ogType}" />\n`;
		if (formData.ogSiteName) code += `        <meta property="og:site_name" content="${formData.ogSiteName}" />\n`;

		// Twitter
		code += `        <meta name="twitter:card" content="summary_large_image" />\n`;
		if (formData.twitterTitle) code += `        <meta name="twitter:title" content="${formData.twitterTitle}" />\n`;
		if (formData.twitterDescription)
			code += `        <meta name="twitter:description" content="${formData.twitterDescription}" />\n`;
		if (formData.twitterImage) code += `        <meta name="twitter:image" content="${formData.twitterImage}" />\n`;
		if (formData.twitterSite) code += `        <meta name="twitter:site" content="${formData.twitterSite}" />\n`;
		if (formData.twitterCreator)
			code += `        <meta name="twitter:creator" content="${formData.twitterCreator}" />\n`;

		code += "      </Head>\n      {/* Your page content */}\n    </>\n  );\n}";
		return code;
	}

	static generateHTMLCode(formData: IFormData): string {
		let code = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n';

		if (formData.viewport) code += `  <meta name="viewport" content="${formData.viewport}">\n`;
		if (formData.title) code += `  <title>${formData.title}</title>\n`;
		if (formData.description) code += `  <meta name="description" content="${formData.description}">\n`;
		if (formData.canonicalUrl) code += `  <link rel="canonical" href="${formData.canonicalUrl}">\n`;
		if (formData.robots) code += `  <meta name="robots" content="${formData.robots}">\n`;
		if (formData.keywords) code += `  <meta name="keywords" content="${formData.keywords}">\n`;
		if (formData.author) code += `  <meta name="author" content="${formData.author}">\n`;

		// Open Graph
		if (formData.ogTitle) code += `  <meta property="og:title" content="${formData.ogTitle}">\n`;
		if (formData.ogDescription) code += `  <meta property="og:description" content="${formData.ogDescription}">\n`;
		if (formData.ogImage) code += `  <meta property="og:image" content="${formData.ogImage}">\n`;
		if (formData.ogUrl) code += `  <meta property="og:url" content="${formData.ogUrl}">\n`;
		code += `  <meta property="og:type" content="${formData.ogType}">\n`;
		if (formData.ogSiteName) code += `  <meta property="og:site_name" content="${formData.ogSiteName}">\n`;

		// Twitter
		code += `  <meta name="twitter:card" content="summary_large_image">\n`;
		if (formData.twitterTitle) code += `  <meta name="twitter:title" content="${formData.twitterTitle}">\n`;
		if (formData.twitterDescription)
			code += `  <meta name="twitter:description" content="${formData.twitterDescription}">\n`;
		if (formData.twitterImage) code += `  <meta name="twitter:image" content="${formData.twitterImage}">\n`;
		if (formData.twitterSite) code += `  <meta name="twitter:site" content="${formData.twitterSite}">\n`;
		if (formData.twitterCreator) code += `  <meta name="twitter:creator" content="${formData.twitterCreator}">\n`;

		code += "</head>\n<body>\n  <!-- Your content here -->\n</body>\n</html>";
		return code;
	}

	static generateVueCode(formData: IFormData): string {
		let code = "// Using Vue Meta\nexport default {\n  metaInfo: {\n";

		if (formData.title) code += `    title: "${formData.title}",\n`;
		code += "    meta: [\n";

		if (formData.description) code += `      { name: "description", content: "${formData.description}" },\n`;
		if (formData.viewport) code += `      { name: "viewport", content: "${formData.viewport}" },\n`;
		if (formData.robots) code += `      { name: "robots", content: "${formData.robots}" },\n`;

		code += "    ],\n    link: [\n";
		if (formData.canonicalUrl) code += `      { rel: "canonical", href: "${formData.canonicalUrl}" },\n`;
		code += "    ]\n  }\n}";

		return code;
	}

	// TODO: vue useHead impl
	// TODO: Add More frameworks

	static generateAngularCode(formData: IFormData): string {
		let code =
			'import { Component } from "@angular/core";\nimport { Title, Meta } from "@angular/platform-browser";\n\n';
		code += '@Component({\n  selector: "app-page",\n  template: `<!-- Your template -->`\n})\n';
		code +=
			"export class PageComponent {\n  constructor(private titleService: Title, private metaService: Meta) {\n";
		code += "    this.setSEO();\n  }\n\n  setSEO() {\n";

		if (formData.title) code += `    this.titleService.setTitle("${formData.title}");\n`;
		if (formData.description)
			code += `    this.metaService.updateTag({ name: "description", content: "${formData.description}" });\n`;

		code += "  }\n}";
		return code;
	}

	private static generateJSONLD(formData: IFormData): string {
		if (!formData.orgName && !formData.articleHeadline) return "";

		let jsonld = "\n// Add this JSON-LD script to your <head> section\n";
		jsonld += "const structuredData = {\n";
		jsonld += '  "@context": "https://schema.org",\n';

		if (formData.orgName) {
			jsonld += '  "@type": "Organization",\n';
			jsonld += `  "name": "${formData.orgName}",\n`;
			if (formData.orgUrl) jsonld += `  "url": "${formData.orgUrl}",\n`;
			if (formData.orgLogo) jsonld += `  "logo": "${formData.orgLogo}",\n`;
		}

		if (formData.articleHeadline) {
			jsonld += '  "@type": "Article",\n';
			jsonld += `  "headline": "${formData.articleHeadline}",\n`;
			if (formData.articleAuthor)
				jsonld += `  "author": { "@type": "Person", "name": "${formData.articleAuthor}" },\n`;
			if (formData.articleDatePublished) jsonld += `  "datePublished": "${formData.articleDatePublished}",\n`;
			if (formData.articleImage) jsonld += `  "image": "${formData.articleImage}",\n`;
		}

		jsonld = jsonld.replace(/,\n$/, "\n");
		jsonld += "};";
		return jsonld;
	}

	static generateCode(formData: IFormData, selectedFramework: string, checkedItems: Record<string, boolean>): string {
		const enabledFields = Object.keys(checkedItems).filter((key) => checkedItems[key]);
		const enabledCategories = [...new Set(enabledFields.map((key) => key.split("-")[0]))];

		switch (selectedFramework) {
			case "nextjs":
				return this.generateNextJSCode(formData, enabledCategories);
			case "nextjs_pages":
				return this.generateNextJSPagesCode(formData);
			case "html":
				return this.generateHTMLCode(formData);
			case "vue":
				return this.generateVueCode(formData);
			case "angular":
				return this.generateAngularCode(formData);
			default:
				return this.generateNextJSCode(formData, enabledCategories);
		}
	}
}
