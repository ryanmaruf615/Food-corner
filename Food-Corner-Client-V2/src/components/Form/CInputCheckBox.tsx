/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  status: string;
  errorMsg?: string | false;

  defaultChecked?: boolean; // Add this prop for default value
}

const CInputCheckBox = ({
  name,
  status,
  errorMsg,
  defaultChecked = false,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="form-control flex flex-row items-center gap-2">
        <input
          type="checkbox"
          {...register(name, { required: errorMsg })}
          defaultChecked={defaultChecked}
          className="checkbox checkbox-warning checkbox-sm"
        />
        <label className="cursor-pointer label">
          <span className="label-text">{status}</span>
        </label>
      </div>

      {errors[name] && (
        <p className="text-orange-400 text-sm">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default CInputCheckBox;
