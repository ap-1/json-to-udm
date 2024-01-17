import { useTheme } from "next-themes";
import { useState, type ChangeEventHandler } from "react";
import { MagicWandIcon, ReloadIcon } from "@radix-ui/react-icons";

import Editor from "@monaco-editor/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const baseOutput = {
	_: "LLM output will appear here.",
	_2: "To start generating, press Analyze.",
};

interface AnalyzeProps {
	content: string;
}

export const Analyze = ({ content }: AnalyzeProps) => {
	const { resolvedTheme } = useTheme();

	const [value, setValue] = useState<string>(null!);
	const [generating, setGenerating] = useState(false);
	const [instructions, setInstructions] = useState("");

	const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		e.preventDefault();
		setInstructions(e.target.value);
	};

	const onSubmit = async () => {
		setGenerating(true);
		const controller = new AbortController();

		toast("Started generating...", {
			description: "This may take a moment.",
			action: {
				label: "Cancel",
				onClick: () => controller.abort("cancelled"),
			},
		});

		const result: string = await new Promise((resolve, reject) => {
			const listener = () => {
				controller.signal.removeEventListener("abort", listener);

				reject();
				setGenerating(false);
			};

			controller.signal.addEventListener("abort", listener);

			fetch("/api/query", {
				method: "POST",
				body: JSON.stringify({ instructions, content }),
			})
				.then((res) => res.json())
				.then((data) => {
					toast(
						data.message === "success"
							? "Success"
							: "An error has occured",
						{
							description:
								data.message === "success"
									? "Analysis has completed."
									: "Please try again later.",
						}
					);

					resolve(data.content);
				})
				.catch((e) => {
					toast("An error has occured", {
						description: "Please try again later.",
					});

					alert(JSON.stringify(e));

					reject(JSON.stringify(e, null, 4));
				})
				.finally(() => setGenerating(false));
		});

		setValue(result);
	};

	return (
		<div className="w-full lg:w-1/2 h-[calc(100%-2rem)] space-y-2 flex flex-col pb-8 lg:pb-0">
			<div className="flex flex-row justify-end">
				<Button type="submit" disabled={generating} onClick={onSubmit}>
					{generating ? (
						<>
							<ReloadIcon className="size-4 animate-spin mr-2" />
							Please wait...
						</>
					) : (
						<>
							<MagicWandIcon className="size-4 mr-2" />
							Analyze
						</>
					)}
				</Button>
			</div>

			<div className="h-full flex flex-col">
				<div className="mb-8">
					<Label htmlFor="instructions">Instructions</Label>
					<Textarea
						value={instructions}
						onChange={onChange}
						className="mb-1.5"
						placeholder="Enter any additional instructions or documentation here."
						id="instructions"
					/>

					<p className="text-sm text-muted-foreground">
						This will be added to the LLM's initial context window.
					</p>
				</div>

				<Label>Output</Label>
				<Editor
					defaultLanguage="json"
					options={{ readOnly: true }}
					value={value ?? JSON.stringify(baseOutput, null, 4)}
					className="border rounded-md overflow-hidden mb-1.5 mt-1"
					theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
				/>

				<p className="text-sm text-muted-foreground">
					Changes to JSON are saved automatically, but you will have
					to re-analyze to see those changes reflected.
				</p>
			</div>
		</div>
	);
};
