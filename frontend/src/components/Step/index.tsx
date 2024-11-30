import { Circle, StyledStep } from "./Step.styled";

interface Step {
	step:
		| {
				ingredient: string;
				quantity: number;
				unit: string;
		  }
		| string;
	index: number;
	isAvailable?: boolean;
}

const Step = ({ step, index, isAvailable }: Step) => {
	let stepParagraph = "";

	if (typeof step !== "string") {
		const { ingredient: ingredientName, quantity, unit } = step;

		stepParagraph = `${quantity} ${unit} ${ingredientName}`;
	} else {
		stepParagraph = step;
	}

	return (
		<StyledStep>
			<Circle $isAvailable={isAvailable}>{index}</Circle>
			<p>{stepParagraph}</p>
		</StyledStep>
	);
};

export default Step;
