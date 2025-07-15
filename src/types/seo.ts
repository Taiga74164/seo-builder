import { IconType } from "react-icons";

export interface IMetadataItem {
	key: string;
	label: string;
	placeholder: string;
	maxLength?: number;
	required?: boolean;
	recommended: boolean;
	description: string;
}

export interface IMetadataCategory {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	items: IMetadataItem[];
}

export interface IFormData {
	// Basic SEO
	title: string;
	description: string;
	canonicalUrl: string;
	viewport: string;
	robots: string;
	keywords: string;
	author: string;

	// Open Graph
	ogTitle: string;
	ogDescription: string;
	ogImage: string;
	ogUrl: string;
	ogType: string;
	ogSiteName: string;

	// Twitter Cards
	twitterTitle: string;
	twitterDescription: string;
	twitterImage: string;
	twitterSite: string;
	twitterCreator: string;

	// JSON-LD
	orgName: string;
	orgUrl: string;
	orgLogo: string;
	articleHeadline: string;
	articleAuthor: string;
	articleDatePublished: string;
	articleImage: string;
}

export interface IFramework {
	name: string;
	icon: IconType;
}

export interface ICharacterInfo {
	currentLength: number;
	color: string;
	percentage: number;
}

export interface IPreviewData {
	google: {
		title: string;
		url: string;
		description: string;
	};
	facebook: {
		title: string;
		description: string;
		image: string;
		url: string;
		siteName: string;
	};
	twitter: {
		title: string;
		description: string;
		image: string;
		handle: string;
	};
}
