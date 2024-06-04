
const LoginRegister = ({component}) => {
    return (
        <div className="md:float-right md:w-5/6 md:h-screen flex items-center justify-center">
            <div className="m-auto text-center max-md:w-full max-md:px-16 bg-white px-28 py-20 shadow-xl rounded-lg flex flex-col gap-20 w-1/2">
                <h2 className="text-5xl uppercase font-bold">{component}</h2>
                <form className="flex flex-col gap-16">
                    <div className="flex flex-col gap-10">
                        <input type="text" placeholder="Username" className="text-lg p-2 border-b-2 border-black outline-none bg-transparent" />
                        <input type="password" placeholder="Password" className="text-lg p-2 border-b-2 border-black outline-none bg-transparent" />
                    </div>
                    <button type="submit" className="w-full shadow-lg bg-black py-2 text-lg font-bold uppercase rounded-xl text-white">{component}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginRegister;