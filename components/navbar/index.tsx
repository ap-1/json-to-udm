"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubLogoIcon, TransformIcon } from "@radix-ui/react-icons";

import { Content } from "@/components/content";
import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { DisplaySwitcher } from "@/components/navbar/display-switcher";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<Content as="nav" className="flex flex-row justify-between h-24">
			<Link href="/" className="flex flex-row my-auto gap-x-4">
				<TransformIcon className="my-auto size-8" />
				<p className="hidden text-2xl font-bold sm:block">
					JSON to UDM
				</p>
			</Link>

			<div className="flex items-center gap-x-2">
				{pathname === "/" && <DisplaySwitcher />}
				<ThemeSwitcher />

				<Link
					href="https://github.com/ap-1/json-to-udm"
					target="_blank"
				>
					<Button variant="ghost" size="icon">
						<GitHubLogoIcon className="size-5" />
					</Button>
				</Link>
			</div>
		</Content>
	);
};
