async function getModelByField(Model, field, value) {
    const query = {};
    query[field] = value;
    const item = await Model.findOne(query);
    return item;
}
  
async function getModelsByField(Model, field, values) {
  const query = {};
  query[field] = { $in: values };
  const items = await Model.find(query);
  return items;
}

module.exports = {
    getModelByField: getModelByField,
    getModelsByField: getModelsByField
};