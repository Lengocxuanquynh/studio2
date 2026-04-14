const seoModules = [
  "Metadata theo route",
  "Sitemap tự động",
  "Robots rules",
  "Article schema",
  "Canonical URL",
];

export default function AdminSeoPage() {
  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Admin SEO Settings
        </h1>
        <ul className="space-y-3">
          {seoModules.map((item) => (
            <li key={item} className="border border-white/10 p-4">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
