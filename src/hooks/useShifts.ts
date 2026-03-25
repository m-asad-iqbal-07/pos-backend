import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, Shift, ShiftCreate, ShiftClose, PaginatedResponse } from '../lib/api';

/**
 * Hook to fetch all shifts with pagination
 */
export function useShifts(page: number = 1, per_page: number = 10) {
    return useQuery({
        queryKey: ['shifts', page, per_page],
        queryFn: async () => {
            const { data } = await apiClient.get<PaginatedResponse<Shift>>('/shifts', {
                params: { page, per_page }
            });
            return data;
        }
    });
}

/**
 * Hook to fetch a specific shift by ID
 */
export function useShift(id: number | null) {
    return useQuery({
        queryKey: ['shift', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await apiClient.get<Shift>(`/shifts/${id}`);
            return data;
        },
        enabled: !!id,
    });
}

/**
 * Hook to open a new shift
 */
export function useOpenShift() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ShiftCreate) => {
            const { data } = await apiClient.post<Shift>('/shifts/open', payload);
            return data;
        },
        onSuccess: () => {
            // Invalidate shifts list and dashboard to reflect new shift
            queryClient.invalidateQueries({ queryKey: ['shifts'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });
}

/**
 * Hook to close a shift
 */
export function useCloseShift() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id: number, payload: ShiftClose }) => {
            const { data } = await apiClient.patch<Shift>(`/shifts/${id}/close`, payload);
            return data;
        },
        onSuccess: () => {
            // Invalidate shifts list and dashboard
            queryClient.invalidateQueries({ queryKey: ['shifts'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });
}
