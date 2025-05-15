import { SignedIn, UserButton, SignedOut, SignInButton, SignIn } from "@clerk/nextjs";


export function TopNav() {
    return (
      <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
        <div>F5 Gallery (WIP)</div>
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div> 
      </nav>
    );
  }