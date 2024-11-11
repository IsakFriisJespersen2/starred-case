import { Starred } from '../../../icons/starred';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../../../App';

export const JobCard = ({
  user,
  company,
  description,
  id,
  job_title,
}: {
  user: User | undefined;
  company: string;
  description: string;
  id: number;
  job_title: string;
}) => {
  const queryClient = useQueryClient();
  const handleFavorite = useMutation({
    mutationFn: ({ method, userId }: { method: 'POST' | 'DELETE'; userId: number }) =>
      fetch(`http://localhost:3001/users/${userId}/favorite`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: id,
        }),
      }),
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Error modifying userFavorite:', error);
    },
  });

  const isStarred = !!user?.favorites?.find((favoriteJobId) => favoriteJobId === id);
  return (
    <div className='shadow-lg bg-gray-90 rounded-lg p-6 max-w-sm'>
      {!!user && (
        <span
          className={`flex justify-end w-full`}
          onClick={() => handleFavorite.mutate({ method: isStarred ? 'DELETE' : 'POST', userId: user.id })}
        >
          <Starred className={`h-6 w-6  ${isStarred ? 'fill-brand-success-50' : 'fill-white'}`} />
        </span>
      )}
      <div className='mb-2 text-gray-500 text-xs'>Job ID: {id}</div>
      <h2 className='text-xl font-semibold text-gray-800'>{job_title}</h2>
      <h3 className='text-lg text-gray-600'>{company}</h3>
      <p className='text-gray-700 mt-4 line-clamp-3'>{description}</p>
    </div>
  );
};
