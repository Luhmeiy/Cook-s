// packages
import { Dispatch, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";

// styles
import { InputContainer } from "@/styles/Form.styled";
import { CloseButton, StyledModalForm } from "@/styles/Modal.styled";

// components / Redux
import Button from "../Button";
import FloatingMessage from "../FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { IngredientType } from "@/interfaces/IngredientType";
import {
	usePostIngredientMutation,
	useUpdateIngredientMutation,
} from "@/features/lists/listsApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const NewIngredientForm = ({
	open,
	setOpen,
	listType,
	ingredientToEdit,
}: {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	listType?: string;
	ingredientToEdit?: IngredientType;
}) => {
	const userId = useSelector(selectCurrentUserId);

	const [
		postIngredient,
		{ error: postError, isError: isPostError, isLoading },
	] = usePostIngredientMutation();
	const [updateIngredient, { error: updateError, isError: isUpdateError }] =
		useUpdateIngredientMutation();

	const isError = isPostError || isUpdateError;
	const error = postError || updateError;

	const [ingredient, setIngredient] = useState(
		ingredientToEdit?.ingredient || ""
	);
	const [quantity, setQuantity] = useState(ingredientToEdit?.quantity || 0);
	const [unit, setUnit] = useState(ingredientToEdit?.unit || "");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newIngredient = { ingredient, quantity, unit };
		let submitError: ErrorType;

		if (ingredientToEdit) {
			const { error } = await updateIngredient({
				userId,
				ingredient: ingredientToEdit._id,
				updatedIngredient: newIngredient,
			});

			submitError = error as ErrorType;
		} else {
			const { error } = await postIngredient({
				id: userId,
				list: [newIngredient],
				listType,
			});

			submitError = error as ErrorType;
		}

		if (!submitError) {
			setIngredient("");
			setQuantity(0);
			setUnit("");

			setOpen(false);
		}
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

			<Modal open={open} onClose={() => setOpen(false)}>
				<StyledModalForm onSubmit={handleSubmit}>
					<CloseButton weight="bold" onClick={() => setOpen(false)} />

					<h3>Add New Ingredient</h3>

					<div>
						<InputContainer>
							Ingredient
							<input
								type="text"
								value={ingredient}
								onChange={(e) => setIngredient(e.target.value)}
								placeholder="Ex.: Apple"
								required
							/>
						</InputContainer>

						<InputContainer>
							Quantity
							<input
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(+e.target.value)}
								min={1}
								required
							/>
						</InputContainer>

						<InputContainer>
							Unit
							<input
								type="text"
								value={unit}
								onChange={(e) => setUnit(e.target.value)}
								placeholder="Ex.: Whole"
								required
							/>
						</InputContainer>
					</div>

					<Button disabled={isLoading}>Save</Button>
				</StyledModalForm>
			</Modal>
		</>
	);
};

export default NewIngredientForm;
