import { socialMedias } from "@/constants";

const Footer = () => {
  return (
    <div className="flex items-center w-full py-6 mt-6 text-white sm:mt-0 sm:px-12 bg-accent_primary font-primary justify-evenly">
      <div className="flex flex-col">
        <p className="text-xl">Teacher Evaluation System</p>

        <p className="text-sm">
          by{" "}
          <a
            // href="https://innovisionx-tech.vercel.app/"
            // target="_blank"
            className="font-semibold cursor-pointer hover:underline text-accent_secondary"
          >
            InnoVisionX
          </a>
        </p>
      </div>

      <div className="flex items-center font-medium">
        <span className="px-1 text-xl">&copy;</span>

        <span>
          <a
            // href="https://innovisionx-tech.vercel.app/"
            // target="_blank"
            className="font-semibold underline cursor-pointer hover:no-underline"
          >
            InnoVisionX
          </a>
          <span className="hidden sm:inline"> - All rights reserved.</span>
        </span>
      </div>

      <div className="flex-col hidden gap-1 sm:flex justify-center-center">
        <p className="font-semibold text-accent_secondary">Follow Us</p>

        <div className="flex items-center justify-center gap-4">
          {socialMedias.map((data) => (
            <a key={data.platform}>
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
    </div>
  );
};

export default Footer;
