import { Container } from "./Container";

export function Footer() {
  return (
    <footer data-section="footer" className="bg-gray-900 text-gray-400 py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <span data-role="logo" className="text-white font-bold text-lg block mb-2">Η Εταιρεία Μας</span>
            <p className="text-sm max-w-xs">
              Επαγγελματικές υπηρεσίες υψηλής ποιότητας για κάθε επιχείρηση.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="#services" data-role="nav-link" className="hover:text-white transition-colors">Υπηρεσίες</a>
            <a href="#about" data-role="nav-link" className="hover:text-white transition-colors">Σχετικά</a>
            <a href="#contact" data-role="nav-link" className="hover:text-white transition-colors">Επικοινωνία</a>
          </nav>
          <address className="not-italic text-sm space-y-1">
            <p data-role="email-link">info@example.com</p>
            <p data-role="phone-link">+30 210 123 4567</p>
            <p data-role="address">Αθήνα, Ελλάδα</p>
          </address>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>© {new Date().getFullYear()} Η Εταιρεία Μας. Όλα τα δικαιώματα διατηρούνται.</span>
          <span className="text-gray-600">
            Powered by{" "}
            <a href="https://agapps.eu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
              agapps.eu
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
