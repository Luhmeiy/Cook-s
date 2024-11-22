import Button from "@/components/Button";
import { StyledNotFound } from "./NotFound.styled";

const NotFound = () => {
	return (
		<StyledNotFound>
			<h2>Page Not Found</h2>
			<Button to="/">Go Back</Button>
		</StyledNotFound>
	);
};

export default NotFound;
