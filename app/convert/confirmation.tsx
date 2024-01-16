"use client";

import { useState, type MouseEventHandler } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmationProps {
	className?: string;
	showCancel?: boolean;
	onCancel: MouseEventHandler<HTMLButtonElement>;
	onConfirm: MouseEventHandler<HTMLButtonElement>;
}

export const Confirmation = ({
	className,
	showCancel,
	onCancel,
	onConfirm,
}: ConfirmationProps) => {
	const [submitting, setSubmitting] = useState(false);

	const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		setSubmitting(true);
		onConfirm(e);
	};

	return (
		<div
			className={cn(
				showCancel && "flex flex-row gap-2 justify-end",
				className
			)}
		>
			{showCancel && (
				<Button onClick={onCancel} variant="outline">
					Cancel
				</Button>
			)}

			<Button
				className={cn(!showCancel && "w-full")}
				onClick={onSubmit}
				variant="destructive"
				disabled={submitting}
			>
				{submitting ? (
					<ReloadIcon className="size-4 animate-spin" />
				) : (
					"Confirm"
				)}
			</Button>
		</div>
	);
};
