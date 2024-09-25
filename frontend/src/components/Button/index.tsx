import { StyledButton } from "./Button.styled";
import { LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
	return <StyledButton to={to}>{children}</StyledButton>;
};

export default Button;
