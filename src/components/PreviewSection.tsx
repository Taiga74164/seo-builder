import React from "react";
import type { IPreviewData } from "@/types/seo";
import { FaEye, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import Image from "next/image";

interface PreviewSectionProps {
	activePreview: string;
	setActivePreview: (preview: string) => void;
	previewData: IPreviewData;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ activePreview, setActivePreview, previewData }) => {
	const previewTabs = [
		{ key: "google", label: "Google", icon: FaGoogle },
		{ key: "facebook", label: "Facebook", icon: FaFacebook },
		{ key: "twitter", label: "Twitter", icon: FaTwitter },
	];

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<div className="flex flex-col items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-2">
					<FaEye className="w-5 h-5 mr-2 text-blue-500" />
					Live Preview
				</h3>
				<div className="flex space-x-2">
					{previewTabs.map(({ key, label, icon: Icon }) => (
						<button
							key={key}
							onClick={() => setActivePreview(key)}
							className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
								activePreview === key
									? "bg-blue-500 text-white"
									: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
							}`}
						>
							<Icon className="w-3 h-3" />
							<span>{label}</span>
						</button>
					))}
				</div>
			</div>

			{activePreview === "google" && (
				<div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
					<div className="space-y-1">
						<div className="text-blue-600 text-lg hover:underline cursor-pointer">
							{previewData.google.title}
						</div>
						<div className="text-green-700 dark:text-green-400 text-sm">{previewData.google.url}</div>
						<div className="text-gray-600 dark:text-gray-300 text-sm">{previewData.google.description}</div>
					</div>
				</div>
			)}

			{activePreview === "facebook" && (
				<div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
					<div className="aspect-[1.91/1] bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
						{previewData.facebook.image && previewData.facebook.image !== "/placeholder-og.jpg" ? (
							<Image
								src={previewData.facebook.image}
								width={1200}
								height={630}
								alt="Preview"
								className="w-full h-full object-cover"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.style.display = "none";
									const nextSibling = target.nextSibling as HTMLElement;
									if (nextSibling) nextSibling.style.display = "flex";
								}}
							/>
						) : null}
						<div className="text-gray-500 dark:text-gray-400 text-sm">1200 x 630 Image</div>
					</div>
					<div className="p-3">
						<div className="text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">
							{previewData.facebook.url}
						</div>
						<div className="font-semibold text-gray-900 dark:text-white mb-1">
							{previewData.facebook.title}
						</div>
						<div className="text-gray-600 dark:text-gray-300 text-sm">
							{previewData.facebook.description}
						</div>
					</div>
				</div>
			)}

			{activePreview === "twitter" && (
				<div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
					<div className="aspect-[2/1] bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
						{previewData.twitter.image && previewData.twitter.image !== "/placeholder-twitter.jpg" ? (
							<Image
								src={previewData.twitter.image}
								width={1200}
								height={600}
								alt="Preview"
								className="w-full h-full object-cover"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.style.display = "none";
									const nextSibling = target.nextSibling as HTMLElement;
									if (nextSibling) nextSibling.style.display = "flex";
								}}
							/>
						) : null}
						<div className="text-gray-500 dark:text-gray-400 text-sm">Twitter Card Image</div>
					</div>
					<div className="p-3">
						<div className="font-semibold text-gray-900 dark:text-white mb-1">
							{previewData.twitter.title}
						</div>
						<div className="text-gray-600 dark:text-gray-300 text-sm mb-2">
							{previewData.twitter.description}
						</div>
						<div className="text-gray-500 dark:text-gray-400 text-sm">{previewData.twitter.handle}</div>
					</div>
				</div>
			)}
		</div>
	);
};
