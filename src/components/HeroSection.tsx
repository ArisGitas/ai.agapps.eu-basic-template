import { Container } from "./Container";

export function HeroSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Επαγγελματικές Υπηρεσίες για την Επιχείρησή σας
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10">
            Αξιόπιστες λύσεις, γρήγορη εκτέλεση και προσωπική εξυπηρέτηση.
            Ανακαλύψτε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να αναπτυχθεί.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-[#0070f3] text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/20"
            >
              Επικοινωνήστε μαζί μας
            </a>
            <a
              href="#services"
              className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Δείτε τις υπηρεσίες μας
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
