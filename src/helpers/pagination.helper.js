export const calculatePagination = async (model, filter, page, limit) => {
    const totalItems = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    return {
        currentPage: page,
        limit: limit,
        totalPages: totalPages,
        totalItems: totalItems,
        skip: skip,
    };
};
