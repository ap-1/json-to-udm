"use client";

import {
	useState,
	type PropsWithChildren,
	type MouseEventHandler,
} from "react";
import generate from "boring-name-generator";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";

const Form = ({ className }: React.ComponentProps<"form">) => {
	const [name, setName] = useState(generate().dashed);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const onRefresh: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		setName(generate().dashed);
	};

	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>

				<div className="flex space-x-1">
					<Input
						id="name"
						type="text"
						value={name}
						onChange={onChange}
					/>

					<Button size="icon" variant="ghost" onClick={onRefresh}>
						<ReloadIcon className="size-4" />
					</Button>
				</div>
			</div>

			<Button type="submit">Save changes</Button>
		</form>
	);
};

export const Modal = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="block sm:hidden">
				<Drawer open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>{children}</DialogTrigger>

					<DrawerContent
						className="block sm:hidden"
						overlay="fixed sm:hidden"
					>
						<DrawerHeader className="text-left">
							<DrawerTitle>Create converter</DrawerTitle>
							<DrawerDescription>
								Pick a name for your converter. Click save when
								you're done.
							</DrawerDescription>
						</DrawerHeader>

						<Form className="px-4" />

						<DrawerFooter className="pt-2">
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>

			<div className="hidden sm:block">
				<Dialog open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>{children}</DrawerTrigger>

					<DialogContent
						className="hidden sm:block sm:max-w-[425px]"
						overlay="sm:fixed"
					>
						<DialogHeader>
							<DialogTitle>Create converter</DialogTitle>
							<DialogDescription>
								Pick a name for your converter. Click save when
								you're done.
							</DialogDescription>
						</DialogHeader>

						<Form className="pt-4" />
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
