import { useRef, useEffect, type ForwardedRef } from "react";

// https://github.com/facebook/react/issues/24722
export const useClonedRef = <T>(ref: ForwardedRef<T>, initialValue = null) => {
	const targetRef = useRef<T>(initialValue);

	useEffect(() => {
		if (!ref) return;

		if (typeof ref === "function") {
			ref(targetRef.current);
		} else {
			ref.current = targetRef.current;
		}
	}, [ref]);

	return targetRef;
};
