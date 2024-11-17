import { apiSlice } from "@/app/api/apiSlice";

export const listsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		postIngredient: builder.mutation({
			query: (body) => ({
				url: "list",
				method: "POST",
				body,
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
		deleteIngredient: builder.mutation({
			query: ({ userId, ingredient }) => ({
				url: `/list/${userId}/${ingredient}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	usePostIngredientMutation,
	useUpdateIngredientMutation,
	useDeleteIngredientMutation,
} = listsApiSlice;
