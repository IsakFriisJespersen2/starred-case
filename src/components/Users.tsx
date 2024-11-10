import { useQuery } from '@tanstack/react-query';

export const Users = () => {
  const data = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('http://localhost:3001/users').then((res) => res.json()),
  });

  return <div></div>;
};
