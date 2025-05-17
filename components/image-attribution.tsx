import Link from "next/link"

export default function ImageAttribution() {
  return (
    <div className="text-xs text-gray-500 mt-8 mb-4 text-center">
      <p>
        All product images are from{" "}
        <Link
          href="https://unsplash.com"
          className="underline hover:text-gray-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </Link>{" "}
        and are free to use under the{" "}
        <Link
          href="https://unsplash.com/license"
          className="underline hover:text-gray-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash License
        </Link>
        .
      </p>
    </div>
  )
}
