import TextAnimationAuth from "@/components/TextAnimationAuth";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid lg:grid-cols-2 min-h-screen lg:max-h-screen h-full">
            <div className="hidden lg:flex flex-col p-10 bg-primary/10">
                <div className="flex items-center">
                    <Image src="/" alt="logo" width={100} height={100} />
                </div>
                <div className="h-full flex flex-col justify-center">
                    <TextAnimationAuth />
                </div>
            </div>
            <div className="h-full flex flex-col justify-center items-center mt-14 lg:mt-0 lg:p-6 overflow-auto">
                {children}
            </div>
        </div >

    );
}