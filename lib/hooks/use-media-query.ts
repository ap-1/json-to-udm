import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
	const subscribe = useCallback(
		(callback: (e: MediaQueryListEvent) => void) => {
			const matchMedia = window.matchMedia(query);
			matchMedia.addEventListener("change", callback);

			return () => matchMedia.removeEventListener("change", callback);
		},
		[query]
	);

	const getSnapshot = () => window.matchMedia(query).matches;
	const getServerSnapshot = () => false;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
