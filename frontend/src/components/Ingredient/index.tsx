// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Asterisk, PencilSimple, Plus, X } from "@phosphor-icons/react";

// styles
import { InputContainer } from "@/styles/Form.styled";
import {
	IngredientForm,
	IngredientTitle,
	StyledIngredient,
} from "./Ingredient.styled";

// components / types / Redux
import Button from "../Button";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import FloatingMessage from "../FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { IngredientType } from "@/interfaces/IngredientType";
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
	handleAddIngredients: (ingredient?: IngredientType) => Promise<void>;
}

const Ingredient = ({
	ingredientProps,
	handleAddIngredients,
}: IngredientProps) => {
	const location = useLocation();

	const userId = useSelector(selectCurrentUserId);

	const [
		deleteIngredient,
		{
			error: deleteError,
			isError: isDeleteError,
			isLoading: isLoadingDelete,
		},
	] = useDeleteIngredientMutation();
	const [updateIngredient, { error: updateError, isError: isUpdateError }] =
		useUpdateIngredientMutation();

	const isError = isDeleteError || isUpdateError;
	const error = deleteError || updateError;

	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [ingredient, setIngredient] = useState(ingredientProps);

	const handleCheckIngredient = async () => {
		const updatedBought = !ingredient.bought;

		const { error } = await updateIngredient({
			userId,
			ingredient: ingredient._id,
			updatedIngredient: { ...ingredient, bought: updatedBought },
		});

		if (!error) {
			setIngredient((prev) => ({ ...prev, bought: updatedBought }));
		}
	};

	const handleDeleteIngredient = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await deleteIngredient({ userId, ingredient: ingredient._id });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await updateIngredient({
			userId,
			ingredient: ingredient._id,
			updatedIngredient: ingredient,
		});

		if (!error) setIsEditing(false);
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

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
						<IngredientTitle $bought={ingredient.bought}>
							{ingredient.quantity} {ingredient.unit}{" "}
							{ingredient.ingredient}
						</IngredientTitle>
					</div>

					<div>
						<PencilSimple
							size={20}
							onClick={() => setIsEditing(true)}
						/>

						<X size={20} onClick={() => setOpen(true)} />

						<ConfirmDeleteModal
							title={ingredient.ingredient}
							open={open}
							setOpen={setOpen}
							deleteFunction={handleDeleteIngredient}
							isLoadingDelete={isLoadingDelete}
						/>

						{location.pathname === "/ingredients" && (
							<Plus
								size={20}
								onClick={() => handleAddIngredients(ingredient)}
							/>
						)}
					</div>
				</StyledIngredient>
			)}
		</>
	);
};

export default Ingredient;
