import { useState, type MouseEventHandler, ChangeEventHandler } from "react";

import { toast } from "sonner";
import { gunzipSync } from "zlib";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface LoadProps {
	content: string;
	setContent: (value: string) => void;
	className?: string;
	showCancel?: boolean;
	onCancel: MouseEventHandler<HTMLButtonElement>;
}

export const Load = ({
	content,
	setContent,
	className,
	showCancel,
	onCancel,
}: LoadProps) => {
	const [value, setValue] = useState("");

	const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		const data = Buffer.from(value, "base64");
		const buffer = gunzipSync(data);

		setContent(buffer.toString());
		toast("Content has been loaded", {
			action: {
				label: "Undo",
				onClick: () => setContent(content),
			},
		});

		onCancel(e);
	};

	return (
		<div className={cn("flex flex-col space-y-4 items-center", className)}>
			<div className={cn("w-full space-y-1.5", !showCancel && "px-2")}>
				<Label htmlFor="content">Content</Label>
				<Textarea
					value={value}
					onChange={onChange}
					placeholder="Enter your content here."
					id="content"
				/>

				<p className="text-sm text-muted-foreground">
					This should be a Base64-encoded string.
				</p>
			</div>

			<div
				className={cn(
					"w-full",
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
					type="submit"
					className={cn(!showCancel && "w-full")}
					onClick={onSubmit}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
};
