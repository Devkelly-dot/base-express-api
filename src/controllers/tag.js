const BaseController = require('./base'); 
const {CreateTagSerializer, TagGetSerializer, TagListSerializer} = require('../serializers/action/tag');
const TagOutputSerializer = require('../serializers/output/tag');

class GetPTagController extends BaseController {
    constructor(){
        super();
        this.model_name = 'tag';
        this.outputSerializer = TagOutputSerializer; 
        this.actionSerializer = TagGetSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ListTagController extends BaseController {
    constructor(){
        super();
        this.model_name = 'tag';
        this.outputSerializer = TagOutputSerializer; 
        this.actionSerializer = TagListSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class CreateTagController extends BaseController {
    constructor(){
        super();
        this.model_name = 'tag';
        this.outputSerializer = TagOutputSerializer; 
        this.actionSerializer = CreateTagSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

module.exports = {
    GetPTagController: GetPTagController,
    ListTagController: ListTagController,
    CreateTagController: CreateTagController
  };