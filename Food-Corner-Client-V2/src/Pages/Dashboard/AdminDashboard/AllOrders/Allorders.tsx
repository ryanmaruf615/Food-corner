import { useState } from "react";
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import { OrderTable } from "../../../../components/common/Order/OrderTable";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import { useGetAllUserOrdersQuery } from "../../../../Redux/api/orderApi/orderApi";
import ReactHelemt from "../../../../components/common/ReactHelmet/ReactHelemt";
import { Effect } from "../../../../components/FramerMotion/Effect";

const Allorders = () => {
  const [filterOptions, setFilterOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryOptions = {
    searchTerm,
    filters: filterOptions,
  };

  const { data, isLoading, isFetching } =
    useGetAllUserOrdersQuery(queryOptions);
  const orderData = data?.data || [];
  console.log(data);
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

  return (
    <div>
      <ReactHelemt title=": All-Orders"></ReactHelemt>
      <SectionHeader text="All users order"></SectionHeader>
      <div>
        <div className="flex gap-2 my-5 mx-2">
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
              <option value="deliveryStatus:">All Orders</option>
              <option value="deliveryStatus:pending">Pending</option>

              <option value="deliveryStatus:onGoing">Ongoing</option>
              <option value="deliveryStatus:delivered">Delivered</option>
              {/* Add more filters as needed */}
            </select>
          </div>
        </div>

        {isLoading ? (
          <LoadingUi />
        ) : (
          <Effect>
            {" "}
            <OrderTable
              cheight={68}
              isFetching={isFetching}
              orders={orderData}
            />
          </Effect>
        )}
      </div>
    </div>
  );
};

export default Allorders;
