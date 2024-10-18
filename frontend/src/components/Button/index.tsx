import { useNavigate } from "react-router-dom";
import { StyledButton } from "./Button.styled";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	to?: string;
	[key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, to, ...props }) => {
	const navigate = useNavigate();

	return (
		<StyledButton onClick={to ? () => navigate(to) : onClick} {...props}>
			{children}
		</StyledButton>
	);
};

export default Button;
