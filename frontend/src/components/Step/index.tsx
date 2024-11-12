import { Circle, StyledIngredient } from "./Step.styled";

interface Step {
	step:
		| {
				ingredient: string;
				quantity: number;
				unit: string;
		  }
		| string;
	index: number;
}

const Step = ({ step, index }: Step) => {
	let stepParagraph = "";

	if (typeof step !== "string") {
		const { ingredient: ingredientName, quantity, unit } = step;

		stepParagraph = `${quantity} ${unit} ${ingredientName}`;
	} else {
		stepParagraph = step;
	}

	return (
		<StyledIngredient>
			<Circle>{index}</Circle>
			<p>{stepParagraph}</p>
		</StyledIngredient>
	);
};

export default Step;
