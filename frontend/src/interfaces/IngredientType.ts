export type IngredientType = {
	_id?: string;
	ingredient: string;
	quantity: number;
	unit: string;
	bought?: boolean;
};

export type IngredientTypeWithId = Omit<IngredientType, "_id"> & {
	_id: string;
};
