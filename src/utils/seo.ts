import type { IFormData, ICharacterInfo, IMetadataCategory } from "@/types/seo";

export const getCharacterCount = (value: string, maxLength: number): ICharacterInfo => {
	const currentLength = value?.length || 0;
	const percentage = (currentLength / maxLength) * 100;
	const color = percentage > 90 ? "text-red-500" : percentage > 75 ? "text-yellow-500" : "text-green-500";

	return { currentLength, color, percentage };
};

export const getRecommendedCount = (
	checkedItems: Record<string, boolean>,
	metadataCategories: Record<string, IMetadataCategory>,
) => {
	const total = Object.values(metadataCategories).reduce((acc, category) => {
		return acc + category.items.filter((item) => item.recommended).length;
	}, 0);

	const checked = Object.keys(checkedItems).filter((key) => {
		const [category, itemKey] = key.split("-");
		const item = metadataCategories[category]?.items.find((i) => i.key === itemKey);
		return checkedItems[key] && item?.recommended;
	}).length;

	return { checked, total };
};

export const generatePreviewData = (formData: IFormData) => ({
	google: {
		title: formData.title || formData.ogTitle || "Your Page Title Will Appear Here",
		url: formData.canonicalUrl || formData.ogUrl || "https://yoursite.com/page",
		description:
			formData.description ||
			formData.ogDescription ||
			"Your meta description will appear here to give users a preview of your page content. Make it compelling and informative!",
	},
	facebook: {
		title: formData.ogTitle || formData.title || "Your Page Title",
		description: formData.ogDescription || formData.description || "Your description for social media sharing",
		image: formData.ogImage || "/placeholder-og.jpg",
		url: formData.ogUrl || formData.canonicalUrl || "yoursite.com",
		siteName: formData.ogSiteName || "Your Site",
	},
	twitter: {
		title: formData.twitterTitle || formData.ogTitle || formData.title || "Your Page Title",
		description:
			formData.twitterDescription ||
			formData.ogDescription ||
			formData.description ||
			"Your description for Twitter sharing",
		image: formData.twitterImage || formData.ogImage || "/placeholder-twitter.jpg",
		handle: formData.twitterSite || "@yoursite",
	},
});
