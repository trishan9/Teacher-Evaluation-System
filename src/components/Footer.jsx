import { socialMedias } from "@/constants"

const Footer = () => {
    return (
        <footer className="flex items-center w-full px-12 py-10 text-white bg-accent_primary font-primary justify-evenly">
            <div className="flex flex-col">
                <p className="text-xl">
                    Teacher Review System
                </p>

                <p className="text-sm">by <a href="https://innovisionx-tech.vercel.app/" target="_blank" className="font-semibold cursor-pointer hover:underline text-accent_secondary" >InnoVisionX</a></p>
            </div>

            <div className="flex items-center font-medium">
                <span className="px-1 text-xl">
                    &copy;
                </span>

                <span>
                    <a href="https://innovisionx-tech.vercel.app/" target="_blank" className="font-semibold underline cursor-pointer hover:no-underline" >InnoVisionX</a> - All rights reserved.
                </span>
            </div>

            <div className="flex flex-col gap-1 justify-center-center">
                <p className="font-semibold text-accent_secondary">Follow Us</p>

                <div className="flex items-center justify-center gap-4">
                    {socialMedias.map((data) => (
                        <a key={data.platform} target="_blank" href={data.url}>
                            <img
                                width="25"
                                height="25"
                                src={data.imageUrl}
                                alt={data.platform}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
