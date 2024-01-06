"use client";

import { useState, type PropsWithChildren } from "react";

import { ConverterForm } from "@/components/modal/form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export const Modal = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]" overlay="fixed">
					<DialogHeader>
						<DialogTitle>Create converter</DialogTitle>
						<DialogDescription>
							Pick a name for your converter. Click continue when
							you're finished.
						</DialogDescription>
					</DialogHeader>

					<ConverterForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Create converter</DrawerTitle>
					<DrawerDescription>
						Pick a name for your converter. Click continue when
						you're finished.
					</DrawerDescription>
				</DrawerHeader>

				<ConverterForm className="px-4" />

				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
