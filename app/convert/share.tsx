import { useMemo, type MouseEventHandler } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { toast } from "sonner";
import { gzipSync } from "zlib";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useClipboard } from "@/lib/hooks/use-clipboard";

interface ShareProps {
	content: string;
	className?: string;
	showCancel?: boolean;
	onCancel: MouseEventHandler<HTMLButtonElement>;
}

export const Share = ({
	content,
	className,
	showCancel,
	onCancel,
}: ShareProps) => {
	const [currentlyCopied, copy] = useClipboard();
	const hasCopied = Boolean(currentlyCopied);

	const Icon = hasCopied ? CheckIcon : CopyIcon;

	const compressed = useMemo(() => {
		const data = Buffer.from(content, "utf-8");
		const buffer = gzipSync(data);

		return buffer.toString("base64");
	}, [content]);

	const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		copy(compressed).then(() => {
			toast("Content has been copied", {
				description: "Only share this with people you trust.",
				action: {
					label: "Clear",
					onClick: () => copy(""),
				},
			});

			onCancel(e);
		});
	};

	return (
		<div
			className={cn(
				"flex items-center",
				showCancel && "flex-col space-y-2",
				className
			)}
		>
			<div className="flex w-full space-x-2">
				<div className="grid flex-1 gap-2">
					<Label htmlFor="content" className="sr-only">
						Content
					</Label>
					<Input id="content" value={compressed} readOnly />
				</div>

				<Button size="icon" disabled={hasCopied} onClick={onSubmit}>
					<span className="sr-only">
						{hasCopied ? "Copied" : "Copy"}
					</span>
					<Icon className="size-4" />
				</Button>
			</div>

			{showCancel && (
				<Button variant="outline" onClick={onCancel} className="w-full">
					Cancel
				</Button>
			)}
		</div>
	);
};
