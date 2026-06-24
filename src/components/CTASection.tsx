import { Container } from "./Container";

export function CTASection() {
  return (
    <section id="contact" className="bg-[#0070f3] py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Έτοιμοι να συνεργαστούμε;
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-10">
            Επικοινωνήστε μαζί μας σήμερα και ας συζητήσουμε πώς μπορούμε να βοηθήσουμε
            την επιχείρησή σας να αναπτυχθεί.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@example.com"
              className="px-6 py-3 bg-white text-[#0070f3] text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Στείλτε μας email
            </a>
            <a
              href="tel:+302101234567"
              className="px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Καλέστε μας
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
