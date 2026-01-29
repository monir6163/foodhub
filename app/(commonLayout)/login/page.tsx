import LoginForm from "@/components/modules/authentication/LoginForm";

export default function LoginPage() {
  return (
    <section className="h-screen w-full">
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
