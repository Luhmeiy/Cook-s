import { apiSlice } from "@/app/api/apiSlice";

export const recipesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPublicRecipes: builder.mutation({
			query: () => ({
				url: "/recipes",
				method: "GET",
			}),
		}),
		getRecipeById: builder.mutation({
			query: (id) => ({
				url: `/recipes/${id}`,
				method: "GET",
			}),
		}),
		postRecipe: builder.mutation({
			query: ({ data }) => ({
				url: "/recipes",
				method: "POST",
				body: data,
			}),
		}),
		patchRecipe: builder.mutation({
			query: ({ id, data }) => ({
				url: `/recipes/${id}`,
				method: "PATCH",
				body: data,
			}),
		}),
		getUserRecipes: builder.mutation({
			query: (id) => ({
				url: `/recipes/user/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetPublicRecipesMutation,
	useGetRecipeByIdMutation,
	usePostRecipeMutation,
	usePatchRecipeMutation,
	useGetUserRecipesMutation,
} = recipesApiSlice;
