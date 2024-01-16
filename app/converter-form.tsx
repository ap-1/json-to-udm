"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import generate from "boring-name-generator";

import { useRouter } from "next/navigation";
import { MagicWandIcon } from "@radix-ui/react-icons";
import type { ComponentProps, MouseEventHandler } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const schema = z.object({
	name: z.string().min(1),
});

type FormSchema = z.infer<typeof schema>;

export const ConverterForm = ({ className }: ComponentProps<"form">) => {
	const router = useRouter();

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: generate().dashed,
		},
	});

	const onSubmit = (values: FormSchema) => {
		router.push(`/convert?name=${values.name}`);
	};

	const onRefresh: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		form.setValue("name", generate().dashed);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("grid items-start gap-4", className)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>

							<FormControl>
								<div className="flex space-x-1">
									<Input {...field} />
									<Button
										variant="outline"
										size="icon"
										onClick={onRefresh}
									>
										<MagicWandIcon className="size-5" />
									</Button>
								</div>
							</FormControl>

							<FormDescription>
								This is how your converter will appear in the
								main menu.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Continue</Button>
			</form>
		</Form>
	);
};
