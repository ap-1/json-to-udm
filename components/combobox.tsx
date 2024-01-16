"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { FileName, Files } from "@/app/convert/page";

interface ComboboxProps {
	value: FileName | null;
	setValue: Dispatch<SetStateAction<FileName | null>>;
	files: Files;
}

export const Combobox = ({ value, setValue, files }: ComboboxProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[170px] justify-between"
				>
					{value || "Select example..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Search examples..."
						className="h-9"
					/>
					<CommandEmpty>No example found.</CommandEmpty>

					<CommandGroup>
						{files.map((file) => (
							<CommandItem
								key={file}
								value={file}
								onSelect={(currentValue) => {
									setValue((value) =>
										currentValue === value
											? null
											: (currentValue as FileName)
									);
									setOpen(false);
								}}
							>
								{file}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										value === file
											? "opacity-100"
											: "opacity-0"
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
