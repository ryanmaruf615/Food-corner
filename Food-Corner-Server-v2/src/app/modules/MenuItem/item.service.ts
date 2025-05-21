import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { IProduct } from "./item.interface";
import { Product } from "./item.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { preprocessQueries } from "../../utils/processedQueries";
import mongoose from "mongoose";

const createItemIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllItemFromDB = async (queries: Record<string, unknown>) => {
  const newQuery = preprocessQueries(queries);

  const menuItemQuery = new QueryBuilder(
    Product.find({ isDeleted: false }).populate("cuisine").populate("category"),
    newQuery
  )
    .search(["title", "description"])
    .filter()
    .priceRange()
    .sort()
    .paginate();

  const result = await menuItemQuery.modelQuery;

  const meta = await menuItemQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleItemFromDB = async (id: string) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The Product you are searching is not found."
    );
  }
  const isProductDeleted = await Product.isProductDeleted(id);
  if (isProductDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The Product you are searching is already deleted"
    );
  }

  // const result = await Product.findOne({ _id: id })
  //   .populate("cuisine")
  //   .populate("category");

  const result2 = await Product.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "ratings", // Lookup from the ratings collection
        localField: "_id", // Match product ID
        foreignField: "product", // Foreign field in the ratings collection
        as: "productFeedback", // Output as productFeedback
        pipeline: [
          {
            $lookup: {
              from: "customers", // Lookup from the customers collection
              localField: "customer", // Field in the ratings collection
              foreignField: "_id", // Match with customer ID in the customers collection
              as: "customer", // Overwrite the customer field
            },
          },
          {
            $unwind: "$customer", // Unwind to get individual customer object
          },
        ],
      },
    },
  ]);
  //console.log(JSON.stringify(result2), "ff");
  return result2[0];
};

const updateItemFromDB = async (id: string, data: Partial<IProduct>) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not found. Delete action failed."
    );
  }

  const { limitedStatus, ...remainData } = data;
  const modifiedData: Record<string, unknown> = { ...remainData };
  if (limitedStatus && Object.keys(limitedStatus).length) {
    for (const [key, value] of Object.entries(limitedStatus)) {
      modifiedData[`limitedStatus.${key}`] = value;
    }
  }

  const result = await Product.findOneAndUpdate({ _id: id }, modifiedData, {
    new: true,
  });
  return result;
};
const deleteItemFromDB = async (id: string) => {
  const isProductExist = await Product.isProductExist(id);
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not not found. Delete action failed."
    );
  }
  const isProductDeleted = await Product.isProductDeleted(id);
  if (isProductDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product already deleted");
  }
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const timeBasedItemFromDB = async () => {
  const currentTime = new Date().getHours();
  const availableTime = {
    breakfast: false,
    lunch: false,
    dinner: false,
  };
  let query = {};
  if (currentTime >= 7 && currentTime < 10) {
    query = { "availableFor.breakfast": true };
    availableTime.breakfast = true;
  } else if (currentTime >= 10 && currentTime < 16) {
    query = { "availableFor.lunch": true };
    availableTime.lunch = true;
  } else if (currentTime >= 16 && currentTime < 23) {
    query = { "availableFor.dinner": true };
    availableTime.dinner = true;
  } else {
    // 11pm to 7am, show any data
    query = {};
  }
  const result = await Product.find(query).limit(4);

  return { result, availableTime };
};

const ratingBasedItemFromDB = async () => {
  const result = await Product.find({
    "rating.averageRating": { $gte: 4.5 },
  })
    .sort({ "rating.averageRating": -1 })
    .limit(4);

  return result;
};

export const itemService = {
  createItemIntoDB,
  getAllItemFromDB,
  updateItemFromDB,
  deleteItemFromDB,
  getSingleItemFromDB,
  timeBasedItemFromDB,
  ratingBasedItemFromDB,
};
