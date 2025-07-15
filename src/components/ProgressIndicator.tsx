import React from "react";

interface IProgressIndicatorProps {
	checked: number;
	total: number;
}

export const ProgressIndicator: React.FC<IProgressIndicatorProps> = ({ checked, total }) => {
	const percentage = total > 0 ? (checked / total) * 100 : 0;

	return (
		<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-blue-800 dark:text-blue-300">Recommended Setup Progress</span>
				<span className="text-sm text-blue-600 dark:text-blue-400">
					{checked}/{total} completed
				</span>
			</div>
			<div className="mt-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
				<div
					className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};
