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
import { usePostIngredientMutation } from "@/features/lists/listsApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const NewIngredientForm = ({
	open,
	setOpen,
	listType,
}: {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	listType: string;
}) => {
	const userId = useSelector(selectCurrentUserId);
	const [postIngredient, { isError }] = usePostIngredientMutation();

	const [ingredient, setIngredient] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [unit, setUnit] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await postIngredient({
			id: userId,
			list: [{ ingredient, quantity, unit }],
			listType,
		});

		if (!error) {
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
					message="Failed to post ingredient."
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

					<Button>Save</Button>
				</StyledModalForm>
			</Modal>
		</>
	);
};

export default NewIngredientForm;
