// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Asterisk, PencilSimple, X } from "@phosphor-icons/react";

// styles
import { InputContainer } from "../RecipeForm/RecipeForm.styled";
import {
	IngredientForm,
	IngredientTitle,
	StyledIngredient,
} from "./Ingredient.styled";

// components / Redux
import Button from "../Button";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	useDeleteIngredientMutation,
	useUpdateIngredientMutation,
} from "@/features/lists/listsApiSlice";

interface IngredientProps {
	ingredientProps: {
		_id: string;
		ingredient: string;
		quantity: number;
		unit: string;
		bought?: boolean;
	};
}

const Ingredient = ({ ingredientProps }: IngredientProps) => {
	const location = useLocation();
	const userId = useSelector(selectCurrentUserId);

	const [deleteIngredient] = useDeleteIngredientMutation();
	const [updateIngredient] = useUpdateIngredientMutation();

	const [isEditing, setIsEditing] = useState(false);
	const [ingredient, setIngredient] = useState(ingredientProps);

	const handleCheckIngredient = async () => {
		const updatedBought = !ingredient.bought;
		setIngredient((prev) => ({ ...prev, bought: updatedBought }));

		try {
			await updateIngredient({
				userId,
				ingredient: ingredient._id,
				updatedIngredient: { ...ingredient, bought: updatedBought },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteIngredient = async () => {
		try {
			await deleteIngredient({ userId, ingredient: ingredient._id });
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
		<>
			{isEditing ? (
				<IngredientForm onSubmit={handleSubmit}>
					<InputContainer>
						Ingredient
						<input
							type="text"
							value={ingredient.ingredient}
							onChange={(e) =>
								setIngredient((prev) => ({
									...prev,
									ingredient: e.target.value,
								}))
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
								setIngredient((prev) => ({
									...prev,
									quantity: +e.target.value,
								}))
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
								setIngredient((prev) => ({
									...prev,
									unit: e.target.value,
								}))
							}
							placeholder="Ex.: Whole"
							required
						/>
					</InputContainer>

					<Button type="submit">Save</Button>

					<Button onClick={() => setIsEditing(false)}>Cancel</Button>
				</IngredientForm>
			) : (
				<StyledIngredient>
					<div>
						{location.pathname === "/shopping" ? (
							<input
								type="checkbox"
								checked={ingredient.bought}
								onChange={handleCheckIngredient}
							/>
						) : (
							<Asterisk weight="bold" />
						)}
						<IngredientTitle bought={ingredient.bought?.toString()}>
							{ingredient.quantity} {ingredient.unit}{" "}
							{ingredient.ingredient}
						</IngredientTitle>
					</div>

					<div>
						<PencilSimple
							size={20}
							onClick={() => setIsEditing(true)}
						/>

						<X size={20} onClick={handleDeleteIngredient} />
					</div>
				</StyledIngredient>
			)}
		</>
	);
};

export default Ingredient;
