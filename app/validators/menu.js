const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

class MenuValidator extends LinValidator {
    constructor() {
        super()
        this.name = [new Rule("isLength", "菜单名字不能为空", {min: 1})]
        this.key = [new Rule("isLength", "菜单关键字不能为空", {min: 1})]
    }
}

class PositiveIdParamsValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '菜单ID需要正整数', {min: 1})
        ]
    }
}

module.exports = {
    MenuValidator,
    PositiveIdParamsValidator
}
