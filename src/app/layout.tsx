import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

export const metadata: Metadata = {
	title: "SEO Builder - Build optimized metadata for your web application",
	description:
		"A user-friendly SEO meta tag builder helping you create and manage your website's SEO metadata effortlessly.",
	alternates: {
		canonical: "https://seo.joaquin.moe",
	},
	robots: "index, follow",
	openGraph: {
		title: "SEO Builder - Build optimized metadata for your web application",
		description:
			"A user-friendly SEO meta tag builder helping you create and manage your website's SEO metadata effortlessly.",
		url: "https://seo.joaquin.moe",
		siteName: "SEO Builder",
		type: "website",
		images: [
			{
				url: "/images/logo-og.png",
				width: 1200,
				height: 630,
				alt: "SEO Builder - Build optimized metadata for your web application",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "SEO Builder - Build optimized metadata for your web application",
		description:
			"A user-friendly SEO meta tag builder helping you create and manage your website's SEO metadata effortlessly.",
		images: ["/images/logo.png"],
	},
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/images/logo.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/images/logo.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${poppins.variable} font-sans antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
