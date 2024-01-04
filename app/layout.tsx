import { Provider } from "jotai/react";
import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
	title: "JSON to UDM",
	description: "Convert JSON responses to UDM with AI",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<body className="min-h-screen overflow-x-hidden font-sans antialiased">
				<Provider>
					<ThemeProvider>
						<Navbar />
						{children}
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
