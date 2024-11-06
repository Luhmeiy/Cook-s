import { apiSlice } from "@/app/api/apiSlice";

export const recipesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPublicRecipes: builder.mutation({
			query: () => ({
				url: "/recipes",
				method: "GET",
			}),
		}),
		postRecipe: builder.mutation({
			query: (credentials) => ({
				url: "/recipes",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		getUserRecipes: builder.mutation({
			query: (id) => ({
				url: `/recipes/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetPublicRecipesMutation,
	usePostRecipeMutation,
	useGetUserRecipesMutation,
} = recipesApiSlice;
