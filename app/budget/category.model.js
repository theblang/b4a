"use strict";
var Category = (function () {
    function Category(name, description, targetAmount) {
        if (description === void 0) { description = null; }
        if (targetAmount === void 0) { targetAmount = 0.0; }
        this.name = name;
        this.description = description;
        this.targetAmount = targetAmount;
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.model.js.map