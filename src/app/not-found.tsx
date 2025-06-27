import Image from "next/image";
export const metadata = {
    title: "404 - Page Not Found",
    description: "Page Not Found",
}

export default function NotFound() {
    return (
        <div className="px-2 w-full">
            <div className="flex flex-col items-center justify-center mx-auto py-4 gap-4">
                <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                <Image
                    src="/images/not-found-1024x1024.png"
                    alt="404"
                    width={500}
                    height={500}
                    sizes="300px"
                    priority={true}
                    title="404"
                />
            </div>

        </div>
    )
}