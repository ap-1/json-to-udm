import { atomWithStorage } from "jotai/utils";

interface Storage {
	display: "grid" | "list";
	converters: Record<string, string>;
}

export const storageAtom = atomWithStorage<Storage>(
	"storage",
	{ display: "grid", converters: {} },
	undefined,
	{ getOnInit: true }
);
