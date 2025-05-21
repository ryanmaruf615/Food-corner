/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../components/common/modal/Modal";
import CForm from "../../components/Form/CForm";
import { CRating } from "../../components/Form/CRating";
import CTextArea from "../../components/Form/CTextArea";
import { FieldValues } from "react-hook-form";
import { useAddRatingUsMutation } from "../../Redux/api/ratingApi/ratingApi";
import { IApiResponse } from "../../Redux/interface/global.interface";
import { toast } from "sonner";

const Reviews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addRaringUs] = useAddRatingUsMutation();
  const onFormSubmit = async (data: FieldValues) => {
    const res = (await addRaringUs(data)) as IApiResponse<any>;
    if (res?.data?.success) {
      toast.success(res.data.message);
    }
  };
  return (
    <div>
      {" "}
      <div className="flex justify-center my-10  ">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm bg-orange-400 text-white hover:bg-orange-400"
        >
          Give Review
        </button>
      </div>
      <div className="modal">
        <Modal isOpen={isOpen}>
          <div>
            <p className="text-xl font-bold text-orange-400">
              Give Review About Us
            </p>
            <div>
              <CForm onFormSubmit={onFormSubmit}>
                <CRating></CRating>
                <CTextArea
                  errorMsg="Comment is required"
                  label="Comment"
                  name="comment"
                ></CTextArea>
                <div className="flex mt-4  justify-between items-center">
                  <button
                    type="submit"
                    className="btn bg-orange-400 text-white hover:bg-orange-400 duration-300 btn-sm  "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm bg-orange-400 text-white hover:bg-orange-400 duration-300 "
                    onClick={() => setIsOpen(false)}
                  >
                    close
                  </button>
                </div>
              </CForm>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;
