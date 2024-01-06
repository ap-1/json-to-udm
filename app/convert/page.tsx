"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import Editor, { type OnMount } from "@monaco-editor/react";
import { type editor } from "monaco-editor";

import { Content } from "@/components/content";

export default function Convert() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const name = searchParams.get("name");

	if (!name) return router.push("/");

	const { resolvedTheme } = useTheme();
	const editorRef = useRef<editor.IStandaloneCodeEditor>(null!);

	const onMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
	};

	return (
		<Content
			as="main"
			className="py-8 h-[calc(100vh-6rem)] overflow-hidden"
		>
			<div className="w-1/2 h-[calc(100%-2rem)]">
				<Editor
					onMount={onMount}
					defaultLanguage="json"
					defaultValue="{}"
					className="border rounded-md overflow-hidden"
					theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
				/>
			</div>
		</Content>
	);
}
