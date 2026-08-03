import AppModal from "./app.modal";
import AppButton from "./app.button";
import { GoTrash } from "react-icons/go";
import AppSpinner from "./loading.indicators";
import { IoCheckmarkDone } from "react-icons/io5";

export default function ActivationAssuaranceDialog({
  itemName,
  isOpen,
  setIsOpen,
  isTakingAction = false,
  action,
  disclaimer,
  onTakingAction,
}: {
  itemName: string;
  isOpen: boolean;
  isTakingAction: boolean;
  action: "activate" | "deactivate";
  disclaimer?: string;
  setIsOpen: (value: boolean) => void;
  onTakingAction: () => void;
}) {
  return (
    <AppModal
      padding="py-3 px-6"
      className="w-xs bg-slate-50 border border-slate-600/50"
      isOpen={isOpen}
      setIsOpen={isTakingAction ? (_value: boolean) => {} : setIsOpen}
    >
      <div className="flex flex-col gap-2">
        {action == "activate" ? (
          <div className="bg-green-300/30 rounded-full p-2 w-fit">
            <IoCheckmarkDone className="text-green-600 text-xl" />
          </div>
        ) : (
          <div className="bg-red-300/30 rounded-full p-2 w-fit">
            <GoTrash className="text-red-600 text-xl" />
          </div>
        )}
        <span className="text-xs">
          Are you sure you want to{" "}
          {action == "activate" ? "activate" : "deactivate"}{" "}
          <span
            className={`${action == "activate" ? "text-green-500" : "text-red-500"}`}
          >
            {itemName}
          </span>
          ?
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-xs">
            {disclaimer ?? "You can reverse this action later on"}
          </span>
          {isTakingAction ? (
            <div className="flex justify-center">
              <AppSpinner />
            </div>
          ) : (
            <div className="flex gap-5">
              <AppButton
                variant="outline"
                className="flex-1 h-7 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Close
              </AppButton>
              <AppButton
                variant={action == "activate" ? "primary" : "danger"}
                className="flex-1 h-7 flex items-center"
                onClick={onTakingAction}
              >
                {action == "activate" ? "Activate" : "Deactivate"}
              </AppButton>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}
