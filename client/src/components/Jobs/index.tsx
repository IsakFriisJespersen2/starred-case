import { JobCard } from './modules/JobCard';
import { Menu } from './modules/Menu';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { User } from '../../App';

export type ActiveTab = 'all' | 'favorites';

type Job = {
  company: string;
  description: string;
  id: number;
  job_title: string;
};

type JobsAPI = {
  data: Job[];
  error: object;
  pagination: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
  };
};

const AllJobs = ({ user, jobs }: { user: User | undefined; jobs: UseQueryResult<{ data: Job[] }> }) => {
  if (jobs.isLoading) return <div>isLoading...</div>;

  return (
    <>
      {jobs.data?.data.map(({ company, description, id, job_title }) => (
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
  );
};

const Favorites = ({ user, favorites }: { user: User | undefined; favorites: UseQueryResult<Job[]> }) => {
  if (favorites.isLoading) return <div>isLoading...</div>;

  return (
    <>
      {favorites.data?.map(({ company, description, id, job_title }) => (
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
  );
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
    queryFn: (): Promise<JobsAPI> =>
      fetch(`http://localhost:3001/jobs?${queryString.toString()}`).then((res) => res.json()),
  });

  const favorites = useQuery({
    queryKey: ['userFavorites', user?.id, user?.favorites.join(',')],
    queryFn: (): Promise<Job[]> =>
      Promise.all(user!.favorites.map((id) => fetch(`http://localhost:3001/jobs/${id}`).then((res) => res.json()))),
    enabled: !!user,
  });

  const lastPage = jobs.data?.pagination?.lastPage || 1;
  return (
    <section className='flex flex-col gap-6 min-w-full'>
      <Menu
        user={user}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='flex flex-wrap w-full gap-4'>
        <>
          {activeTab === 'all' && (
            <>
              <AllJobs
                user={user}
                jobs={jobs}
              />
              <div className='flex justify-center w-full gap-8'>
                <button onClick={() => setPage((prev) => (prev > 0 ? (prev -= 1) : 0))}>Prev</button>
                <p>
                  {page + 1} of {jobs.data?.pagination?.lastPage || 0 + 1}
                </p>
                <button onClick={() => setPage((prev) => (page + 1 < lastPage ? (prev += 1) : page))}>Next</button>
              </div>
            </>
          )}
          {activeTab === 'favorites' && (
            <Favorites
              user={user}
              favorites={favorites}
            />
          )}
        </>
      </div>
    </section>
  );
};
