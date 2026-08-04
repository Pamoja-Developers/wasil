import type { TransactionStatus } from "../../modules/finance/types/transaction.status";

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  const configs = getColorConfigs(status.value);
  return (
    <div
      className={`rounded-full text-center w-fit text-xs px-3 font-bold ${configs.bg} ${configs.fore}`}
    >
      {status.name}
    </div>
  );
}

function getColorConfigs(statusValue: number) {
  if (statusValue == 1) {
    return {
      bg: "bg-blue-400/20",
      fore: "text-blue-400",
    };
  } else if (statusValue == 2) {
    return {
      bg: "bg-red-400/20",
      fore: "text-red-400",
    };
  } else if (statusValue == 3) {
    return {
      bg: "bg-emerald-400/20",
      fore: "text-emerald-400",
    };
  } else if (statusValue == 4) {
    return {
      bg: "bg-purple-400/20",
      fore: "text-purple-400",
    };
  } else if (statusValue == 5) {
    return {
      bg: "bg-gray-400/20",
      fore: "text-gray-400",
    };
  } else if (statusValue == 6) {
    return {
      bg: "bg-slate-400/20",
      fore: "text-slate-400",
    };
  } else if (statusValue == 7) {
    return {
      bg: "bg-orange-400/20",
      fore: "text-orange-400",
    };
  } else {
    return {
      bg: "bg-yellow-500/20",
      fore: "text-yellow-500",
    };
  }
}
