import HomeHeroImage from "../../assets/HomeHeroImage";
import Button from "../Button";
import { CallToAction, StyledHero } from "./Hero.styled";

const Hero = () => {
	return (
		<StyledHero>
			<CallToAction>
				<div>
					<p>Organize, Share, Cook</p>
					<h2>Your Personal Recipe Box!</h2>
				</div>
				<p>
					Effortlessly manage your recipes, ingredients and shopping
					list.
				</p>

				<Button to="/login">Get Started</Button>
			</CallToAction>

			<HomeHeroImage />
		</StyledHero>
	);
};

export default Hero;
