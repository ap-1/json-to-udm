import { useState } from "react";
import {
	ClipboardCopyIcon,
	TrashIcon,
	UploadIcon,
} from "@radix-ui/react-icons";

import { Modal } from "@/components/modal";
import { Confirmation } from "@/app/convert/confirmation";
import { Share } from "@/app/convert/share";
import { Load } from "@/app/convert/load";
import { Button } from "@/components/ui/button";

interface ModelsProps {
	content: string;
	setContent: (value: string) => void;
	deleteConverter: () => void;
}

export const Modals = ({ content, setContent, deleteConverter }: ModelsProps) => {
	const [shareOpen, setShareOpen] = useState(false);
	const [loadOpen, setLoadOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const deleteCallback = () => {
		deleteConverter();
		setDeleteOpen(false);
	};

	return (
		<div className="flex gap-1">
			<div className="rounded-md border overflow-hidden">
				<Modal
					open={shareOpen}
					setOpen={setShareOpen}
					title="Share content"
					description="Export JSON security responses."
					dialogItem={
						<Share
							showCancel
							content={content}
							onCancel={() => setShareOpen(false)}
						/>
					}
					drawerItem={
						<Share
							className="px-4"
							content={content}
							onCancel={() => setShareOpen(false)}
						/>
					}
				>
					<Button
						size="icon"
						variant="ghost"
						className="rounded-none h-[calc(2.25rem-2px)]"
					>
						<div className="size-5 flex items-center justify-center">
							<ClipboardCopyIcon className="size-4" />
						</div>
					</Button>
				</Modal>

				<Modal
					open={loadOpen}
					setOpen={setLoadOpen}
					title="Load content"
					description="Import JSON security responses."
					dialogItem={
						<Load
							showCancel
							content={content}
							setContent={setContent}
							onCancel={() => setLoadOpen(false)}
						/>
					}
					drawerItem={
						<Load
							className="px-2"
							content={content}
							setContent={setContent}
							onCancel={() => setLoadOpen(false)}
						/>
					}
				>
					<Button
						size="icon"
						variant="ghost"
						className="rounded-none h-[calc(2.25rem-2px)]"
					>
						<div className="size-5 flex items-center justify-center">
							<UploadIcon className="size-4" />
						</div>
					</Button>
				</Modal>
			</div>

			<Modal
				open={deleteOpen}
				setOpen={setDeleteOpen}
				title="Are you absolutely sure?"
				description="This action is irreversible. You will not be able to restore this converter."
				dialogItem={
					<Confirmation
						showCancel
						onCancel={() => setDeleteOpen(false)}
						onConfirm={deleteCallback}
					/>
				}
				drawerItem={
					<Confirmation
						className="px-4"
						onCancel={() => setDeleteOpen(false)}
						onConfirm={deleteCallback}
					/>
				}
			>
				<Button className="px-2 sm:px-4" variant="destructive">
					<TrashIcon className="size-5 mr-0 sm:mr-2" />
					<p className="hidden sm:block">Delete</p>
				</Button>
			</Modal>
		</div>
	);
};
