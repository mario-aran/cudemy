import { PATHS } from '@/constants/paths';
import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import { NavLink, Outlet } from 'react-router';

// ---------------------------
// CONSTANTS
// ---------------------------

const NAV_LINKS = [
  { path: '/', text: 'Home' },
  { path: PATHS.COURSE_ID, text: 'Course' },
  { path: PATHS.COURSE_ID_PLAYER, text: 'Course Player' },
  { path: PATHS.INSTRUCTOR_UPLOAD, text: 'Instructor Upload' },
] as const;

// ---------------------------
// COMPONENTS
// ---------------------------

const CustomNav = () => (
  <nav className="flex items-center gap-4 text-sm xl:gap-6">
    {NAV_LINKS.map(({ path, text }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          [
            'text-foreground/80 hover:text-foreground/80 transition-colors',
            isActive ? 'text-foreground font-semibold' : '',
          ].join(' ')
        }
      >
        {text}
      </NavLink>
    ))}
  </nav>
);

// ---------------------------
// ENTRYPOINT
// ---------------------------

export const LandingLayout = () => (
  <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex justify-between border-x px-4 py-2">
        <CustomNav />

        {/* Controls */}
        <div className="flex">
          <ModeToggle />
        </div>
      </div>
    </header>

    <main className="container mx-auto flex flex-1 flex-col border-x p-6">
      <Outlet />
    </main>

    <footer className="border-t">
      <div className="container mx-auto border-x p-4 text-sm">
        <p>This is a footer.</p>
      </div>
    </footer>
  </div>
);
