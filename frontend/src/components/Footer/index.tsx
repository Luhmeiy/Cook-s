import { useLocation } from "react-router-dom";
import { StyledFooter } from "./Footer.styled";

const Footer = () => {
	const location = useLocation();
	const is404 = location.pathname === "/404";

	return (
		<StyledFooter $is404={is404}>Made with 🧡 for home cooks.</StyledFooter>
	);
};

export default Footer;
