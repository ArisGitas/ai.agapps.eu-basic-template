import { Container } from "./Container";

const highlights = [
  "100+ ικανοποιημένοι πελάτες",
  "10+ χρόνια εμπειρίας",
  "Διαθέσιμοι 24/7 για υποστήριξη",
];

export function AboutSection() {
  return (
    <section id="about" data-section="about" className="bg-white py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-[#0070f3] mb-4">
              Σχετικά με εμάς
            </span>
            <h2 data-role="title" className="text-3xl font-bold text-gray-900 mb-6">
              Χρόνια εμπειρίας στην υπηρεσία σας
            </h2>
            <p data-role="subtitle" className="text-gray-500 leading-relaxed mb-4">
              Είμαστε μια ομάδα επαγγελματιών με πάθος για την ποιότητα και τα αποτελέσματα.
              Από το 2010, εξυπηρετούμε εκατοντάδες επιχειρήσεις σε ολόκληρη την Ελλάδα.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Η φιλοσοφία μας είναι απλή: κάθε πελάτης αξίζει την καλύτερη εξυπηρέτηση,
              κάθε έργο αξίζει την πλήρη αφοσίωσή μας.
            </p>
            <ul className="space-y-3">
              {highlights.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Replace with <Image> from next/image when you have a real photo */}
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
            <span className="text-gray-400 text-sm">Εικόνα εταιρείας</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
