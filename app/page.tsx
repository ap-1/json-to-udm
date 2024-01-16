"use client";

import { useAtomValue } from "jotai/react";
import { useRouter } from "next/navigation";
import {
	useState,
	forwardRef,
	type ElementRef,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from "react";

import { PlusIcon, TransformIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";

import { Modal } from "@/components/modal";
import { CardItem } from "@/components/card-item";
import { Content } from "@/components/content";
import { ConverterForm } from "@/app/converter-form";

import { storageAtom } from "@/lib/local-storage";
import { useCards } from "@/lib/hooks/use-cards";
import { cn } from "@/lib/utils";

interface ItemProps {
	text: string;
	subtext?: string;
	Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

const GridItem = forwardRef<
	ElementRef<"button">,
	React.ComponentPropsWithoutRef<"button"> & ItemProps
>(({ text, subtext, className, Icon, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			"will-change-transform animate-in slide-in-from-left-2 relative flex items-end border rounded-md group bg-gradient-to-b from-background to-secondary/40 dark:from-secondary/40 from-50% dark:to-background h-80 w-full md:size-80",
			className
		)}
		{...props}
	>
		<Icon className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-20" />

		<div className="p-4 text-start">
			<p>{text}</p>
			{subtext && (
				<p className="text-sm text-muted-foreground">{subtext}</p>
			)}
		</div>
	</button>
));
GridItem.displayName = "GridItem";

const ListItem = forwardRef<
	ElementRef<"button">,
	React.ComponentPropsWithoutRef<"button"> & ItemProps
>(({ text, subtext, className, Icon, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			"transition-all flex flex-col w-full p-4 bg-transparent border rounded-md sm:flex-row sm:justify-between animate-in slide-in-from-top-2 hover:bg-secondary/40 sm:h-14",
			className
		)}
		{...props}
	>
		<div className="flex gap-2">
			<Icon className="size-6" />
			<p className="font-semibold">{text}</p>
		</div>

		<p className="pl-8 my-auto text-sm sm:pl-0 text-start text-muted-foreground">
			{subtext}
		</p>
	</button>
));
ListItem.displayName = "ListItem";

export default function Home() {
	const router = useRouter();

	const { display, converters } = useAtomValue(storageAtom);
	const Item = display === "grid" ? GridItem : ListItem;

	const list = Object.entries(converters)
		.filter(([_key, value]) => value && value !== "{}")
		.map(([key, value]) => ({
			text: key,
			subtext: value.length > 120 ? value.slice(0, 120) + "..." : value,
			Icon: TransformIcon,
		}));

	const items = [
		{
			text: "Create a new converter",
			subtext: "Use AI to analyze a JSON response",
			Icon: PlusIcon,
		},
		...list,
	];

	const [open, setOpen] = useState(false);
	const [refs, onMouseMove] = useCards(items.length);

	return (
		<Content
			as="div"
			onMouseMove={onMouseMove}
			className={cn(
				"group/cards gap-4 py-8 grid grid-cols-1",
				display === "grid" && "md:grid-cols-[repeat(auto-fill,20rem)]"
			)}
		>
			<Modal
				open={open}
				setOpen={setOpen}
				title="Create converter"
				description="Pick a name for your converter. Click continue when you're finished."
				dialogItem={<ConverterForm />}
				drawerItem={<ConverterForm className="px-4" />}
			>
				<CardItem
					ref={refs.current[0]}
					perspective={display === "grid"}
				>
					<Item {...items[0]} />
				</CardItem>
			</Modal>

			{items.slice(1).map((item, i) => (
				<CardItem
					ref={refs.current[i + 1]}
					perspective={display === "grid"}
					onClick={() => router.push(`/convert?name=${item.text}`)}
				>
					<Item {...item} />
				</CardItem>
			))}
		</Content>
	);
}
