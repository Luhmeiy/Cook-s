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
	}),
});

export const { useDeleteIngredientMutation } = listsApiSlice;
