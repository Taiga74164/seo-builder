import React from "react";
import { EnhancedCodeSection } from "./CodeViewer";

interface ICodeSectionProps {
	code: string;
	framework: string;
	onSelectFramework: (framework: string) => void;
	copiedSection: string;
	onCopy: (code: string) => void;
}

export const CodeSection: React.FC<ICodeSectionProps> = ({
	code,
	framework,
	onSelectFramework,
	copiedSection,
	onCopy,
}) => {
	const getFrameworkKey = (frameworkName: string): string => {
		const frameworkMap: Record<string, string> = {
			"Next.js (App Router)": "nextjs",
			"Next.js (Pages Router)": "nextjs_pages",
			HTML: "html",
			"Vue.js": "vue",
			Angular: "angular",
		};
		return frameworkMap[frameworkName] || "typescript";
	};

	return (
		<EnhancedCodeSection
			code={code}
			framework={framework}
			selectedFramework={getFrameworkKey(framework)}
			onSelectFramework={onSelectFramework}
			copiedSection={copiedSection}
			onCopy={onCopy}
		/>
	);
};
