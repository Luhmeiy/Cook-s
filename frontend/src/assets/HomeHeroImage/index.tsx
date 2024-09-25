import { StyledHomeHeroImage } from "./HomeHeroImage.styled";

const HomeHeroImage = () => {
	return (
		<StyledHomeHeroImage>
			<svg
				viewBox="0 0 600 400"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<path
					d="M169.96 94.4281C253.437 85.9381 280.248 76.9796 338.115 38.2385C424.04 -19.2719 552.227 -19.5324 588.883 90.4753C617.069 175.084 589.892 280.057 527.34 328.185C422.008 409.234 227.066 423.725 106.063 361.198C1.74371 307.301 -31.7784 203.61 33.2681 136.035C55.3295 113.116 90.0064 102.558 169.96 94.4281Z"
					fill="url(#pattern0_11_110)"
				/>
				<defs>
					<pattern
						id="pattern0_11_110"
						patternContentUnits="objectBoundingBox"
						width="1"
						height="1"
					>
						<use
							xlinkHref="#image0_11_110"
							transform="scale(0.000828157 0.00124224)"
						/>
					</pattern>
					<image
						id="image0_11_110"
						width="1208"
						height="805"
						href="https://images.unsplash.com/photo-1653233797467-1a528819fd4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					/>
				</defs>
			</svg>
		</StyledHomeHeroImage>
	);
};

export default HomeHeroImage;
