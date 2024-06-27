import FormLogin from "../../components/Auth/FormLogin";

const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
      <div className="md:col-span-8">
        <img
          src=".\public\image\banner.png"
          alt="Banner Login"
          className="w-full h-auto md:h-700px object-cover"
        />
      </div>
      <div className="md:col-span-4">
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
