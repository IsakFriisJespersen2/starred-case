import { useQuery } from '@tanstack/react-query';
import { User } from '../App';

export const Users = ({ setUser }: { setUser: (user: User) => void }) => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<{ data: User[] }> => fetch('http://localhost:3001/users').then((res) => res.json()),
  });

  return (
    <section>
      <select
        className='px-4 py-2'
        onChange={(e) => setUser(query.data?.data.find((user) => String(user.id) === e.target.value))}
      >
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
