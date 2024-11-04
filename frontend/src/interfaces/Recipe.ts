export interface Recipe {
	_id: string;
	name: string;
	category: string;
	prepTime: string;
	servings?: string;
	description?: string;
	ingredients: [
		{
			ingredient: string;
			quantity: number;
			unit: string;
		}
	];
	instructions: string[];
	favorite: boolean;
	public: boolean;
	userId: string;
	createdBy: [
		{
			id: string;
			username: string;
		}
	];
}
