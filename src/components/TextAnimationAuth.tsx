'use client'

import { cn } from "@/lib/utils";
import { TypeAnimation } from "react-type-animation";

type TextAnimationAuthProps = {
    className?: string;
    classNameAnimationContainer?: string;
}

export default function TextAnimationAuth({ className, classNameAnimationContainer }: TextAnimationAuthProps) {
    return (
        <div className={cn("mx-auto text-2xl lg:text-5xl my-6 flex flex-col gap-3 lg:gap-5 font-bold text-center", className)}>
            <p className="text-primary drop-shadow-md">
                Welcome to TechZone 💻
            </p>
            <div className={cn("text-center", classNameAnimationContainer)}>
                <TypeAnimation
                    sequence={[
                        "High performance guaranteed 🚀",
                        2000,
                        "Unbeatable prices 💸",
                        2000,
                        "Official warranty 🔧",
                        2000,
                        "Custom-built gaming PCs 🎮",
                        2000,
                        "Smooth business laptops 💼",
                        2000,
                        "Nationwide delivery 🚚",
                        2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    style={{ fontSize: '1.5em', display: 'inline-block' }}
                />
            </div>
        </div>
    )
}
