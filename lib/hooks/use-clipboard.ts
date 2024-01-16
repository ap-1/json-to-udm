import { useState, useCallback } from "react";

export const useClipboard = () => {
	const [clipboard, setClipboard] = useState<string>(null!);

	const copyToClipboard = useCallback(
		(value: string) =>
			navigator.clipboard
				.writeText(value)
				.then(() => setClipboard(value)),
		[]
	);

	return [clipboard, copyToClipboard] as const;
};
