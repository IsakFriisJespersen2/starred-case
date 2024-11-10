import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const JobCard = ({ company, description, id, job_title }) => {
  return (
    <div className='shadow-lg bg-gray-90 rounded-lg p-6 max-w-sm'>
      <div className='mb-2 text-gray-500 text-xs'>Job ID: {id}</div>
      <h2 className='text-xl font-semibold text-gray-800'>{job_title}</h2>
      <h3 className='text-lg text-gray-600'>{company}</h3>
      <p className='text-gray-700 mt-4 line-clamp-3'>{description}</p>
    </div>
  );
};

export const Jobs = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const queryString = new URLSearchParams({
    ...(search.length >= 2 ? { q: search } : {}),
    page: String(page),
  });

  console.log(queryString.toString());
  const query = useQuery({
    queryKey: ['jobs', queryString.toString()],
    queryFn: () => fetch(`http://localhost:3001/jobs?${queryString.toString()}`).then((res) => res.json()),
  });

  console.log(query);
  if (query.isFetching) <div>Jobs area loading</div>;

  return (
    <div className='min-w-full flex flex-col gap-6 w-full'>
      <div className='w-full flex justify-end rounded-md'>
        <input
          minLength={2}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-gray-90 py-2 px-4'
          placeholder='Search job title...'
        />
      </div>
      <div className='flex flex-wrap w-full gap-4'>
        {query.data?.data.map(({ company, description, id, job_title }) => (
          <JobCard
            key={id}
            company={company}
            description={description}
            id={id}
            job_title={job_title}
          />
        ))}
      </div>
      <div className='flex justify-center w-full gap-8'>
        <button onClick={() => setPage((prev) => (prev > 0 ? (prev -= 1) : 0))}>Prev</button>
        <p>
          {page} of {10}
        </p>
        <button onClick={() => setPage((prev) => (prev += 1))}>Next</button>
      </div>
    </div>
  );
};
