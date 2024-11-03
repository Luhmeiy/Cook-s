import { FormEvent, useState } from "react";
import { CaretLeft, Plus } from "@phosphor-icons/react";
import {
	GoBackLink,
	InformationContainer,
	IngredientContainer,
	InputContainer,
	NewRecipeForm,
	PublicContainer,
} from "./NewRecipe.styled";
import Button from "@/components/Button";

const NewRecipe = () => {
	const [title, setTitle] = useState("");
	const [prepTime, setPrepTime] = useState("");
	const [servings, setServings] = useState(1);
	const [instructions, setInstructions] = useState("");
	const [description, setDescription] = useState("");
	const [selectedOption, setSelectedOption] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

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

					<IngredientContainer>
						<div>
							<InputContainer>
								Ingredient
								<input type="text" placeholder="Ex.: Apple" />
							</InputContainer>

							<InputContainer>
								Quantity
								<input type="number" min={1} />
							</InputContainer>

							<InputContainer>
								Quantity Type
								<input
									type="text"
									placeholder="Ex.: Apple Pie"
								/>
							</InputContainer>
						</div>

						<Button type="button" variant="gray">
							Add New Ingredient <Plus />
						</Button>
					</IngredientContainer>
				</div>

				<div>
					<Button>Save Recipe</Button>
				</div>
			</NewRecipeForm>
		</div>
	);
};

export default NewRecipe;
