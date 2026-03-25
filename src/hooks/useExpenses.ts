import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, Expense, ExpenseCreate, ExpenseUpdate, PaginatedResponse } from '../lib/api';

/**
 * Hook to fetch all expenses with pagination
 */
export function useExpenses(page: number = 1, per_page: number = 10) {
    return useQuery({
        queryKey: ['expenses', page, per_page],
        queryFn: async () => {
            const { data } = await apiClient.get<PaginatedResponse<Expense>>('/expenses', {
                params: { page, per_page }
            });
            return data;
        }
    });
}

/**
 * Hook to fetch a specific expense by ID
 */
export function useExpense(id: number | null) {
    return useQuery({
        queryKey: ['expense', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await apiClient.get<Expense>(`/expenses/${id}`);
            return data;
        },
        enabled: !!id,
    });
}

/**
 * Hook to create a new expense
 */
export function useCreateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ExpenseCreate) => {
            const { data } = await apiClient.post<Expense>('/expenses', payload);
            return data;
        },
        onSuccess: () => {
            // Invalidate expenses list and dashboard
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });
}

/**
 * Hook to update an existing expense
 */
export function useUpdateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id: number, payload: ExpenseUpdate }) => {
            const { data } = await apiClient.patch<Expense>(`/expenses/${id}`, payload);
            return data;
        },
        onSuccess: (data) => {
            // Invalidate specific expense and list
            queryClient.invalidateQueries({ queryKey: ['expense', data.id] });
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });
}

/**
 * Hook to delete an expense
 */
export function useDeleteExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await apiClient.delete(`/expenses/${id}`);
        },
        onSuccess: () => {
            // Invalidate expenses list and dashboard
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });
}
