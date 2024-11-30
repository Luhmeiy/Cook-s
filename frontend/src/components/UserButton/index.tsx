import { useNavigate } from "react-router-dom";
import { StyledUserButton } from "./UserButton.styled";

interface UserButtonProps {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	to?: string;
}

const UserButton = ({ children, onClick, to, ...props }: UserButtonProps) => {
	const navigate = useNavigate();

	return (
		<StyledUserButton
			onClick={to ? () => navigate(to) : onClick}
			{...props}
		>
			{children}
		</StyledUserButton>
	);
};

export default UserButton;
