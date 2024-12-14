import { useNavigate, useParams } from "react-router-dom";
import FloatingMessage from "@/components/FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { useConfirmEmailMutation } from "@/features/auth/authApiSlice";

const ConfirmEmail = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	const [confirmEmail, { error, isError, isLoading }] =
		useConfirmEmailMutation();

	const handleConfirmEmail = async () => {
		const { error } = await confirmEmail({ token });

		if (!error) {
			navigate("/auth/login?isConfirmed=true");
		}
	};

	if (!isLoading) {
		handleConfirmEmail();
	}

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}
		</>
	);
};

export default ConfirmEmail;
