import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { IMenuItem } from "../../interface/menuItem.interface";
import { useGetAllMenuQuery } from "../../Redux/api/menuApi/menuApi";

import PaginationUi from "../../components/common/pagination/PaginationUi";
import { useAppSelector } from "../../Redux/hooks";
import { useDispatch } from "react-redux";
import { filterMenuAvailable } from "../../Redux/feature/menuFiltterSlice/menuFilterSlice";
import { useDebounce } from "../../hook/useDebounce";
import { useGetAllCategoryQuery } from "../../Redux/api/categoryCuisineApi/categoryCuisineApi";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import SkeletonFoodCard from "../../components/SkeletonLoading/SkeletonFoodCard";
import CardAnimation from "../../components/FramerMotion/CardAnimation";
import { Effect } from "../../components/FramerMotion/Effect";

const FoodItem = () => {
  const { data: categories } = useGetAllCategoryQuery("");

  const dispatch = useDispatch();

  const menuAvailableTime = useAppSelector(
    (state) => state.menuFilter.menuAvailableTime
  );
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    sort: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 6,
    availableFor: menuAvailableTime || "",
  });

  const [searchValue, setSearchValue] = useState(filters.searchTerm);

  const { data: menuData, isLoading } = useGetAllMenuQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "availableFor") {
      dispatch(filterMenuAvailable(value));
    }

    if (name === "searchTerm") {
      setSearchValue(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value, page: 1 })); // Reset page to 1 on filter change
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  return (
    <>
      <>
        <ReactHelemt title=": All-Menu"></ReactHelemt>
        <SectionHeader text="Food Menu" />

        {/* Search and Filter Section */}
        <div className="flex mx-2 gap-2 flex-col sm:flex-row items-center my-5">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by title"
            value={searchValue}
            onChange={handleFilterChange}
            className="input input-sm input-bordered w-full sm:w-1/3 "
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="select select-sm select-bordered w-full sm:w-1/3 "
          >
            <option value="">Filter by Category</option>
            {categories?.map((category) => (
              <option value={category._id}>{category.category}</option>
            ))}
            {/* Add more categories as needed */}
          </select>
          <select
            name="availableFor"
            value={menuAvailableTime}
            onChange={handleFilterChange}
            className="select select-sm select-bordered w-full sm:w-1/3 "
          >
            <option value="">Filter by Available Time</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="select select-sm select-bordered w-full sm:w-1/3 "
          >
            <option value="">Sort by price</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>

        <div className="flex mx-2 mb-5">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="input input-sm input-bordered w-full sm:w-1/3 mr-2"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="input input-sm input-bordered w-full sm:w-1/3"
          />
        </div>

        {!isLoading ? (
          <Effect>
            <div className="min-h-[50vh]  ">
              <div className=" relative  grid grid-cols-1 4xl:grid-cols-2 5xl:grid-cols-3 6xl:gap-x-16 6xl:grid-cols-4 gap-x-2  gap-y-10 justify-items-center max-w-screen-2xl mx-auto ">
                {menuData?.data?.map((item: IMenuItem) => (
                  <CardAnimation>
                    {" "}
                    <FoodCard key={item._id} item={item} />
                  </CardAnimation>
                ))}

                {menuData?.data?.length === 0 && (
                  <p className="my-5 absolute text-xl font-bold text-orange-400 text-center">
                    No Data to Display
                  </p>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="grid justify-items-center   my-5">
              <PaginationUi
                currentPage={filters.page}
                totalPages={menuData?.meta?.totalPage || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </Effect>
        ) : (
          <Effect>
            {" "}
            <div className="min-h-[55vh]">
              <div className="relative  grid grid-cols-1 4xl:grid-cols-2 5xl:grid-cols-3 6xl:gap-x-16 6xl:grid-cols-4 gap-x-2  gap-y-10 justify-items-center max-w-screen-2xl mx-auto ">
                {" "}
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
                <SkeletonFoodCard></SkeletonFoodCard>
              </div>
            </div>
          </Effect>
        )}
      </>
    </>
  );
};

export default FoodItem;
