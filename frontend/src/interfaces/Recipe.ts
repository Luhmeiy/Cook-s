export interface Recipe {
	_id: string;
	name: string;
	category: string;
	prepTime: string;
	servings?: number;
	description?: string;
	ingredients: {
		_id?: string;
		ingredient: string;
		quantity: number;
		unit: string;
	}[];
	instructions: string;
	favorite: boolean;
	public: boolean;
	userId: string;
	createdBy: {
		_id: string;
		username: string;
	};
}
