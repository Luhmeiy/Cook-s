import { apiSlice } from "@/app/api/apiSlice";
import { Recipe } from "@/interfaces/Recipe";

export const recipesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPublicRecipes: builder.query<{ recipes: Recipe[] }, null>({
			query: () => "/recipes",
			keepUnusedDataFor: 0,
		}),
		getUserRecipes: builder.query<{ recipes: Recipe[] }, string>({
			query: (id) => `/recipes/user/${id}`,
			providesTags: ["Recipes"],
		}),
		getRecipeById: builder.query<{ recipe: Recipe }, string>({
			query: (id) => `/recipes/${id}`,
			keepUnusedDataFor: 0,
		}),
		postRecipe: builder.mutation({
			query: ({ data }) => ({
				url: "/recipes",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Recipes"],
		}),
		patchRecipe: builder.mutation({
			query: ({ id, data }) => ({
				url: `/recipes/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Recipes"],
		}),
		deleteRecipe: builder.mutation({
			query: ({ id }) => ({
				url: `/recipes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Recipes"],
		}),
	}),
});

export const {
	useGetPublicRecipesQuery,
	useGetUserRecipesQuery,
	useGetRecipeByIdQuery,
	usePostRecipeMutation,
	usePatchRecipeMutation,
	useDeleteRecipeMutation,
} = recipesApiSlice;
