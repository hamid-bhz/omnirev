export default function LoadingSpinner() {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
    </div>
  );
}
