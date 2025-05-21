/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";

interface TextAreaProps {
  name: string;
  label: string;
  errorMsg?: string | false;
  labelStyle?: string;
  placeholder?: string;
}

const CTextArea = ({
  name,
  label,
  errorMsg,
  labelStyle,
  placeholder = "",
}: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className={`label-text ${labelStyle}`}>{label}</span>
        </label>
        <textarea
          placeholder={placeholder}
          className="textarea textarea-bordered"
          {...register(name, { required: errorMsg })}
        />
      </div>

      {errors[name] && (
        <p className="text-orange-400 text-sm">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default CTextArea;
