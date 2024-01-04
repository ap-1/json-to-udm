"use client";

import {
	forwardRef,
	type MouseEventHandler,
	type PropsWithChildren,
} from "react";

import { useClonedRef } from "@/lib/hooks/use-cloned-ref";
import { cn } from "@/lib/utils";

interface CardItemProps {
	className?: string;
	perspective: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CardItem = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardItemProps>
>(({ children, onClick, className, perspective }, ref) => {
	const clonedRef = useClonedRef<HTMLDivElement>(ref);

	const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
		if (!perspective) return;

		const card = clonedRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = -(e.clientY - rect.y - rect.height / 2) / 100;
		const y = (e.clientX - rect.x - rect.width / 2) / 100;

		const keyframes = {
			transform: `perspective(400px) rotateX(${x}deg) rotateY(${y}deg)`,
		};

		card.animate(keyframes, 250);
	};

	return (
		<div
			ref={clonedRef}
			onMouseMove={onMouseMove}
			onClick={onClick}
			className={cn(
				className,
				"dark:bg-inherit will-change-transform rounded-md cursor-pointer group",
				"before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),hsla(var(--foreground)/0.06),transparent_40%)]",
				"before:z-30 hover:before:opacity-100 before:select-none before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-500 before:rounded-[inherit] before:content-[''] before:h-full before:left-0 before:absolute before:top-0 before:w-full"
			)}
		>
			{children}
		</div>
	);
});
CardItem.displayName = "CardItem";
