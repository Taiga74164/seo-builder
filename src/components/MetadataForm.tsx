import React from "react";
import { FaStar } from "react-icons/fa6";
import { getCharacterCount } from "@/utils/seo";
import { METADATA_CATEGORIES } from "@/constants/metadata";
import type { IFormData } from "@/types/seo";
import { Checkbox } from "@/components/ui/checkbox";

interface IMetadataFormProps {
	checkedItems: Record<string, boolean>;
	formData: IFormData;
	onCheck: (category: string, itemKey: string, checked: boolean) => void;
	onInputChange: (key: keyof IFormData, value: string) => void;
}

export const MetadataForm: React.FC<IMetadataFormProps> = ({ checkedItems, formData, onCheck, onInputChange }) => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Metadata Components</h2>

			{Object.entries(METADATA_CATEGORIES).map(([category, config]) => {
				const IconComponent = config.icon;
				return (
					<div key={category} className="mb-8">
						<div className="flex items-center mb-4">
							<IconComponent className="w-5 h-5 mr-2 text-blue-500" />
							<div>
								<h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{config.title}</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
							</div>
						</div>

						<div className="space-y-4">
							{config.items.map((item) => {
								const isChecked = checkedItems[`${category}-${item.key}`] || false;
								const charInfo = item.maxLength
									? getCharacterCount(formData[item.key as keyof IFormData] as string, item.maxLength)
									: null;

								return (
									<div key={item.key} className="space-y-2">
										<div className="flex items-start space-x-3">
											<Checkbox
												id={`${category}-${item.key}`}
												checked={isChecked}
												onCheckedChange={(checked) =>
													onCheck(category, item.key, checked as boolean)
												}
												className="mt-0.5"
											/>
											<div className="flex-1">
												<div className="flex items-center space-x-2">
													<label
														htmlFor={`${category}-${item.key}`}
														className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
													>
														{item.label}
													</label>
													{item.required && (
														<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
															Required
														</span>
													)}
													{item.recommended && <FaStar className="w-3 h-3 text-yellow-500" />}
												</div>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
													{item.description}
												</p>
											</div>
										</div>

										{isChecked && (
											<div className="ml-8 space-y-1">
												<input
													type="text"
													placeholder={item.placeholder}
													value={(formData[item.key as keyof IFormData] as string) || ""}
													onChange={(e) =>
														onInputChange(item.key as keyof IFormData, e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
												/>
												{charInfo && (
													<div className="flex justify-between text-xs">
														<span className={charInfo.color}>
															{charInfo.currentLength}/{item.maxLength} characters
														</span>
														<div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
															<div
																className={`h-1.5 rounded-full transition-all ${
																	charInfo.percentage > 90
																		? "bg-red-500"
																		: charInfo.percentage > 75
																			? "bg-yellow-500"
																			: "bg-green-500"
																}`}
																style={{
																	width: `${Math.min(charInfo.percentage, 100)}%`,
																}}
															/>
														</div>
													</div>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};
