/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { OrderTable } from "../../../../components/common/Order/OrderTable";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import { useUserAllOrdersQuery } from "../../../../Redux/api/orderApi/orderApi";
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import Modal from "../../../../components/common/modal/Modal";
import CForm from "../../../../components/Form/CForm";
import { FieldValues } from "react-hook-form";
import CSelect from "../../../../components/Form/CSelect";
import { CRating } from "../../../../components/Form/CRating";
import CTextArea from "../../../../components/Form/CTextArea";
import { useAddRatingMutation } from "../../../../Redux/api/ratingApi/ratingApi";
import { IApiResponse } from "../../../../Redux/interface/global.interface";
import { toast } from "sonner";
import ReactHelemt from "../../../../components/common/ReactHelmet/ReactHelemt";
import { Effect } from "../../../../components/FramerMotion/Effect";

const AllOrderbyUser = () => {
  const [addRating] = useAddRatingMutation();
  const [filterOptions, setFilterOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryOptions = {
    searchTerm,
    filters: filterOptions,
  };

  const { data, isLoading, isFetching } = useUserAllOrdersQuery(queryOptions, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const orders = data?.data || [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const [name, filterValue] = value.split(":");
    setFilterOptions((prev) => {
      const existingFilter = prev.find((filter) => filter.name === name);
      if (existingFilter) {
        return prev.map((filter) =>
          filter.name === name ? { ...filter, value: filterValue } : filter
        );
      } else {
        return [...prev, { name, value: filterValue }];
      }
    });
  };

  //modal data
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const openModal = (data: {
    menuData: { id: string; name: string }[];
    orderId: string;
  }) => {
    setOrderId(data.orderId);
    setItems(data.menuData);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const onFormSubmit = async (data: FieldValues) => {
    console.log({ ...data, orderId });
    const res = (await addRating({ ...data, orderId })) as IApiResponse<any>;
    if (res?.data?.success) {
      toast.success(res.data.message);
    }
  };
  console.log(items);
  return (
    <div>
      <ReactHelemt title=": All-Orders"></ReactHelemt>
      <SectionHeader text="Your Orders"></SectionHeader>
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <Effect>
          {" "}
          <div>
            <div className="flex h-7 gap-2 my-5 mx-2">
              <input
                type="text"
                placeholder="Search by Transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-sm input-bordered w-full max-w-xs"
              />
              <div className="flex space-x-4">
                <select
                  onChange={handleFilterChange}
                  className="select select-sm select-bordered w-full max-w-xs"
                >
                  <option value="">Filter by Order Status</option>
                  <option value="deliveryStatus:pending">Pending</option>
                  <option value="deliveryStatus:onGoing">Ongoing</option>
                  <option value="deliveryStatus:delivered">Delivered</option>
                </select>
              </div>
            </div>
            <OrderTable
              cheight={68}
              openModal={openModal}
              canReview={true}
              isFetching={isFetching}
              orders={orders!}
            ></OrderTable>
          </div>
        </Effect>
      )}
      <Modal isOpen={isModalOpen}>
        <div>
          <p className="text-xl font-bold text-orange-400">Give Review</p>
          <div>
            <CForm onFormSubmit={onFormSubmit}>
              <CSelect
                defaultOption="Select a item."
                name="product"
                label="Select menu"
                errorMsg="Please select a item"
                options={items?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></CSelect>
              <CRating></CRating>
              <CTextArea label="Comment" name="comment"></CTextArea>
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
                  onClick={closeModal}
                >
                  close
                </button>
              </div>
            </CForm>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllOrderbyUser;
