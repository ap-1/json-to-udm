import { useAtom } from "jotai/react";
import { storageAtom } from "@/lib/local-storage";

import { GridIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const DisplaySwitcher = () => {
	const [storage, setStorage] = useAtom(storageAtom);

	const setDisplay = (value: "grid" | "list" | "") => {
		if (value === "") return;

		setStorage((storage) => ({
			...storage,
			display: value,
		}));
	};

	return (
		<ToggleGroup
			type="single"
			size="sm"
			value={storage.display}
			onValueChange={setDisplay}
			className="p-[0.125rem] rounded-md bg-accent"
		>
			<ToggleGroupItem
				value="grid"
				aria-label="Use grid display"
				className="rounded-sm px-2 sm:px-4 hover:text-inherit data-[state=on]:bg-primary data-[state=on]:text-primary-foreground gap-x-2"
			>
				<GridIcon className="size-4" />
				<p className="hidden text-sm sm:block">Grid</p>
			</ToggleGroupItem>

			<ToggleGroupItem
				value="list"
				aria-label="Use list display"
				className="rounded-sm px-2 sm:px-4 hover:text-inherit data-[state=on]:bg-primary data-[state=on]:text-primary-foreground gap-x-2"
			>
				<HamburgerMenuIcon className="size-4" />
				<p className="hidden text-sm sm:block">List</p>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
