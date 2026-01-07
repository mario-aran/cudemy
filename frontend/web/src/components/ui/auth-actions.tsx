import { Button } from '@/lib/shadcn/installed/components/ui/button';
import { Link } from 'lucide-react';

export const AuthActions = () => (
  <div className="flex items-center gap-2">
    <Button asChild>
      <Link to="#">Log in</Link>
    </Button>

    <Button variant="outline" asChild>
      <Link to="#">Sign up</Link>
    </Button>
  </div>
);
