"use strict";
var Budget = (function () {
    function Budget(name, categories) {
        if (categories === void 0) { categories = []; }
        this.name = name;
        this.categories = categories;
    }
    return Budget;
}());
exports.Budget = Budget;
//# sourceMappingURL=budget.model.js.map