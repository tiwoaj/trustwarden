import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center mb-4">
            <img src="/logo-dark.png" alt="TrustWarden" className="h-9 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Advanced cybersecurity solutions protecting modern businesses from evolving threats.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary transition-colors">Vulnerability Assessment</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Penetration Testing</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Managed Security</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Compliance & Audit</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Risk Management</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">Get Protected</h4>
          <p className="text-sm text-muted-foreground mb-4">Ready to secure your business? Let's talk.</p>
          <p className="text-sm text-muted-foreground">contact@trustwarden.ca</p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TrustWarden. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
