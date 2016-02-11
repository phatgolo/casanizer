var _ = require("lodash");
var Casanizer = (function () {
    function Casanizer(name) {
        if (name === void 0) { name = ""; }
        this.name = name;
    }
    Casanizer.prototype.toCamel = function () {
        return _.camelCase(this.name);
    };
    ;
    Casanizer.prototype.toKebab = function () {
        return _.kebabCase(this.name);
    };
    ;
    Casanizer.prototype.toSnake = function () {
        return _.snakeCase(this.name);
    };
    ;
    Casanizer.prototype.toPascal = function () {
        return this.toFirstUpper(this.toCamel());
    };
    ;
    Casanizer.prototype.toDot = function () {
        return _.replace(this.toKebab(), "-", ".");
    };
    ;
    Casanizer.prototype.toPath = function () {
        return _.replace(this.toKebab(), "-", "\\");
    };
    ;
    Casanizer.prototype.toUri = function () {
        return _.replace(this.toKebab(), "-", "/");
    };
    ;
    Casanizer.prototype.toBasicLatinWords = function () {
        return this.toKebab().split("-");
    };
    ;
    Casanizer.prototype.toSentence = function () {
        return this.toBasicLatinWords().join(" ");
    };
    ;
    Casanizer.prototype.toRealSentence = function () {
        return this.toFirstUpper(this.toSentence());
    };
    ;
    Casanizer.prototype.case = function (name) {
        if (!_.isUndefined(name)) {
            this.name = name;
        }
        return {
            camel: this.toCamel(),
            dot: this.toDot(),
            kebab: this.toKebab(),
            pascal: this.toPascal(),
            path: this.toPath(),
            realSentence: this.toRealSentence(),
            sentence: this.toSentence(),
            snake: this.toSnake(),
            uri: this.toUri(),
            words: this.toBasicLatinWords(),
        };
    };
    ;
    Casanizer.prototype.toFirstUpper = function (name) {
        if (_.isUndefined(name) || name.length < 2) {
            return "";
        }
        return name[0].toUpperCase() + name.slice(1).trim();
    };
    ;
    return Casanizer;
})();
exports.Casanizer = Casanizer;
