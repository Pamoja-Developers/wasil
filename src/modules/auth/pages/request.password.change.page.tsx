import PasswordChangeRequestForm from "../components/password.change.request.form";
import { LiaUserLockSolid } from "react-icons/lia";

export default function RequestPasswordChangePage() {
  return (
    <>
      <div className="flex flex-col items-center text-center mb-5 md:mb-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf0fb]">
          <LiaUserLockSolid className="h-7 w-7 text-[#16224f]" />
        </div>
        <h2 className="mt-5 text-3xl text-[#16224f]">
          Request Password Change
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email to continue
        </p>
      </div>
      <PasswordChangeRequestForm />
    </>
  );
}
