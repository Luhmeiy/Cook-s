// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Asterisk, PencilSimple, Plus, X } from "@phosphor-icons/react";

// styles
import { IngredientTitle, StyledIngredient } from "./Ingredient.styled";

// components / types / Redux
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import FloatingMessage from "../FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { IngredientTypeWithId } from "@/interfaces/IngredientType";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	useDeleteIngredientMutation,
	useUpdateIngredientMutation,
} from "@/features/lists/listsApiSlice";
import NewIngredientForm from "../NewIngredientForm";

interface IngredientProps {
	ingredientProps: {
		_id: string;
		ingredient: string;
		quantity: number;
		unit: string;
		bought?: boolean;
	};
	handleAddIngredients: (ingredient?: IngredientTypeWithId) => Promise<void>;
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

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

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

					<NewIngredientForm
						open={isEditing}
						setOpen={setIsEditing}
						ingredientToEdit={ingredient}
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
		</>
	);
};

export default Ingredient;
