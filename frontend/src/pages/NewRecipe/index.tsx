// packages
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CaretLeft, Plus } from "@phosphor-icons/react";

// styles
import {
	GoBackLink,
	InformationContainer,
	IngredientsContainer,
	IngredientsForm,
	InputContainer,
	NewRecipeForm,
	PublicContainer,
} from "./NewRecipe.styled";

// components / Redux
import Button from "@/components/Button";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";

const defaultIngredient = {
	ingredient: "",
	quantity: 1,
	unit: "",
};

const NewRecipe = () => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [title, setTitle] = useState("");
	const [prepTime, setPrepTime] = useState("");
	const [servings, setServings] = useState(1);
	const [instructions, setInstructions] = useState("");
	const [description, setDescription] = useState("");
	const [selectedOption, setSelectedOption] = useState(false);
	const [ingredients, setIngredients] = useState([defaultIngredient]);

	const addNewIngredient = () => {
		setIngredients([...ingredients, defaultIngredient]);
	};

	const updateIngredients = (
		field: string,
		index: number,
		value: string | number
	) => {
		const updatedIngredients = ingredients.map((ingredient, i) =>
			i === index ? { ...ingredient, [field]: value } : ingredient
		);

		setIngredients(updatedIngredients);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}
	}, [isLoading, user, navigate]);

	return (
		<div>
			<GoBackLink to="/">
				<CaretLeft /> Go back
			</GoBackLink>

			<NewRecipeForm onSubmit={handleSubmit}>
				<div>
					<h2>Recipe Information</h2>

					<InformationContainer>
						<InputContainer>
							Title
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Ex.: Apple Pie"
							/>
						</InputContainer>

						<InputContainer>
							Preparation Time
							<input
								type="text"
								value={prepTime}
								onChange={(e) => setPrepTime(e.target.value)}
								placeholder="Ex.: 2 hours"
							/>
						</InputContainer>

						<InputContainer>
							<div>
								Servings <span>(Optional)</span>
							</div>
							<input
								type="number"
								min={1}
								value={servings}
								onChange={(e) => setServings(+e.target.value)}
							/>
						</InputContainer>
					</InformationContainer>

					<InformationContainer>
						<InputContainer>
							Instructions
							<textarea
								value={instructions}
								onChange={(e) =>
									setInstructions(e.target.value)
								}
								placeholder={`Ex.:\nPrepare the apple pie.\nEat the apple pie.`}
							/>
						</InputContainer>

						<InputContainer>
							<div>
								Description <span>(Optional)</span>
							</div>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Ex.: Delicious pie."
							/>
						</InputContainer>
					</InformationContainer>
				</div>

				<div>
					<b>Do you want this recipe to be public?</b>

					<PublicContainer>
						<label>
							<input
								type="radio"
								name="option"
								value="true"
								checked={selectedOption === true}
								onChange={() => setSelectedOption(true)}
							/>
							Yes
						</label>

						<label>
							<input
								type="radio"
								name="option"
								value="false"
								checked={selectedOption === false}
								onChange={() => setSelectedOption(false)}
							/>
							No
						</label>
					</PublicContainer>
				</div>

				<div>
					<h2>Ingredients</h2>

					<IngredientsForm>
						<IngredientsContainer>
							{ingredients.map((ingredient, index) => (
								<div key={index}>
									<InputContainer>
										Ingredient
										<input
											type="text"
											value={ingredient.ingredient}
											onChange={(e) =>
												updateIngredients(
													"ingredient",
													index,
													e.target.value
												)
											}
											placeholder="Ex.: Apple"
										/>
									</InputContainer>

									<InputContainer>
										Quantity
										<input
											type="number"
											value={ingredient.quantity}
											onChange={(e) =>
												updateIngredients(
													"quantity",
													index,
													e.target.value
												)
											}
											min={1}
										/>
									</InputContainer>

									<InputContainer>
										Quantity Type
										<input
											type="text"
											value={ingredient.unit}
											onChange={(e) =>
												updateIngredients(
													"unit",
													index,
													e.target.value
												)
											}
											placeholder="Ex.: Apple Pie"
										/>
									</InputContainer>
								</div>
							))}
						</IngredientsContainer>

						<Button
							type="button"
							variant="gray"
							onClick={addNewIngredient}
						>
							Add New Ingredient <Plus />
						</Button>
					</IngredientsForm>
				</div>

				<div>
					<Button>Save Recipe</Button>
				</div>
			</NewRecipeForm>
		</div>
	);
};

export default NewRecipe;
