import { orderBy } from "lodash";
import { Dispatch, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { StyledPopover } from "@/styles/Popover.styled";
import Button from "../Button";
import { IngredientTypeWithId } from "@/interfaces/IngredientType";
import { Recipe } from "@/interfaces/Recipe";

type Direction = "asc" | "desc";

const directions: Direction[] = ["asc", "desc"];

const SortMenu = <T extends Recipe | IngredientTypeWithId>({
	properties,
	list,
	setList,
}: {
	properties: string[];
	list: T[];
	setList: Dispatch<React.SetStateAction<T[] | undefined>>;
}) => {
	const [searchParams] = useSearchParams();

	const property = searchParams.get("property") as string;
	const order = searchParams.get("order") as Direction;

	const [listEl, setListEl] = useState<HTMLButtonElement | null>(null);
	const openList = Boolean(listEl);
	const listId = openList ? "simple-popover" : undefined;

	const location = window.location.href.split("?")[0];

	const formatProperty = (property: string, order: Direction) => {
		const capitalizedProperty =
			property.charAt(0).toUpperCase() + property.slice(1);
		const formatedOrder = order === "asc" ? "(A-Z)" : "(Z-A)";

		return `${capitalizedProperty} ${formatedOrder}`;
	};

	useEffect(() => {
		if (list) {
			setList(orderBy(list, [property], [order]));
		}
	}, [list, order, property, setList]);

	return (
		<>
			<Button
				aria-describedby={listId}
				onClick={(e) => setListEl(e.currentTarget)}
			>
				{property && order ? formatProperty(property, order) : "Sort"}
				{openList ? (
					<CaretUp size={18} weight="fill" />
				) : (
					<CaretDown size={18} weight="fill" />
				)}
			</Button>

			<StyledPopover
				id={listId}
				open={openList}
				anchorEl={listEl}
				onClose={() => setListEl(null)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				{properties.map((property) =>
					directions.map((direction) => (
						<Link
							to={`${location}?property=${property}&order=${direction}`}
							onClick={() => setListEl(null)}
							key={property + direction}
						>
							{formatProperty(property, direction)}
						</Link>
					))
				)}
			</StyledPopover>
		</>
	);
};

export default SortMenu;
