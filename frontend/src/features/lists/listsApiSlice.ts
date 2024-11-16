import { apiSlice } from "@/app/api/apiSlice";

export const listsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		deleteIngredient: builder.mutation({
			query: ({ userId, ingredient }) => ({
				url: `/list/${userId}/${ingredient}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
		updateIngredient: builder.mutation({
			query: ({ userId, ingredient, updatedIngredient }) => ({
				url: `/list/${userId}/${ingredient}`,
				method: "PATCH",
				body: { updatedIngredient },
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const { useDeleteIngredientMutation, useUpdateIngredientMutation } =
	listsApiSlice;
