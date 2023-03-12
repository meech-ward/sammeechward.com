import { LinkIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

export default function SocialButtons({ className }) {
  return (
    <div className={twMerge('flex flex-col justify-center items-center', className)}>
      <div className="flex w-full justify-between">
        <a
          aria-label="Twitter"
          href={`https://twitter.com/Meech_Ward`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full  text-gray-400 hover:text-gray-500 mx-2"
        >
          <span className="sr-only">Twitter</span>
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>

        <a
          aria-label="LinkedIn"
          href={`https://www.linkedin.com/in/sam-meech-ward-a485ab1a/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-gray-500 mx-2"
        >
          <span className="sr-only">linkedin</span>
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 50 50">
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 16 12 C 14.35499 12 13 13.35499 13 15 C 13 16.64501 14.35499 18 16 18 C 17.64501 18 19 16.64501 19 15 C 19 13.35499 17.64501 12 16 12 z M 16 14 C 16.564129 14 17 14.435871 17 15 C 17 15.564129 16.564129 16 16 16 C 15.435871 16 15 15.564129 15 15 C 15 14.435871 15.435871 14 16 14 z M 14 19 A 1.0001 1.0001 0 0 0 13 20 L 13 35 A 1.0001 1.0001 0 0 0 14 36 L 18 36 A 1.0001 1.0001 0 0 0 19 35 L 19 20 A 1.0001 1.0001 0 0 0 18 19 L 14 19 z M 22 19 A 1.0001 1.0001 0 0 0 21 20 L 21 35 A 1.0001 1.0001 0 0 0 22 36 L 26 36 A 1.0001 1.0001 0 0 0 27 35 L 27 27.5 C 27 26.120455 28.120455 25 29.5 25 C 30.879545 25 32 26.120455 32 27.5 L 32 30 L 32 35 A 1.0001 1.0001 0 0 0 33 36 L 37 36 A 1.0001 1.0001 0 0 0 38 35 L 38 26.5 C 38 22.36961 34.63039 19 30.5 19 C 29.213528 19 28.059744 19.41615 27 19.990234 A 1.0001 1.0001 0 0 0 26 19 L 22 19 z M 15 21 L 17 21 L 17 34 L 15 34 L 15 21 z M 23 21 L 25 21 L 25 21.816406 A 1.0001 1.0001 0 0 0 26.693359 22.537109 C 27.684186 21.585305 29.016683 21 30.5 21 C 33.54961 21 36 23.45039 36 26.5 L 36 34 L 34 34 L 34 30 L 34 27.5 C 34 25.029545 31.970455 23 29.5 23 C 27.029545 23 25 25.029545 25 27.5 L 25 34 L 23 34 L 23 21 z" />
          </svg>
        </a>

        <a
          aria-label="GitHub"
          href={`https://github.com/meech-ward`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-gray-500 mx-2"
        >
          <span className="sr-only">GitHub</span>
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a
          aria-label="YouTube"
          href={`https://www.youtube.com/sammeechward`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-gray-500 mx-2"
        >
          <span className="sr-only">YouTube</span>
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
          </svg>
        </a>

      </div>
    </div>
  )
}