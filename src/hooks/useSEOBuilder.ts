import { useState, useCallback } from "react";
import { INITIAL_FORM_DATA } from "@/constants/metadata";
import type { IFormData } from "@/types/seo";

export const useSEOBuilder = () => {
	const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
	const [selectedFramework, setSelectedFramework] = useState("nextjs");
	const [activePreview, setActivePreview] = useState("google");
	const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);
	const [copiedSection, setCopiedSection] = useState("");

	const handleCheck = useCallback((category: string, itemKey: string, checked: boolean) => {
		const fullKey = `${category}-${itemKey}`;
		setCheckedItems((prev) => ({
			...prev,
			[fullKey]: checked,
		}));
	}, []);

	const handleInputChange = useCallback((key: keyof IFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	}, []);

	const handleCopy = useCallback((code: string) => {
		navigator.clipboard.writeText(code);
		setCopiedSection("code");
		setTimeout(() => setCopiedSection(""), 2000);
	}, []);

	return {
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
	};
};
