"use client";

import { useAtom } from "jotai/react";
import { storageAtom } from "@/lib/local-storage";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { EraserIcon, MagicWandIcon } from "@radix-ui/react-icons";

import Editor from "@monaco-editor/react";
import { toast } from "sonner";

import { Content } from "@/components/content";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Modals } from "@/app/convert/modals";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const files = [
	"threat_1.json",
	"threat_2.json",
	"threat_3.json",
	"threat_4.json",
	"threat_5.json",
] as const;

export type Files = typeof files;
export type FileName = Files[number];

export default function Convert() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const name = searchParams.get("name");

	if (!name) return router.push("/");

	const { resolvedTheme } = useTheme();
	const [storage, setStorage] = useAtom(storageAtom);

	const [fileName, setFileName] = useState<FileName | null>(null);
	const [content, setRawContent] = useState(storage.converters[name] ?? "{}");

	if (!storage.converters.hasOwnProperty(name)) {
		setStorage((storage) => ({
			...storage,
			converters: { ...storage.converters, [name]: "{}" },
		}));
	}

	const setContent = (value: string) => {
		setRawContent(value);
		setStorage((storage) => ({
			...storage,
			converters: { ...storage.converters, [name]: value },
		}));
	};

	const resetContent = () => {
		setFileName(null);
		setContent("{}");

		toast("Content has been cleared", {
			action: {
				label: "Undo",
				onClick: () => {
					setFileName(fileName);
					setContent(storage.converters[name]);
				},
			},
		});
	};

	const deleteConverter = () => {
		setFileName(null);
		setStorage((storage) => ({
			...storage,
			converters: Object.fromEntries(
				Object.entries(storage.converters).filter(
					([key]) => key !== name
				)
			),
		}));

		toast("Deleted converter", {
			description: "If you were not redirected, click here.",
			action: {
				label: "Go home",
				onClick: () => router.push("/"),
			},
		});

		router.push("/");
	};

	useEffect(() => {
		if (!fileName) return;

		fetch(`/responses/${fileName}`, { cache: "no-store" })
			.then((response) => response.json())
			.then((json) => setContent(JSON.stringify(json, null, 4)));
	}, [fileName]);

	return (
		<Content
			as="main"
			className="flex flex-col gap-8 lg:gap-y-0 lg:flex-row py-8 h-[calc(100vh-6rem)]"
		>
			<div className="w-full lg:w-1/2 h-[calc(100%-2rem)] space-y-2 flex flex-col">
				<div className="flex justify-between">
					<div className="flex space-x-1">
						<Combobox
							value={fileName}
							setValue={setFileName}
							files={files}
						/>

						<Button
							variant="outline"
							size="icon"
							onClick={resetContent}
						>
							<EraserIcon className="size-5" />
						</Button>
					</div>

					<Modals
						content={content}
						setContent={setContent}
						deleteConverter={deleteConverter}
					/>
				</div>

				<Editor
					onChange={(value) => setContent(value ?? "{}")}
					defaultLanguage="json"
					value={content}
					className="border rounded-md overflow-hidden"
					theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
				/>
			</div>

			<div className="w-full lg:w-1/2 h-[calc(100%-2rem)] space-y-2 flex flex-col pb-8">
				<div className="flex flex-row justify-end">
					<Button>
						<MagicWandIcon className="size-4 mr-2" />
						Analyze
					</Button>
				</div>

				<div className="w-full space-y-1.5">
					<Label htmlFor="instructions">Instructions</Label>
					<Textarea
						placeholder="Enter any additional instructions here."
						id="instructions"
					/>

					<p className="text-sm text-muted-foreground">
						This will be added to the LLM's initial context window.
					</p>
				</div>
			</div>
		</Content>
	);
}
