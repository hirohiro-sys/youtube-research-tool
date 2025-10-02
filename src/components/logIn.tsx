import { login } from "@/app/login/actions";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          required
        />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          required
        />
        <button formAction={login} className="btn btn-neutral mt-4">
          Log in
        </button>
      </form>
    </div>
  );
}
