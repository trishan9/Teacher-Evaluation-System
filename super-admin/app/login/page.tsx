import LoginForm from "../_components/LoginForm";

const admin: object = {
  username: "admin",
  password: "Secret123@",
};

export default function Login() {
  Object.freeze(admin);

  return (
    <div className="h-[50vh] flex justify-center items-center font-primary">
      <LoginForm admin={admin} />
    </div>
  );
}
