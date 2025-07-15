import React, { useState, memo, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { FaCopy, FaCheck, FaDownload, FaCode } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FRAMEWORKS } from "@/constants/metadata";

interface CodeViewerProps {
	code: string;
	language: string;
	fileName?: string;
	framework?: string;
	showLineNumbers?: boolean;
	maxHeight?: number;
	className?: string;
	copiedSection?: string;
	onCopy?: (code: string) => void;
}

const languageMap: Record<string, string> = {
	nextjs: "typescript",
	nextjs_pages: "typescript",
	html: "markup",
	vue: "javascript",
	angular: "typescript",
	typescript: "typescript",
	javascript: "javascript",
	tsx: "tsx",
	jsx: "jsx",
};

const extensionMap: Record<string, string> = {
	nextjs: "layout.tsx",
	nextjs_pages: "page.tsx",
	html: "index.html",
	vue: "component.vue",
	angular: "component.ts",
	typescript: "code.ts",
	javascript: "code.js",
};

export const CodeViewer = memo<CodeViewerProps>(
	({ code, language, fileName, framework, showLineNumbers = true, className = "", copiedSection = "", onCopy }) => {
		const [mounted, setMounted] = useState(false);
		const { theme, resolvedTheme } = useTheme();

		// Prevent hydration mismatch by only rendering theme-dependent content after mount
		useEffect(() => {
			setMounted(true);
		}, []);

		const mappedLanguage = languageMap[language] || language;
		const displayFileName = fileName || extensionMap[language] || "code.txt";

		const syntaxTheme = mounted && (resolvedTheme === "dark" || theme === "dark") ? vscDarkPlus : vs;

		const handleCopy = async () => {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					await navigator.clipboard.writeText(code);
				} else {
					// Fallback for older browsers
					const textArea = document.createElement("textarea");
					textArea.value = code;
					document.body.appendChild(textArea);
					textArea.select();
					document.execCommand("copy");
					document.body.removeChild(textArea);
				}

				// Call the onCopy prop if provided
				if (onCopy) {
					onCopy(code);
				}
			} catch (error) {
				console.error("Failed to copy code:", error);
			}
		};

		const handleDownload = () => {
			const blob = new Blob([code], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = displayFileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		};

		// Default styles that work for both light and dark themes
		const lineNumberStyle = {
			minWidth: "3em",
			paddingRight: "1em",
			color: mounted && (resolvedTheme === "dark" || theme === "dark") ? "#6B7280" : "#9CA3AF",
			borderRight:
				mounted && (resolvedTheme === "dark" || theme === "dark") ? "1px solid #374151" : "1px solid #E5E7EB",
			marginRight: "1em",
		};

		// Determine theme key based on mounted state and resolved theme
		const themeKey = mounted ? (resolvedTheme === "dark" || theme === "dark" ? "dark" : "light") : "light";

		return (
			<>
				{/* Main Code Viewer */}
				<div
					className={`
        bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 
        shadow-sm overflow-hidden transition-all duration-300
        ${className}
      `}
				>
					<div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
						<div className="flex items-center space-x-3">
							<div className="flex items-center space-x-2">
								<FaCode className="w-4 h-4 text-blue-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									{displayFileName}
								</span>
							</div>
						</div>

						<div className="flex items-center space-x-1">
							<button
								onClick={handleDownload}
								className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								title="Download code"
							>
								<FaDownload className="w-4 h-4 text-gray-600 dark:text-gray-400" />
							</button>

							<button
								onClick={handleCopy}
								className={`
                flex items-center space-x-1 px-3 py-1.5 rounded text-sm font-medium transition-all
                ${
					copiedSection === "code"
						? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
						: "bg-blue-500 hover:bg-blue-600 text-white"
				}
              `}
								title="Copy code"
							>
								{copiedSection === "code" ? (
									<>
										<FaCheck className="w-3 h-3" />
										<span>Copied!</span>
									</>
								) : (
									<>
										<FaCopy className="w-3 h-3" />
										<span>Copy</span>
									</>
								)}
							</button>
						</div>
					</div>

					{/* Code Content */}
					<div
						className="relative overflow-auto"
						style={{
							maxHeight: "calc(100vh - 120px)",
						}}
					>
						<SyntaxHighlighter
							key={themeKey}
							language={mappedLanguage}
							style={syntaxTheme}
							showLineNumbers={showLineNumbers}
							wrapLines={true}
							wrapLongLines={true}
							customStyle={{
								margin: 0,
								padding: "1rem",
								background: "transparent",
								fontSize: "14px",
								fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, Consolas, monospace',
							}}
							lineNumberStyle={lineNumberStyle}
						>
							{code}
						</SyntaxHighlighter>
					</div>

					<div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
						<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
							<div className="flex items-center space-x-4">
								<span>Lines: {code.split("\n").length}</span>
								<span>Size: {new Blob([code]).size} bytes</span>
								<span>Language: {mappedLanguage}</span>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},
);

CodeViewer.displayName = "CodeViewer";

interface ICodeSectionProps {
	code: string;
	framework: string;
	selectedFramework: string;
	onSelectFramework: (framework: string) => void;
	copiedSection: string;
	onCopy: (code: string) => void;
}

export const EnhancedCodeSection: React.FC<ICodeSectionProps> = ({
	code,
	framework,
	selectedFramework,
	onSelectFramework,
	copiedSection,
	onCopy,
}) => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
			<div className="flex flex-col items-center">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-2">
					<FaCode className="w-5 h-5 mr-2 text-blue-500" />
					Generated Code
				</h3>
				<div className="flex justify-center">
					<Select value={selectedFramework} onValueChange={onSelectFramework}>
						<SelectTrigger className="w-60">
							<SelectValue placeholder="Select Framework" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(FRAMEWORKS).map(([key, framework]) => {
								const Icon = framework.icon;
								return (
									<SelectItem key={key} value={key} className="flex items-center gap-2">
										<Icon size={24} className="inline mr-2" />
										<span>{framework.name}</span>
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>
			</div>

			<CodeViewer
				code={code}
				language={selectedFramework}
				framework={framework}
				showLineNumbers={true}
				maxHeight={400}
				copiedSection={copiedSection}
				onCopy={onCopy}
			/>
		</div>
	);
};
