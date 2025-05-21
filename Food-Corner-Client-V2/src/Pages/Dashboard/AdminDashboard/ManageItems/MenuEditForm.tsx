/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  useGetMenuDetailsQuery,
  useUpdateMenuMutation,
} from "../../../../Redux/api/menuApi/menuApi";
import { IAddItemForm } from "../../../../interface/formData.interface";
import { IApiResponse } from "../../../../Redux/interface/global.interface";
import { toast } from "sonner";
import CForm from "../../../../components/Form/CForm";
import CMultipleCheckBox from "../../../../components/Form/CMultipleCheckBox";
import CInputArray from "../../../../components/Form/CInputArray";
import CImageInput from "../../../../components/Form/CImageInput";
import CInputCheckBox from "../../../../components/Form/CInputCheckBox";
import CInputObject from "../../../../components/Form/CInputObject";

const MenuEditForm = ({
  id,
  isNeedToUpdate,
  setIsNeedToUpdate,
}: {
  id: string | null;
  setPId: (id: string | null) => void;
  isNeedToUpdate: {
    photo: boolean;
    availableTime: boolean;
    stockStatus: boolean;
    price: boolean;
    limitedStatus: boolean;
  };
  setIsNeedToUpdate: React.Dispatch<
    React.SetStateAction<{
      photo: boolean;
      availableTime: boolean;
      stockStatus: boolean;
      price: boolean;
      limitedStatus: boolean;
    }>
  >;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [updateMenu] = useUpdateMenuMutation();
  const { data: menuDetails, isFetching } = useGetMenuDetailsQuery(
    { id: id! },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  const onFormSubmit = async (data: Partial<IAddItemForm>) => {
    let sanitizedData = {};

    // Check which fields are set to true in isNeedToUpdate
    if (isNeedToUpdate.photo && data.photo && data.photo.length > 0) {
      sanitizedData = { ...sanitizedData, photo: data.photo };
    }
    if (isNeedToUpdate.price && data.price) {
      sanitizedData = {
        ...sanitizedData,
        price: data.price.map((list) => ({
          price: Number(list.price),
          size: list.size,
        })),
      };
    }
    if (isNeedToUpdate.availableTime && data.availableFor) {
      sanitizedData = { ...sanitizedData, availableFor: data.availableFor };
    }
    if (isNeedToUpdate.stockStatus && data.inStock !== undefined) {
      sanitizedData = { ...sanitizedData, inStock: data.inStock };
    }
    if (
      isNeedToUpdate.limitedStatus &&
      data.limitedStatus?.quantity !== undefined
    ) {
      sanitizedData = {
        ...sanitizedData,
        limitedStatus: { quantity: Number(data.limitedStatus?.quantity) },
      };
    }

    if (Object.keys(sanitizedData).length == 0) {
      toast.error("Select at least one field.");
    } else {
      if (id) {
        const res = (await updateMenu({
          id: id!,
          data: sanitizedData,
        })) as IApiResponse<any>;
        if (res.data?.success) {
          toast.success(res.data.message);
        }
        setPreview(null);
        setIsNeedToUpdate({
          photo: false,
          availableTime: false,
          stockStatus: false,
          price: false,
          limitedStatus: false,
        });
      } else {
        toast.error("Id not found. Reload the page");
      }
    }
  };

  const handleCheckboxChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsNeedToUpdate((prevState) => ({
        ...prevState,
        [field]: event.target.checked,
      }));
    };

  return (
    <div className="w-full">
      <div className="mt-3">
        <p className="mb-2 font-semibold">Select Field to Update</p>
        {!isFetching && (
          <div className="grid grid-cols-2   gap-2 ">
            <div className=" flex items-center gap-2">
              <input
                checked={isNeedToUpdate.price}
                onChange={handleCheckboxChange("price")}
                className="checkbox checkbox-warning checkbox-sm"
                type="checkbox"
              />
              <p>Price</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                checked={isNeedToUpdate.availableTime}
                onChange={handleCheckboxChange("availableTime")}
                className="checkbox checkbox-warning checkbox-sm"
                type="checkbox"
              />
              <p>Available Time</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                checked={isNeedToUpdate.photo}
                onChange={handleCheckboxChange("photo")}
                className="checkbox checkbox-warning checkbox-sm"
                type="checkbox"
              />{" "}
              <p>Photo</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                checked={isNeedToUpdate.stockStatus}
                onChange={handleCheckboxChange("stockStatus")}
                className="checkbox checkbox-warning checkbox-sm"
                type="checkbox"
              />{" "}
              <p>Stock Status</p>
            </div>
            {menuDetails?.limitedStatus.isLimited && (
              <div className=" flex items-center gap-2">
                <input
                  checked={isNeedToUpdate.limitedStatus}
                  onChange={handleCheckboxChange("limitedStatus")}
                  className="checkbox checkbox-warning checkbox-sm"
                  type="checkbox"
                />{" "}
                <p>Quantity</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container mx-auto px-2 mt-5">
        {menuDetails && !isFetching ? (
          <>
            <CForm
              onFormSubmit={onFormSubmit}
              defaultValues={{
                availableFor: menuDetails?.availableFor,
                price: menuDetails.price,
                inStock: menuDetails.inStock,
                ...(menuDetails.limitedStatus.isLimited == true && {
                  limitedStatus: {
                    quantity: menuDetails.limitedStatus.quantity,
                  },
                }),
              }}
            >
              {isNeedToUpdate.availableTime && (
                <div>
                  <label className="label">
                    <span className={`label-text font-semibold `}>
                      {"Available For"}
                    </span>
                  </label>
                  <CMultipleCheckBox
                    options={["breakfast", "dinner", "lunch"]}
                    name="availableFor"
                  ></CMultipleCheckBox>
                </div>
              )}
              {isNeedToUpdate.price && (
                <CInputArray
                  labelStyle="font-semibold"
                  name="price"
                  options={[
                    { name: "price", type: "number" },
                    { name: "size", type: "text" },
                  ]}
                ></CInputArray>
              )}
              {isNeedToUpdate.photo && (
                <CImageInput
                  labelStyle="font-semibold"
                  preview={preview}
                  setPreview={setPreview}
                  name="photo"
                  label="Photo"
                ></CImageInput>
              )}
              {isNeedToUpdate.stockStatus && (
                <div className="mt-3  gap-2">
                  <p className="label-text font-semibold">Stock Status</p>
                  <CInputCheckBox
                    status="In Stock"
                    name="inStock"
                  ></CInputCheckBox>
                </div>
              )}
              {menuDetails.limitedStatus.isLimited &&
                isNeedToUpdate.limitedStatus && (
                  <CInputObject
                    option="quantity"
                    labelStyle="font-semibold"
                    label="Quantity"
                    errorMsg="Quantity is required"
                    type="number"
                    name="limitedStatus"
                    placeholder="Menu Quantity"
                  ></CInputObject>
                )}
              <button
                className="btn my-4 btn-sm border-none hover:bg-orange-400 w-full text-white bg-orange-400"
                type="submit"
              >
                Update
              </button>
            </CForm>
          </>
        ) : (
          <p className="text-center bg-orange-400 rounded-lg py-1 text-white font-semibold ">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuEditForm;
