export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center">
      <ClassicLoader />
    </div>
  );
}

export const ClassicLoader = () => {
  return (
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--primary)]" />
  );
};
