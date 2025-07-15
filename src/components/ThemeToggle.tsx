"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	// return a placeholder to avoid hydration mismatch
	if (!mounted) {
		return <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />;
	}

	const isDark = theme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<button
			onClick={toggleTheme}
			className={`
				relative overflow-hidden
				w-10 h-10 rounded-full
				transition-all duration-300 ease-in-out
				transform hover:scale-110 active:scale-95
				shadow-lg hover:shadow-xl
				${
					isDark
						? "bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 focus:ring-purple-400"
						: "bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 focus:ring-yellow-300"
				}
			`}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
		>
			<div
				className={`
					absolute inset-0 rounded-full opacity-20 blur-xl transition-all duration-500
					${isDark ? "bg-purple-400" : "bg-yellow-300"}
				`}
			/>

			{/* Icon container with sliding animation */}
			<div className="relative w-full h-full flex items-center justify-center">
				<LuSun
					size={18}
					className={`
						absolute transition-all duration-500 ease-in-out text-white
						${isDark ? "transform translate-y-8 opacity-0 rotate-180" : "transform translate-y-0 opacity-100 rotate-0"}
					`}
				/>

				<LuMoon
					size={18}
					className={`
						absolute transition-all duration-500 ease-in-out text-white
						${isDark ? "transform translate-y-0 opacity-100 rotate-0" : "transform -translate-y-8 opacity-0 -rotate-180"}
					`}
				/>
			</div>
		</button>
	);
}
