// AboutMeSection.jsx
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function AboutMeSection() {
  return (
    <div className="bg-[#363543] min-h-screen flex items-center justify-center p-4 md:p-8">
      <div
        className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center md:items-start"
        // 🔧 ADDED: `items-center md:items-start` for responsive alignment
      >
        <div className="relative">
          <div className="bg-[#55556d] rounded-2xl p-1.5">
            <div
              className="rounded-xl overflow-hidden aspect-square w-full max-w-[300px] md:max-w-[400px]"
              // 🔧 CHANGED: Responsive image sizing `max-w-[300px] md:max-w-[400px]`
            >
              <img
                src="https://i.postimg.cc/k4YnpjBj/Whats-App-Image-2025-04-15-at-6-19-55-PM.jpg"
                alt="Profile photo"
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl bg-[#e5d6c6]"
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center md:items-start justify-center space-y-3 text-white text-center md:text-left px-2"
          // 🔧 CHANGED: `items-center md:items-start` to left-align on md+, center on mobile
          // 🔧 CHANGED: `text-center md:text-left` for responsive text alignment
          // 🔧 ADDED: `px-2` for padding on mobile
        >
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-wide whitespace-nowrap">
              Turki Saeed
            </h1>

            <a
              href="https://github.com/turkiano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 text-xl"
              // 🔧 CHANGED: Icon size reduced to `text-xl` for better responsiveness
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/turki-saeed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-xl"
              // 🔧 CHANGED: Icon size reduced to `text-xl` for better responsiveness
            >
              <FaLinkedin />
            </a>
          </div>

          <h5
            className="text-xl md:text-2xl tracking-wide"
            // 🔧 CHANGED: Responsive subtitle font size `text-xl md:text-2xl`
          >
            Full Stack Software Developer
          </h5>

          <p
            className="text-gray-300 max-w-xl text-sm md:text-base"
            // 🔧 CHANGED: Responsive paragraph text size `text-sm md:text-base`
          >
            🚀 Budget App – built a modern Budget App with a focus on user
            experience, and clean architecture. The frontend was crafted using
            TypeScript and Shadcn UI, delivering a sleek, responsive interface
            that adapts beautifully across devices. For authentication, I
            implemented a robust signup and login system using C#, complete with
            a secure Email OTP verification flow to ensure safe access for
            users.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/assets/Turki-Saeed-Resume.pdf"
              download
              className="px-8 py-3 text-center font-semibold rounded-lg border border-gray-600 text-white"
            >
              RESUME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
