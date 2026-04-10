export default function ProductSkeleton() {
  return (
    <div className="border rounded-xl p-4 animate-pulse">
      <div className="w-full h-52 bg-gray-200 rounded-lg"></div>
      <div className="h-5 bg-gray-200 rounded mt-4"></div>
      <div className="h-4 bg-gray-200 rounded mt-2"></div>
      <div className="h-5 bg-gray-200 rounded mt-4 w-20"></div>
    </div>
  );
}