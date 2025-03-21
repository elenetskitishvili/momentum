import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-4xl font-bold text-primary-text">
        404 - გვერდი ვერ მოიძებნა
      </h2>
      <p className="text-light-text mt-4">
        გვერდი არ არსებობს ან უკვე აღარ არის ხელმისაწვდომი.
      </p>

      <Link
        href="/"
        className="mt-16 px-6 py-2 bg-primary text-white rounded-lg text-base font-medium transition duration-300 ease-in-out hover:bg-primary-light"
      >
        დაბრუნება მთავარ გვერდზე
      </Link>
    </div>
  );
}
