import { useEffect, useState } from "react";
import {
	StyledFloatingMessage,
	StyledProgressBar,
} from "./FloatingMessage.styled";

interface MessageProps {
	message: string | null;
	type: "success" | "error";
}

const FloatingMessage = ({ message, type }: MessageProps) => {
	const [componentMessage, setComponentMessage] = useState(message);

	const duration = 5000;

	useEffect(() => {
		const timer = setTimeout(() => setComponentMessage(null), duration);
		return () => clearTimeout(timer);
	}, []);

	if (!componentMessage) return;

	return (
		<>
			{componentMessage && (
				<StyledFloatingMessage $type={type}>
					{componentMessage}
					<StyledProgressBar $type={type} $duration={duration} />
				</StyledFloatingMessage>
			)}
		</>
	);
};

export default FloatingMessage;
