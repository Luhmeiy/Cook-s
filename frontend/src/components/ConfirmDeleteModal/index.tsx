import { Dispatch, FormEvent, ReactNode } from "react";
import { Modal } from "@mui/material";
import { CloseButton, StyledModalForm } from "@/styles/Modal.styled";
import Button from "../Button";

const ConfirmDeleteModal = ({
	title,
	open,
	setOpen,
	deleteFunction,
	isLoadingDelete,
	children,
}: {
	title: string;
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	deleteFunction: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	isLoadingDelete: boolean;
	children?: ReactNode;
}) => {
	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<StyledModalForm onSubmit={deleteFunction}>
				<CloseButton weight="bold" onClick={() => setOpen(false)} />

				<h3>Are you sure you want to delete {title}?</h3>

				{children}

				<Button $variant="red" disabled={isLoadingDelete}>
					Delete {title}
				</Button>
			</StyledModalForm>
		</Modal>
	);
};

export default ConfirmDeleteModal;
