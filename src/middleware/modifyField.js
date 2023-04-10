async function modifyField(req, res, next, original_field, new_field = null, mod_function) {
    const original_value = req.body[original_field];
    const new_value = mod_function(original_value);

    if(new_field===null) {
        req.body[original_field] = new_value;
    } else {
        req.body[new_field] = new_value;
    }

    next();
} 

async function full_cleanup(req, res, next, original_field, new_field=null)
{
    await modifyField(req, res, next, original_field, new_field, (ov)=>{
        return ov.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    });
}

module.exports = {
    modifyField,
    full_cleanup
};