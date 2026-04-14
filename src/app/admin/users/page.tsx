const demoUsers = [
  { email: "admin@ivy.local", role: "ADMIN" },
  { email: "editor@ivy.local", role: "EDITOR" },
  { email: "viewer@ivy.local", role: "VIEWER" },
];

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Admin Users & Roles
        </h1>
        <div className="space-y-3">
          {demoUsers.map((user) => (
            <div key={user.email} className="border border-white/10 p-4 flex items-center justify-between">
              <span>{user.email}</span>
              <span className="text-xs tracking-[0.2em] text-[#8A9E9E]">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
