import Link from "next/link";
import { TransformIcon } from "@radix-ui/react-icons";

import { Content } from "@/components/content";
import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { DisplaySwitcher } from "@/components/navbar/display-switcher";

export const Navbar = () => {
	return (
		<Content as="nav" className="flex flex-row justify-between h-24">
			<Link href="/" className="flex flex-row my-auto gap-x-4">
				<TransformIcon className="my-auto size-8" />
				<p className="hidden text-2xl font-bold sm:block">
					JSON to UDM
				</p>
			</Link>

			<div className="flex items-center gap-x-2">
				<DisplaySwitcher />
				<ThemeSwitcher />
			</div>
		</Content>
	);
};
