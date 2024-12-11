import { ModeToggle } from "./mode-toggle";
import { UserNav } from "../admin-panel/user-nav";
import { SheetMenu } from "../admin-panel/sheet-menu";


export function Navbar({ title }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center justify-center">
          <SheetMenu />
          <h1 className="font-bold text-[16px] mb-0">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
