import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignIn,
} from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>F5 Gallery (WIP)</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton endpoint="imageUploader" />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}