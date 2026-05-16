import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 lg:p-12 gap-16 min-h-screen">
      <div className="flex flex-col gap-6 max-w-3xl mt-12">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase text-accent mix-blend-difference">
          About Us
        </h1>
        <p className="text-xl lg:text-3xl font-medium leading-relaxed text-balance opacity-90">
          FADHR LABS is an independent design and research laboratory, and publisher dedicated to building tools that expand human capability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-border pt-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            We aim to create minimalist, highly functional software that respects user attention. By blending brutalist design principles with modern web technologies, we build experiences that are both raw and refined.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
          <p className="text-lg opacity-80 leading-relaxed mb-4">
            Interested in collaborating or learning more about our work? Reach out to our team.
          </p>
          <a href="mailto:hello@fadhrlabs.com" className="inline-flex px-6 py-3 rounded-full bg-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors w-fit">
            hello@fadhrlabs.com
          </a>
        </div>
      </div>
    </div>
  );
}
