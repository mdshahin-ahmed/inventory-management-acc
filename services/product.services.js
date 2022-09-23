const Product = require("../models/Product");

exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, products, page };
};

exports.createProductServices = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.bulkUpdateProductByIdService = async (prodictId, data) => {
  const result = await Product.updateOne(
    { _id: prodictId },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  // const product = await Product.findById(prodictId);
  // const result = await product.set(data).save();

  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  console.log(result);
  return result;
};

exports.deleteProdectByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductByIdService = async (data) => {
  const result = await Product.deleteMany({ _id: data.ids });
  return result;
};
