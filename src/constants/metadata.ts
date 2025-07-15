import { FaFacebook, FaTwitter, FaCode } from "react-icons/fa6";
import { IMetadataCategory, IFramework, IFormData } from "@/types/seo";
import { RiNextjsFill } from "react-icons/ri";
import { FaAngular, FaHtml5, FaSearchengin } from "react-icons/fa";
import { IoLogoVue } from "react-icons/io5";

export const FRAMEWORKS: Record<string, IFramework> = {
	nextjs: { name: "Next.js (App Router)", icon: RiNextjsFill },
	nextjs_pages: { name: "Next.js (Pages Router)", icon: RiNextjsFill },
	html: { name: "HTML", icon: FaHtml5 },
	vue: { name: "Vue.js", icon: IoLogoVue },
	angular: { name: "Angular", icon: FaAngular },
} as const;

export const METADATA_CATEGORIES: Record<string, IMetadataCategory> = {
	basic: {
		title: "Basic SEO",
		description: "Essential metadata for search engines",
		icon: FaSearchengin,
		items: [
			{
				key: "title",
				label: "Page Title",
				placeholder: "Your amazing page title",
				maxLength: 65,
				required: true,
				recommended: true,
				description: "The main title that appears in search results",
			},
			{
				key: "description",
				label: "Meta Description",
				placeholder: "Brief description of your page content",
				maxLength: 160,
				required: true,
				recommended: true,
				description: "Summary shown in search results below the title",
			},
			{
				key: "canonicalUrl",
				label: "Canonical URL",
				placeholder: "https://yoursite.com/page",
				recommended: true,
				description: "Prevents duplicate content issues",
			},
			{
				key: "viewport",
				label: "Viewport (Mobile)",
				placeholder: "width=device-width, initial-scale=1.0",
				recommended: false,
				description: "Essential for mobile-friendly pages",
			},
			{
				key: "robots",
				label: "Robots Directive",
				placeholder: "index, follow",
				recommended: false,
				description: "Controls how search engines crawl your page",
			},
			{
				key: "keywords",
				label: "Keywords",
				placeholder: "keyword1, keyword2, keyword3",
				recommended: false,
				description: "Legacy tag, limited SEO value in 2025",
			},
			{
				key: "author",
				label: "Author",
				placeholder: "John Doe",
				recommended: false,
				description: "Page author information",
			},
		],
	},
	openGraph: {
		title: "Open Graph (Social Media)",
		description: "Required for Facebook, LinkedIn, Discord, and other social platforms",
		icon: FaFacebook,
		items: [
			{
				key: "ogTitle",
				label: "OG Title",
				placeholder: "Title for social sharing",
				maxLength: 65,
				required: true,
				recommended: true,
				description: "Title when shared on social media",
			},
			{
				key: "ogDescription",
				label: "OG Description",
				placeholder: "Description for social sharing",
				maxLength: 160,
				recommended: true,
				description: "Description when shared on social media",
			},
			{
				key: "ogImage",
				label: "OG Image",
				placeholder: "https://yoursite.com/og-image.jpg",
				required: true,
				recommended: true,
				description: "Image for social shares (1200x630px recommended)",
			},
			{
				key: "ogUrl",
				label: "OG URL",
				placeholder: "https://yoursite.com/page",
				required: true,
				recommended: true,
				description: "Canonical URL for social sharing",
			},
			{
				key: "ogType",
				label: "OG Type",
				placeholder: "website",
				recommended: false,
				description: "Type of content (website, article, etc.)",
			},
			{
				key: "ogSiteName",
				label: "Site Name",
				placeholder: "Your Site Name",
				recommended: false,
				description: "Name of your website",
			},
		],
	},
	twitter: {
		title: "Twitter Cards",
		description: "Optimized display on Twitter/X platform",
		icon: FaTwitter,
		items: [
			{
				key: "twitterTitle",
				label: "Twitter Title",
				placeholder: "Title for Twitter",
				maxLength: 70,
				recommended: true,
				description: "Title for Twitter cards",
			},
			{
				key: "twitterDescription",
				label: "Twitter Description",
				placeholder: "Description for Twitter",
				maxLength: 200,
				recommended: true,
				description: "Description for Twitter cards",
			},
			{
				key: "twitterImage",
				label: "Twitter Image",
				placeholder: "https://yoursite.com/twitter-image.jpg",
				recommended: true,
				description: "Image for Twitter cards",
			},
			{
				key: "twitterSite",
				label: "Twitter Site",
				placeholder: "@yoursite",
				recommended: false,
				description: "Your site's Twitter handle",
			},
			{
				key: "twitterCreator",
				label: "Twitter Creator",
				placeholder: "@author",
				recommended: false,
				description: "Content creator's Twitter handle",
			},
		],
	},
	jsonld: {
		title: "Structured Data (JSON-LD)",
		description: "Rich snippets and enhanced search results",
		icon: FaCode,
		items: [
			{
				key: "orgName",
				label: "Organization Name",
				placeholder: "Your Company",
				recommended: true,
				description: "Your organization name for rich snippets",
			},
			{
				key: "orgUrl",
				label: "Organization URL",
				placeholder: "https://yourcompany.com",
				recommended: true,
				description: "Your organization website",
			},
			{
				key: "orgLogo",
				label: "Organization Logo",
				placeholder: "https://yourcompany.com/logo.png",
				recommended: false,
				description: "Logo for knowledge panels",
			},
			{
				key: "articleHeadline",
				label: "Article Headline",
				placeholder: "Your Article Title",
				recommended: false,
				description: "For blog posts and articles",
			},
			{
				key: "articleAuthor",
				label: "Article Author",
				placeholder: "Author Name",
				recommended: false,
				description: "Author of the article",
			},
			{
				key: "articleDatePublished",
				label: "Publish Date",
				placeholder: "2025-01-15",
				recommended: false,
				description: "Article publication date (YYYY-MM-DD)",
			},
			{
				key: "articleImage",
				label: "Article Image",
				placeholder: "https://yoursite.com/article-image.jpg",
				recommended: false,
				description: "Featured image for the article",
			},
		],
	},
} as const;

export const INITIAL_FORM_DATA: IFormData = {
	// Basic SEO
	title: "Page Title",
	description: "",
	canonicalUrl: "",
	viewport: "",
	robots: "index, follow",
	keywords: "",
	author: "",

	// Open Graph
	ogTitle: "",
	ogDescription: "",
	ogImage: "/images/logo.png",
	ogUrl: "",
	ogType: "website",
	ogSiteName: "",

	// Twitter Cards
	twitterTitle: "",
	twitterDescription: "",
	twitterImage: "",
	twitterSite: "",
	twitterCreator: "",

	// JSON-LD
	orgName: "",
	orgUrl: "",
	orgLogo: "",
	articleHeadline: "",
	articleAuthor: "",
	articleDatePublished: "",
	articleImage: "",
};
