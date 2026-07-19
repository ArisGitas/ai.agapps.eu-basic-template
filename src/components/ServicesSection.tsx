import { Container } from "./Container";

const services = [
  {
    title: "Γρήγορη Εκτέλεση",
    description: "Παραδίδουμε αποτελέσματα γρήγορα και αξιόπιστα, χωρίς καθυστερήσεις.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Εγγυημένη Ποιότητα",
    description: "Κάθε έργο ολοκληρώνεται με τα υψηλότερα πρότυπα ποιότητας και επαγγελματισμού.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: "Προσωπική Εξυπηρέτηση",
    description: "Αφιερωνόμαστε σε κάθε πελάτη ξεχωριστά για να εξασφαλίσουμε την ικανοποίησή του.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
];

export function ServicesSection() {
  return (
    <section id="services" data-section="services" className="bg-gray-50 py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 data-role="title" className="text-3xl font-bold text-gray-900 mb-4">Οι Υπηρεσίες μας</h2>
          <p data-role="subtitle" className="text-gray-500 max-w-xl mx-auto">
            Προσφέρουμε ολοκληρωμένες λύσεις για κάθε ανάγκη της επιχείρησής σας.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              data-role="service-item"
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0070f3] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {service.icon}
                </svg>
              </div>
              <h3 data-role="item-title" className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p data-role="item-description" className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
