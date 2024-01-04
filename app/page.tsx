"use client";

import { useAtomValue } from "jotai/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { PlusIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";

import { Content } from "@/components/content";
import { displayAtom } from "@/components/navbar/display-switcher";
import { useCards } from "@/lib/hooks/use-cards";
import { cn } from "@/lib/utils";
import { CardItem } from "@/components/card-item";

interface ItemProps {
	text: string;
	subtext?: string;
	Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

const GridItem = ({ text, subtext, Icon }: ItemProps) => {
	return (
		<button className="animate-in slide-in-from-left-2 relative flex items-end border rounded-md group bg-gradient-to-b from-background to-secondary/40 dark:from-secondary/40 from-50% dark:to-background h-80 w-full md:size-80">
			<Icon className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-20" />

			<div className="p-4 text-start">
				<p>{text}</p>
				{subtext && (
					<p className="text-sm text-muted-foreground">{subtext}</p>
				)}
			</div>
		</button>
	);
};

const ListItem = ({ text, subtext, Icon }: ItemProps) => {
	return (
		<button className="flex flex-col w-full p-4 transition-all bg-transparent border rounded-md sm:flex-row sm:justify-between animate-in slide-in-from-top-2 hover:bg-secondary/40 sm:h-14">
			<div className="flex gap-2">
				<Icon className="size-6" />
				<p className="font-semibold">{text}</p>
			</div>

			<p className="pl-8 my-auto text-sm sm:pl-0 text-start text-muted-foreground">
				{subtext}
			</p>
		</button>
	);
};

export default function Home() {
	const display = useAtomValue(displayAtom);
	const Item = display === "grid" ? GridItem : ListItem;

	const items = [
		{
			text: "Create a new converter",
			subtext: "Use AI to analyze a JSON response",
			Icon: PlusIcon,
		},
	];

	const [refs, onMouseMove] = useCards(items.length);

	return (
		<>
			<Content
				as="div"
				onMouseMove={onMouseMove}
				className={cn(
					"group/cards gap-4 py-8 grid grid-cols-1",
					display === "grid" &&
						"md:grid-cols-[repeat(auto-fill,20rem)]"
				)}
			>
				{items.map((item, i) => (
					<CardItem
						key={item.text}
						ref={refs.current[i]}
						perspective={display === "grid"}
					>
						<Item {...item} />
					</CardItem>
				))}
			</Content>
		</>
	);
}
