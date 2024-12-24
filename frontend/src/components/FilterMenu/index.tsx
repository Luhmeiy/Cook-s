import { Dispatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { StyledPopover } from "@/styles/Popover.styled";
import { CheckboxContainer } from "./FilterMenu.styled";
import Button from "../Button";
import { Recipe } from "@/interfaces/Recipe";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const defaultFilters = [
	{
		property: "favorite",
		value: "true",
		text: "Favorite",
	},
	{
		property: "createdBy",
		value: "user",
		text: "Created by you",
	},
	{
		property: "createdBy",
		value: "others",
		text: "Created by others",
	},
];

interface Filters {
	[key: string]: string;
}

const FilterMenu = ({
	list,
	setList,
}: {
	list: Recipe[];
	setList: Dispatch<React.SetStateAction<Recipe[] | undefined>>;
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const userId = useSelector(selectCurrentUserId);

	const [filters, setFilters] = useState<Filters>({});

	const [listEl, setListEl] = useState<HTMLButtonElement | null>(null);
	const openList = Boolean(listEl);
	const listId = openList ? "simple-popover" : undefined;

	const handleFilterChange = (
		filterKey: string,
		filterValue: string | undefined
	) => {
		const currentParams = Object.fromEntries(searchParams.entries());

		if (filterValue !== undefined) {
			currentParams[filterKey] = filterValue;
		} else {
			delete currentParams[filterKey];
		}

		setSearchParams(currentParams);
	};

	useEffect(() => {
		if (list) {
			const initialFilters = Object.fromEntries(searchParams.entries());
			setFilters(initialFilters);

			const filteredList = list.filter((item) => {
				return Object.keys(initialFilters).every((key) => {
					const filterValue = initialFilters[key];

					if (key === "favorite")
						return String(item[key]) === filterValue;
					if (key === "createdBy" && filterValue === "user")
						return item[key]._id.includes(userId!);
					if (key === "createdBy" && filterValue === "others")
						return !item[key]._id.includes(userId!);
					return true;
				});
			});

			setList(filteredList);
		}
	}, [list, searchParams, setList, userId]);

	return (
		<>
			<Button
				$variant="transparent"
				aria-describedby={listId}
				onClick={(e) => setListEl(e.currentTarget)}
			>
				Filter
				{openList ? (
					<CaretUp size={16} weight="fill" />
				) : (
					<CaretDown size={16} weight="fill" />
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
				{defaultFilters.map((filter) => (
					<CheckboxContainer key={filter.property + filter.value}>
						<input
							type="checkbox"
							checked={filters[filter.property] === filter.value}
							onChange={(e) =>
								handleFilterChange(
									filter.property,
									e.target.checked ? filter.value : undefined
								)
							}
						/>
						{filter.text}
					</CheckboxContainer>
				))}
			</StyledPopover>
		</>
	);
};

export default FilterMenu;
