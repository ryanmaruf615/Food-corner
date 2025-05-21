/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEdit } from "react-icons/fa";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import {
  useGetAllCategoryQuery,
  useGetAllCuisineQuery,
  useUpdateCategoryMutation,
  useUpdateCuisineMutation,
} from "../../../../Redux/api/categoryCuisineApi/categoryCuisineApi";
import Modal from "../../../../components/common/modal/Modal";
import { useState } from "react";
import CForm from "../../../../components/Form/CForm";
import CInput from "../../../../components/Form/CInput";
import { CFormButton } from "../../../../components/Form/CFormButton";
import { FieldValues } from "react-hook-form";
import { IApiResponse } from "../../../../Redux/interface/global.interface";
import { toast } from "sonner";
import ReactHelemt from "../../../../components/common/ReactHelmet/ReactHelemt";
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import { Effect } from "../../../../components/FramerMotion/Effect";

export const ManageCuisineCategory = () => {
  const { data: categories, isLoading: isLoading2 } =
    useGetAllCategoryQuery("");
  const { data: cuisines, isLoading } = useGetAllCuisineQuery("");
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateCuisine] = useUpdateCuisineMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [names, setNames] = useState("");

  const openModal = (data: { name: string; id: string }) => {
    setModalOpen(true);
    setId(data.id);
    setNames(data.name);
  };
  const closeModal = () => setModalOpen(false);

  const onFormSubmit = async (data: FieldValues) => {
    console.log(data);
    console.log(id, names);
    if (names === "category") {
      const res = (await updateCategory({
        id: id,
        data: data.name,
      })) as IApiResponse<any>;
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    }
    if (names === "cuisine") {
      const res = (await updateCuisine({
        id: id,
        data: data.name,
      })) as IApiResponse<any>;
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    }
  };

  return (
    <div>
      <ReactHelemt title=": Edit-Category/cuisine"></ReactHelemt>
      <SectionHeader text="Manage Category/Cuisine"></SectionHeader>
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : isLoading2 ? (
        <LoadingUi></LoadingUi>
      ) : (
        <>
          {" "}
          <Effect>
            {" "}
            <div className=" grid sm:grid-cols-2 gap-5 my-10 px-2">
              <div className=" ">
                <p className="text-3xl font-bold mb-5">Categorise</p>
                <div className="grid gap-3 ">
                  {categories?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="flex  justify-between gap-20 border px-5 py-2 rounded-lg"
                      >
                        <p>{item.category}</p>

                        <button
                          onClick={() =>
                            openModal({ id: item._id, name: "category" })
                          }
                          className="text-green-500 mt-1 hover:scale-105 duration-300 active:scale-95"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/*  */}
              <div>
                <p className="text-3xl font-bold mb-5 ">Cuisine</p>
                <div className="grid gap-3">
                  {cuisines?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="flex justify-between gap-20 border px-5 py-2 rounded-lg"
                      >
                        <p>{item.cuisine}</p>

                        <button
                          onClick={() =>
                            openModal({ id: item._id, name: "cuisine" })
                          }
                          className="text-green-500 mt-1 hover:scale-105 duration-300 active:scale-95"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Modal isOpen={isModalOpen}>
              <CForm onFormSubmit={onFormSubmit}>
                <CInput
                  placeholder="Add Category Name"
                  name="name"
                  label="Rename"
                  errorMsg="This field is requierd"
                ></CInput>
                <CFormButton btnStyle="w-56" text="Update"></CFormButton>
              </CForm>
              <div className="flex justify-end">
                <button className="btn btn-sm " onClick={closeModal}>
                  Close
                </button>
              </div>
            </Modal>
          </Effect>
        </>
      )}
    </div>
  );
};
