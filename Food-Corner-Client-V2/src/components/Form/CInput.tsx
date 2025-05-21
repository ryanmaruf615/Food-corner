/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { get } from "lodash";
interface InputProps {
  name: string;
  label: string;
  errorMsg?: string | boolean;
  type?: string;
  labelStyle?: string;
  placeholder?: string;
}

const CInput = ({
  name,
  label,
  errorMsg,
  type = "text",
  labelStyle,
  placeholder = "",
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <div>
      <>
        <div className="form-control">
          <label className="label">
            <span className={`label-text ${labelStyle}`}>{label}</span>
          </label>
          <input
            placeholder={placeholder}
            className="input input-sm input-bordered"
            type={type}
            min={0}
            {...register(name, { required: errorMsg })}
          />
        </div>

        {error && (
          <p className="text-orange-400 text-sm mt-1">
            {(error as any).message}
          </p>
        )}
      </>
    </div>
  );
};

export default CInput;
