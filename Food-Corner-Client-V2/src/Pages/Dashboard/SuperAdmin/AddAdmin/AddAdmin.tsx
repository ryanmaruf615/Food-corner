/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import CForm from "../../../../components/Form/CForm";
import CInput from "../../../../components/Form/CInput";
import CSelect from "../../../../components/Form/CSelect";
import { CFormButton } from "../../../../components/Form/CFormButton";
import CImageInput from "../../../../components/Form/CImageInput";
import { useState } from "react";
import { useCreateAdminMutation } from "../../../../Redux/api/authApi/authApi";
import { IApiResponse } from "../../../../Redux/interface/global.interface";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "../../../../utils/uploadImage";
import { Effect } from "../../../../components/FramerMotion/Effect";

const AddAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();

  const [preview, setPreview] = useState("");
  const onFormSubmit = async (data: FieldValues) => {
    const { password, photo, ...otherData } = data;
    const photoUrl = await uploadImageToCloudinary(photo[0]);
    if (photoUrl) {
      const res = (await createAdmin({
        password,
        admin: { ...otherData, photo: photoUrl },
      })) as IApiResponse<any>;
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } else {
      toast.success("Something went wrong!");
    }
    setPreview("");
  };

  return (
    <div>
      <SectionHeader text="Add Admin"></SectionHeader>
      <Effect>
        {" "}
        <div className="p-2 container mx-auto">
          <CForm onFormSubmit={onFormSubmit}>
            <CInput
              label="First Name"
              name="name.firstName"
              errorMsg={"This field is required"}
            ></CInput>
            <CInput label="Middle Name" name="name.middleName"></CInput>
            <CInput
              label="Last Name"
              name="name.lastName"
              errorMsg={"This field is required"}
            ></CInput>
            <CInput
              type="email"
              label="Email"
              name="email"
              errorMsg={"This field is required."}
            ></CInput>
            <CImageInput
              errorMsg={"This field is required."}
              label="Photo"
              preview={preview}
              setPreview={setPreview}
              name="photo"
            ></CImageInput>
            <CSelect
              name="gender"
              defaultOption="Select Gender"
              errorMsg={"This field is required."}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              label="Gender"
            ></CSelect>
            <CInput
              label="Contact No"
              name="contactNo"
              errorMsg={"This field is required."}
            ></CInput>
            <CInput
              label="Address"
              name="address"
              errorMsg={"This field is required."}
            ></CInput>
            <CInput
              type="password"
              label="Password"
              name="password"
              errorMsg={"This field is required."}
            ></CInput>
            <CFormButton btnStyle="w-full" text="Create Admin"></CFormButton>
          </CForm>
        </div>
      </Effect>
    </div>
  );
};

export default AddAdmin;
