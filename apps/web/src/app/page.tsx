
import { redirect } from 'next/navigation';

export default function RootPage() {
  // The main entry point to the web app should be the dashboard
  redirect('/dashboard');
}
