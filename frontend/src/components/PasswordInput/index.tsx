import { Dispatch, useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const PasswordInput = ({
	password,
	setPassword,
}: {
	password: string;
	setPassword: Dispatch<React.SetStateAction<string>>;
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<input
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				required
			/>

			{showPassword ? (
				<EyeClosed
					color="#6C6C6C"
					size={20}
					weight="light"
					onClick={togglePassword}
				/>
			) : (
				<Eye
					color="#6C6C6C"
					size={20}
					weight="light"
					onClick={togglePassword}
				/>
			)}
		</div>
	);
};

export default PasswordInput;
