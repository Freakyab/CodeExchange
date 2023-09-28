"use client";

const Signup = ({ setIsLogin }) => {
  const [form,setForm] = useState({username:"",password:""})
    return (
      <>
        {" "}
        <span className="inline-flex">
          <h1 className="text-4xl py-2 font-bold text-center">Signup
          <span
              className="opacity-50 text-2xl font-normal ml-2 cursor-pointer hover:opacity-100"
              onClick={() => setIsLogin(true)}
          >| Login</span>
          </h1>
        </span>
        <form className="flex flex-col mt-10">
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-slate-900 rounded-lg p-2 mb-5"
            name="email"
            //   onChange={(e) => {
            //     setForm({ ...form, username: e.target.value });
            //   }}
          />
  
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-slate-900 rounded-lg p-2 mb-5"
            name="password"
            //   onChange={(e) => {
            //     setForm({ ...form, password: e.target.value });
            //   }}
          />
  
          <button
            className="bg-slate-900 text-white rounded-lg p-2"
            //   onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </>
    );
  };
  
  export default Signup;
  