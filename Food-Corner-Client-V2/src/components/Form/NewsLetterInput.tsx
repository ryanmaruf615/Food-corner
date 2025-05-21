/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { get } from "lodash";
interface InputProps {
  name: string;

  errorMsg?: string | boolean;
  type?: string;

  placeholder?: string;
}

const NewsLetterInput = ({
  name,
  errorMsg,
  type = "text",
  placeholder = "",
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <>
      <div className="flex w-full ">
        <input
          placeholder={placeholder}
          className="input input-sm  input-bordered focus:outline-none  w-full "
          type={type}
          min={0}
          {...register(name, { required: errorMsg })}
        />
        <button
          type="submit"
          className="bg-orange-400 hover:bg-green-500 duration-300 text-white px-2 rounded-r-lg  -ms-2 "
        >
          <span className="font-semibold">Subscribe</span>
        </button>
      </div>

      {error && (
        <p className="text-orange-400 text-sm mt-1">{(error as any).message}</p>
      )}
    </>
  );
};

export default NewsLetterInput;
