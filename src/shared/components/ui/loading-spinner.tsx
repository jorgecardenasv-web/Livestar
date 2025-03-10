export const LoadingSpinner = () => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};
