import Navbar from "./_components/navbar";
import SignIn from "./_components/signin";

export default function Home() {
  return (
    <section className="font-primary">
      <Navbar />

      <div className="p-6">
        <SignIn />
      </div>
    </section>
  );
}
