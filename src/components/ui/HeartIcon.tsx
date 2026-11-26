/** The wishlist heart inside its white circle, filled when the product is saved. */
export default function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <span className="flex size-[34px] items-center justify-center rounded-full bg-white">
            <svg
                viewBox="0 0 24 24"
                className={
                    filled ? "size-5 fill-primary stroke-primary" : "size-5 fill-none stroke-black"
                }
                strokeWidth="1.5"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M8 5C5.8 5 4 6.77 4 8.95c0 1.76.7 5.94 7.58 10.17a.8.8 0 0 0 .84 0C19.3 14.89 20 10.71 20 8.95 20 6.77 18.2 5 16 5s-4 2.4-4 2.4S10.2 5 8 5Z" />
            </svg>
        </span>
    );
}
