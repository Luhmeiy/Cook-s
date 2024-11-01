import { apiSlice } from "@/app/api/apiSlice";

export const recipesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPublicRecipes: builder.mutation({
			query: () => ({
				url: "/recipes",
				method: "GET",
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

export const { useGetPublicRecipesMutation, useGetUserRecipesMutation } =
	recipesApiSlice;
