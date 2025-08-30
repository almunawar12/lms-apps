import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Register form */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-border">
          <h1 className="text-2xl font-bold mb-2 text-primary">Register</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Silakan isi data di bawah untuk membuat akun baru
          </p>
          <form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nama lengkap"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded transition-colors"
            >
              Register
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
