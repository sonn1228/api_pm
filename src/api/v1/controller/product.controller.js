import { successResponse, errorResponse } from "../../../helpers/response.js";
import paginationHelper from "../../../helpers/pagination.helper.js";
import Account from "../../../model/account.model.js";
import Product from "../../../model/product.model.js";

const controller = {
  getProducts: async (req, res) => {
    try {
      // Status filter
      const find = { deleted: false };
      if (req.query.status) {
        find.status = req.query.status;
      }

      // Sorting
      const sort = {};
      if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
      } else {
        sort.position = 'desc';
      }

      // Searching
      const objSearch = { keyword: '' };
      if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, 'i');
        find.title = regex;
        objSearch.keyword = req.query.keyword;
      }

      // Pagination
      const countItem = await Product.countDocuments(find);
      const objPagination = paginationHelper(req, countItem);

      // Fetch products
      const products = await Product.find(find)
        .limit(objPagination.limitItem)
        .skip(objPagination.skipItem)
        .sort(sort);

      for (const product of products) {
        const user = await Account.findOne({
          _id: product.createdBy.account_id,
        });
        if (user) {
          product.createdBy.fullName = user.fullName;
        }

        const updatedBy = product.updatedBy.slice(-1)[0];
        if (updatedBy) {
          const updater = await Account.findOne({
            _id: updatedBy.account_id,
          });
          updatedBy.fullName = updater.fullName;
        }
      }
      return successResponse(res, 200, "successfully", { products, objSearch, objPagination });
    } catch (error) {
      console.log('%cError: ', 'color: red;', error);
      return errorResponse(res, 500, "Internal server error");
    }
  },
  // [GET] /admin/products/:id
  detail: async (req, res) => {
    try {
      const find = { _id: req.params.id };
      const product = await Product.findOne(find);
      if (!product) {
        errorResponse(res, 404, "Not found");
      }
      return successResponse(res, 200, "successfully", { product });
    } catch (error) {
      return errorResponse(res, 500, "Internal server error");
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = await Product.deleteOne({ _id: id });
      console.log("deletedProduct: ", deletedProduct);

      if (deletedProduct.deletedCount > 0) {
        return successResponse(res, 200, "Product deleted successfully", { deletedProduct });
      } else {
        return errorResponse(res, 404, "Product not found");
      }
    } catch (error) {
      return errorResponse(res, 500, "Internal server error");
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = req.body;
      const newProduct = new Product({
        ...product,
      });
      await newProduct.save();
      return successResponse(res, 200, "Product created successfully", newProduct);
    } catch (error) {
      return errorResponse(res, 500, "Internal server error");
    }
  },

  patchProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const product = await Product.findById(id);

      if (product) {
        Object.assign(product, body);
        await product.save();
        res.json(product);
      } else {
        errorResponse(res, 404, "Product not found!"); // Use 404 for Not Found
      }
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  }
}

export default controller;