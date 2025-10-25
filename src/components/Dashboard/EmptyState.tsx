interface EmptyStateProps {
  message: string;
}

export default function EmptyState({message}: EmptyStateProps) {
  return (
    <div className="flex h-[300px] items-center justify-center text-gray-400">
      {message}
    </div>
  );
}
