
export default function Header() {
    return (
        <>
            <div className="flex flex-row justify-center border-b-2 border-black pb-3 pt-2">
                <h1 className="font-dark_grote font-extrabold text-5xl">sh9vi</h1>
                <p className="mt-5 ml-4">(by <a href="https://www.linkedin.com/in/rsh-e/" target="_blank" className="underline underline-offset-4 text-violet-600">hrushikesh emkay</a>)</p>
            </div>
            <div className="mt-12 lg:mt-4 mb-3 mx-10 lg:px-40 lg:mx-48">
                <p className="font-bric_grote text-center text-md">
                    you have 9 seconds to answer each math question and score a point. answer incorrectly or run out of time and you lose. score as many points as you can. good luck.
                </p>
                <p className="font-bric_grote text-center text-md">
                    Can I handle a million requests?
                </p>
            </div>
            <button></button>
        </>
    )
}