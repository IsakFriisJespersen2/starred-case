import { useQuery } from '@tanstack/react-query';
import { User } from '../App';
import { useEffect } from 'react';

export const Users = ({ user, setUser }: { user: User | undefined; setUser: (user: User) => void }) => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<{ data: User[] }> =>
      fetch('http://localhost:3001/users?include=favorites').then((res) => res.json()),
  });

  useEffect(() => {
    if (!user) return;

    setUser(query.data?.data.find((q) => q.id === user.id)!);
  }, [query.data?.data]);

  return (
    <section>
      <select
        className='px-4 py-2'
        onChange={(e) => setUser(query.data?.data.find((user) => String(user.id) === e.target.value)!)}
      >
        <option
          disabled
          selected
          value=''
        >
          Choose a user
        </option>
        {query.data?.data.map(({ id, email }) => (
          <option
            key={id}
            value={id}
          >
            {email}
          </option>
        ))}
      </select>
    </section>
  );
};
