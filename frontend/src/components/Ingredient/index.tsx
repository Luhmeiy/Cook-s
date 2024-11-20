import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Asterisk, PencilSimple, X } from "@phosphor-icons/react";
import { InputContainer } from "../RecipeForm/RecipeForm.styled";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	useDeleteIngredientMutation,
	useUpdateIngredientMutation,
} from "@/features/lists/listsApiSlice";
import Button from "../Button";

interface IngredientProps {
	ingredientProps: {
		_id: string;
		ingredient: string;
		quantity: number;
		unit: string;
	};
}

const Ingredient = ({ ingredientProps }: IngredientProps) => {
	const userId = useSelector(selectCurrentUserId);

	const [deleteIngredient] = useDeleteIngredientMutation();
	const [updateIngredient] = useUpdateIngredientMutation();

	const [isEditing, setIsEditing] = useState(false);
	const [ingredient, setIngredient] = useState(ingredientProps);

	const handleDeleteIngredient = async (id: string) => {
		try {
			await deleteIngredient({ userId, ingredient: id });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await updateIngredient({
				userId,
				ingredient: ingredient._id,
				updatedIngredient: ingredient,
			});

			setIsEditing(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isEditing ? (
				<form onSubmit={handleSubmit}>
					<InputContainer>
						Ingredient
						<input
							type="text"
							value={ingredient.ingredient}
							onChange={(e) =>
								setIngredient({
									...ingredient,
									["ingredient"]: e.target.value,
								})
							}
							placeholder="Ex.: Apple"
							required
						/>
					</InputContainer>

					<InputContainer>
						Quantity
						<input
							type="number"
							value={ingredient.quantity}
							onChange={(e) =>
								setIngredient({
									...ingredient,
									["quantity"]: +e.target.value,
								})
							}
							min={1}
							required
						/>
					</InputContainer>

					<InputContainer>
						Unit
						<input
							type="text"
							value={ingredient.unit}
							onChange={(e) =>
								setIngredient({
									...ingredient,
									["unit"]: e.target.value,
								})
							}
							placeholder="Ex.: Whole"
							required
						/>
					</InputContainer>

					<Button type="submit">Save</Button>

					<Button onClick={() => setIsEditing(false)}>Cancel</Button>
				</form>
			) : (
				<>
					<div>
						<Asterisk weight="bold" />
						{ingredient.quantity} {ingredient.unit}{" "}
						{ingredient.ingredient}
					</div>

					<div>
						<PencilSimple
							size={20}
							onClick={() => setIsEditing(true)}
						/>

						<X
							size={20}
							onClick={() =>
								handleDeleteIngredient(ingredient._id)
							}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Ingredient;
