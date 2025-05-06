import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-5xl font-bold text-primary mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Button asChild size="lg">
        <Link href="/try-on">Go Back to Virtual Tailor</Link>
      </Button>
    </div>
  );
}
