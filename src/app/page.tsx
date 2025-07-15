"use client";
import React, { useMemo } from "react";
import { FRAMEWORKS, METADATA_CATEGORIES } from "@/constants/metadata";
import { useSEOBuilder } from "@/hooks/useSEOBuilder";
import { getRecommendedCount, generatePreviewData } from "@/utils/seo";
import { CodeGeneratorService } from "@/services/codeGenerators";
import { MetadataForm } from "@/components/MetadataForm";
import { PreviewSection } from "@/components/PreviewSection";
import { CodeSection } from "@/components/CodeSection";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ValidationWarning } from "@/components/ValidationWarning";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
	const {
		checkedItems,
		selectedFramework,
		setSelectedFramework,
		activePreview,
		setActivePreview,
		formData,
		copiedSection,
		handleCheck,
		handleInputChange,
		handleCopy,
	} = useSEOBuilder();

	const recommendedChecks = getRecommendedCount(checkedItems, METADATA_CATEGORIES);
	const previewData = useMemo(() => {
		return generatePreviewData(formData);
	}, [formData]);
	const generatedCode = useMemo(() => {
		return CodeGeneratorService.generateCode(formData, selectedFramework, checkedItems);
	}, [formData, selectedFramework, checkedItems]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">SEO Builder</h1>
							<p className="text-gray-600 dark:text-gray-400 mt-2">
								Build optimized metadata for your web application
							</p>
						</div>
						<ThemeToggle />
					</div>

					{/* Progress Indicator */}
					<ProgressIndicator checked={recommendedChecks.checked} total={recommendedChecks.total} />
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Builder Section */}
					<div className="space-y-6">
						<MetadataForm
							checkedItems={checkedItems}
							formData={formData}
							onCheck={handleCheck}
							onInputChange={handleInputChange}
						/>
					</div>

					<div className="space-y-6">
						<PreviewSection
							activePreview={activePreview}
							setActivePreview={setActivePreview}
							previewData={previewData}
						/>

						<CodeSection
							code={generatedCode}
							framework={FRAMEWORKS[selectedFramework].name}
							onSelectFramework={setSelectedFramework}
							copiedSection={copiedSection}
							onCopy={handleCopy}
						/>

						<ValidationWarning missingCount={recommendedChecks.total - recommendedChecks.checked} />
					</div>
				</div>
			</main>
		</div>
	);
}
