export default function ErrorMessage() {
  return (
    <div className="flex h-screen items-center justify-center text-center bg-gray-100 text-red-600">
      <h1 className="text-2xl font-bold">
        🚫 You already have an account. Please use your existing login.
      </h1>
    </div>
  );
}
