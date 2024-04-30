
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 font-sans text-white flex flex-col justify-center items-center">
            <div className="mb-4">
                <TbError404 size={450} />
            </div>
            <div>
                <BackButton />
            </div>
        </div>
    );
};

const BackButton = () => {
    return (
        <Link to="/" className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
            Back
        </Link>
    );
};

export default ErrorPage;
