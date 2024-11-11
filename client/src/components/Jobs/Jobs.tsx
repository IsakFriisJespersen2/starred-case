import { JobCard } from './modules/JobCard';
import { Menu } from './modules/Menu';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { User } from '../../App';

export type ActiveTab = 'all' | 'favorites';
type Job = {
  company: string;
  description: string;
  id: number;
  job_title: string;
};

export const Jobs = ({ user }: { user: User | undefined }) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');

  const queryString = new URLSearchParams({
    ...(search.length >= 2 ? { q: search } : {}),
    page: String(page),
  });

  const jobs = useQuery({
    queryKey: ['jobs', queryString.toString()],
    queryFn: (): Promise<{ data: Job[] }> =>
      fetch(`http://localhost:3001/jobs?${queryString.toString()}`).then((res) => res.json()),
  });

  const favorites = useQuery({
    queryKey: ['userFavorites', user?.id, user?.favorites.join(',')],
    queryFn: (): Promise<Job[]> =>
      Promise.all(user?.favorites.map((id) => fetch(`http://localhost:3001/jobs/${id}`).then((res) => res.json()))),
    enabled: !!user,
  });

  if (jobs.isFetching) return <div>Jobs area loading....</div>;

  console.log(favorites);
  return (
    <section className='flex flex-col gap-6'>
      <Menu
        user={user}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='flex flex-wrap w-full gap-4'>
        <>
          {activeTab === 'all' &&
            jobs.data?.data.map(({ company, description, id, job_title }) => (
              <JobCard
                key={id}
                user={user}
                company={company}
                description={description}
                id={id}
                job_title={job_title}
              />
            ))}
          {activeTab === 'favorites' &&
            favorites.data?.map(({ company, description, id, job_title }) => (
              <JobCard
                key={id}
                user={user}
                company={company}
                description={description}
                id={id}
                job_title={job_title}
              />
            ))}
        </>
      </div>
      <div className='flex justify-center w-full gap-8'>
        <button onClick={() => setPage((prev) => (prev > 0 ? (prev -= 1) : 0))}>Prev</button>
        <p>
          {page + 1} of {10}
        </p>
        <button onClick={() => setPage((prev) => (prev += 1))}>Next</button>
      </div>
    </section>
  );
};
