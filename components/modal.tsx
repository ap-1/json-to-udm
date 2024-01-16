"use client";

import {
	useState,
	type PropsWithChildren,
	type Dispatch,
	type SetStateAction,
} from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
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

interface ModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	description: string;
	dialogItem: JSX.Element;
	drawerItem: JSX.Element;
}

export const Modal = ({
	open,
	setOpen,
	title,
	description,
	dialogItem,
	drawerItem,
	children,
}: PropsWithChildren<ModalProps>) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]" overlay="fixed">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					{dialogItem}
					{/* <DialogFooter>{dialogItem}</DialogFooter> */}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>

				{drawerItem}

				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
