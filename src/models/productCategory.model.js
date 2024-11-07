import slug from 'mongoose-slug-updater';
import mongoose from 'mongoose';

mongoose.plugin(slug);

const { Schema } = mongoose;
const productCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parent_id: {
      type: String,
      default: '',
    },
    description: String,
    thumbnail: String,
    status: {
      type: String,
      default: 'active',
    },
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category');

export default ProductCategory;

/**
 * createdAt: timestamps
 * updatedAt: timestamps  
 * deletedAt
 * 
 * deleted
 * slug
 */
