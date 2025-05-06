import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/try-on');
  return null; // Or a loading state if preferred before redirect
}
