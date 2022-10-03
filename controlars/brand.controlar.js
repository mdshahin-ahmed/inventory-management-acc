const {
  createBrandService,
  getBrandsService,
  getBrandByService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};
exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService(req.body);

    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brand",
    });
  }
};
exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getBrandByService(id);
    if (!brand) {
      res.status(400).json({
        status: "fail",
        error: "couldn't find with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brand",
    });
  }
};
exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateBrandService(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        status: "fail",
        error: "couldn't update the brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "successfully updated the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the brand",
    });
  }
};
