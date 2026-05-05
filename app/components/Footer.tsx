import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-xl font-serif font-bold text-[hsl(var(--text-primary))]">
              Bridal<span className="text-[hsl(var(--brand-500))]">Econ</span>
            </span>
          </Link>
          <p className="text-sm text-[hsl(var(--text-secondary))] max-w-sm">
            Exploring the economic, cultural, and social dimensions of bride price customs globally through data and AI-powered insights.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4 uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
            <li><Link href="/" className="hover:text-[hsl(var(--brand-500))] transition-colors">Interactive Globe</Link></li>
            <li><Link href="/countries" className="hover:text-[hsl(var(--brand-500))] transition-colors">Country Profiles</Link></li>
            <li><Link href="/about" className="hover:text-[hsl(var(--brand-500))] transition-colors">Methodology</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4 uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
            <li><Link href="/about#data" className="hover:text-[hsl(var(--brand-500))] transition-colors">Data Sources</Link></li>
            <li><Link href="/about#ethics" className="hover:text-[hsl(var(--brand-500))] transition-colors">Ethical Framework</Link></li>
            <li>
              <a href="https://devruss.me" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--brand-500))] transition-colors">
                Created by dev🔥russ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[hsl(var(--text-muted))]">
        <p>© {new Date().getFullYear()} BridalEcon. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[hsl(var(--text-secondary))] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[hsl(var(--text-secondary))] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
