// packages
import { Dispatch, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";

// styles
import {
	CloseButton,
	StyledNewIngredientForm,
} from "./NewIngredientForm.styled";
import { InputContainer } from "@/pages/NewRecipe/NewRecipe.styled";

// components / Redux
import Button from "../Button";
import { usePostIngredientMutation } from "@/features/lists/listsApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const NewIngredientForm = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
	const userId = useSelector(selectCurrentUserId);
	const [postIngredient] = usePostIngredientMutation();

	const [ingredient, setIngredient] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [unit, setUnit] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await postIngredient({
				id: userId,
				list: [{ ingredient, quantity, unit }],
				listType: "ingredient",
			});

			setIngredient("");
			setQuantity(0);
			setUnit("");

			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<StyledNewIngredientForm onSubmit={handleSubmit}>
				<CloseButton
					size={20}
					weight="bold"
					onClick={() => setOpen(false)}
				/>

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

				<Button type="submit">Save</Button>
			</StyledNewIngredientForm>
		</Modal>
	);
};

export default NewIngredientForm;
