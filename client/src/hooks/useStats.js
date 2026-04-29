import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

const fetchStats = async () => {
  const { data } = await api.get('/stats');
  return data.data;
};

const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 2,
  });
};

export default useStats;