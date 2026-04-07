import React from 'react';
import { Github } from 'lucide-react';

export function SocialProof() {
  return (
    <div className="mt-16 w-full fade-in relative z-20">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-white/10 pb-4 flex items-center gap-3">
        <Github className="w-6 h-6 text-zinc-900 dark:text-white" />
        Live Development Activity
      </h3>

      {/* Main Layout: LetCode (Left) | GitHub Content (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-8 items-start w-full mb-8">
        
        {/* Left Column: LeetCode */}
        <div className="flex justify-center transition-transform hover:scale-[1.02] w-full max-w-[420px] mx-auto xl:mx-0">
          <img
            src="https://leetcard.jacoblin.cool/hemu1808?theme=light&font=Inter&ext=activity"
            alt="LeetCode Stats"
            className="w-full h-auto block dark:hidden rounded-xl object-contain drop-shadow-sm border border-zinc-200"
            loading="lazy"
          />
          <img
            src="https://leetcard.jacoblin.cool/hemu1808?theme=dark&font=Inter&ext=activity"
            alt="LeetCode Stats"
            className="w-full h-auto hidden dark:block rounded-xl object-contain drop-shadow-md border border-white/10"
            loading="lazy"
          />
        </div>

        {/* Right Column: GitHub Content */}
        <div className="flex flex-col gap-6 w-full items-center xl:items-start justify-center h-full">
          
          {/* Top Row: GitHub Stats + Languages */}
          <div className="flex flex-col md:flex-row gap-6 justify-center xl:justify-start items-center w-full">
            
            {/* GitHub Stats */}
            <div className="flex justify-center transition-transform hover:scale-[1.02] w-full max-w-[400px]">
              <img
                src="https://github-readme-stats-eight-theta.vercel.app/api?username=hemu1808&show_icons=true&theme=transparent&hide_border=true&title_color=008000&text_color=3f3f46&icon_color=008000"
                alt="GitHub Stats"
                className="w-full h-auto block dark:hidden object-contain"
                loading="lazy"
              />
              <img
                src="https://github-readme-stats-eight-theta.vercel.app/api?username=hemu1808&show_icons=true&theme=transparent&hide_border=true&title_color=008000&text_color=a1a1aa&icon_color=008000"
                alt="GitHub Stats"
                className="w-full h-auto hidden dark:block object-contain"
                loading="lazy"
              />
            </div>

            {/* Top Languages */}
            <div className="flex justify-center transition-transform hover:scale-[1.02] w-full max-w-[340px]">
              <img
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=hemu1808&layout=compact&theme=transparent&hide_border=true&title_color=008000&text_color=3f3f46"
                alt="Top Languages"
                className="w-full h-auto block dark:hidden object-contain"
                loading="lazy"
              />
              <img
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=hemu1808&layout=compact&theme=transparent&hide_border=true&title_color=008000&text_color=a1a1aa"
                alt="Top Languages"
                className="w-full h-auto hidden dark:block object-contain"
                loading="lazy"
              />
            </div>

          </div>

          {/* Bottom Row: Heatmap */}
          <div className="flex justify-center xl:justify-start w-full opacity-90 transition-opacity hover:opacity-100 transition-transform hover:scale-[1.01] overflow-x-auto min-h-[100px] pb-4">
            <img
              src="https://ghchart.rshah.org/008000/hemu1808"
              alt="GitHub Commit Activity Heatmap"
              className="w-full max-w-4xl min-w-[600px] object-contain mix-blend-multiply dark:mix-blend-screen"
              loading="lazy"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
