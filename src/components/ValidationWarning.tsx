import React from "react";
import { IoAlertCircle } from "react-icons/io5";

interface ValidationWarningProps {
	missingCount: number;
}

export const ValidationWarning: React.FC<ValidationWarningProps> = ({ missingCount }) => {
	if (missingCount <= 0) return null;

	return (
		<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
			<div className="flex items-center">
				<IoAlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-2" />
				<div>
					<h4 className="font-medium text-yellow-800 dark:text-yellow-300">Missing Recommended Tags</h4>
					<p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
						You have {missingCount} recommended metadata tags not configured. These are important for
						optimal SEO performance.
					</p>
				</div>
			</div>
		</div>
	);
};
