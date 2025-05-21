/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import CForm from "../../components/Form/CForm";
import {
  useGetCustomerInfoQuery,
  useUpdateCustomerInfoMutation,
} from "../../Redux/api/userApi/userApi";
import CInput from "../../components/Form/CInput";
import CImageInput from "../../components/Form/CImageInput";
import { useState } from "react";
import { CFormButton } from "../../components/Form/CFormButton";
import { filterEmptyFields } from "../../utils/FilterEmptyObject";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "../../utils/uploadImage";
import { IApiResponse } from "../../Redux/interface/global.interface";
import { useAppSelector } from "../../Redux/hooks";
import { decodeToken } from "../../utils/decodeToken";
import { JwtPayload } from "jwt-decode";
import { Effect } from "../../components/FramerMotion/Effect";
import LoadingUi from "../../components/common/LoadingUi/LoadingUi";

const UserProfile = () => {
  const { token } = useAppSelector((state) => state.auth);
  let user;

  if (token) {
    user = decodeToken(token) as JwtPayload & {
      role: string;
      userEmail: string;
    };
  }

  const [updateCustomer] = useUpdateCustomerInfoMutation();
  const [preview, setPreview] = useState("");

  const { data, isLoading } = useGetCustomerInfoQuery("");
  console.log(data?.data);
  const onFormSubmit = async (data: FieldValues) => {
    const { photo, ...other } = data;
    console.log(photo);
    const filteredValue = filterEmptyFields(other);
    if (Object.keys(filteredValue).length || photo[0]) {
      if (photo[0]) {
        const photoUrl = await uploadImageToCloudinary(photo[0]);
        if (photoUrl) {
          const res = (await updateCustomer({
            ...filteredValue,
            photo: photoUrl,
          })) as IApiResponse<any>;
          if (res?.data?.success) {
            toast.success(res?.data.message);
          }
        } else {
          toast.error("Something went wrong. Try again.");
        }
      } else {
        const res = (await updateCustomer({
          ...filteredValue,
        })) as IApiResponse<any>;
        if (res?.data?.success) {
          toast.success(res?.data.message);
        }
      }
    } else {
      toast.success("All fields are empty.");
    }
    setPreview("");
  };
  return (
    <div>
      <ReactHelemt title=": User-Profile"></ReactHelemt>
      <SectionHeader text="User Profile"></SectionHeader>
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <Effect>
          {" "}
          {user?.role == "customer" && (
            <div className="flex justify-center my-5">
              <div className=" flex w-96 min-h-52 md:w-[400px] p-3 justify-around rounded-md items-center  shadow-xl">
                <figure>
                  <img
                    src={
                      data?.data?.photo ||
                      "https://png.pngtree.com/png-vector/20190130/ourmid/pngtree-characters-enjoy-food-cartoon-characters-gourmet-hand-painted-character-cuisine-enjoy-png-image_606799.jpg"
                    }
                    alt="User"
                    className="rounded-full w-24 h-24 "
                  />
                </figure>
                <div className="  ">
                  <h2 className="text-xl">
                    <span className="font-bold"> Name:</span>{" "}
                    <span className="font-semibold ">
                      {" "}
                      {data?.data?.name.firstName}
                      {""}
                      {data?.data?.name?.middleName &&
                        ` ${data?.data?.name?.middleName}`}
                      {""}
                      {` ${data?.data?.name.lastName}`}
                    </span>
                  </h2>
                  <p className="">
                    <span className="font-bold ">Email:</span>{" "}
                    {data?.data?.email}
                  </p>
                  <p className="">
                    <span className="font-bold ">Mobile: </span>
                    {data?.data?.contactNo}
                  </p>
                  <p className="">
                    <span className="font-bold ">Address: </span>
                    {data?.data?.address}
                  </p>
                </div>
              </div>
            </div>
          )}
          {user?.role === "admin" && (
            <div className="flex justify-center my-10">
              <div className=" grid gap-4 w-96 md:w-[400px] p-5 justify-center rounded-md items-center  shadow-xl">
                <figure>
                  <img
                    src={
                      data?.data?.photo ||
                      "https://png.pngtree.com/png-vector/20190130/ourmid/pngtree-characters-enjoy-food-cartoon-characters-gourmet-hand-painted-character-cuisine-enjoy-png-image_606799.jpg"
                    }
                    alt="User"
                    className="rounded-full w-72 h-72"
                  />
                </figure>
                <div className="  ">
                  <h2 className="text-xl">
                    <span className="font-bold"> Name:</span>{" "}
                    <span className="font-semibold ">
                      {" "}
                      {data?.data?.name.firstName}
                      {""}
                      {data?.data?.name?.middleName &&
                        ` ${data?.data?.name?.middleName}`}
                      {""}
                      {` ${data?.data?.name.lastName}`}
                    </span>
                  </h2>
                  <p className="text-lg">
                    <span className="font-bold  ">Email:</span>{" "}
                    {data?.data?.email}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold ">Mobile: </span>
                    {data?.data?.contactNo}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold ">Address: </span>
                    {data?.data?.address}
                  </p>

                  <p className="text-lg">
                    <span className="font-bold ">Role: </span>
                    admin
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* profile update  */}
          {user?.role == "customer" && (
            <div>
              <div className="text-2xl my-5 font-bold text-orange-400 mx-4 text-center">
                Update Profile
              </div>
              <div className="container mx-auto">
                <CForm onFormSubmit={onFormSubmit}>
                  <CImageInput
                    setPreview={setPreview}
                    preview={preview}
                    name="photo"
                    label="Photo"
                    errorMsg={false}
                  ></CImageInput>
                  <CInput name="name.firstName" label="First Name"></CInput>
                  <CInput name="name.middleName" label="Middle Name"></CInput>
                  <CInput name="name.lastName" label="Last Name"></CInput>
                  <CInput name="address" label="Address"></CInput>
                  <CInput name="contactNo" label="Contact No"></CInput>
                  <CFormButton btnStyle="w-full" text="Update"></CFormButton>
                </CForm>
              </div>
            </div>
          )}
        </Effect>
      )}
    </div>
  );
};

export default UserProfile;
