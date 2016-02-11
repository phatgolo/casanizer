var _ = require("lodash");
var Caser = (function () {
    function Caser(value) {
        if (value === void 0) { value = ""; }
        this.value = value;
    }
    Caser.prototype.toCamel = function () {
        return _.camelCase(this.value);
    };
    ;
    Caser.prototype.toKebab = function () {
        return _.kebabCase(this.value);
    };
    ;
    Caser.prototype.toSnake = function () {
        return _.snakeCase(this.value);
    };
    ;
    Caser.prototype.toPascal = function () {
        return this.toFirstUpper(this.toCamel());
    };
    ;
    Caser.prototype.toDot = function () {
        return _.replace(this.toKebab(), "-", ".");
    };
    ;
    Caser.prototype.toPath = function () {
        return _.replace(this.toKebab(), "-", "\\");
    };
    ;
    Caser.prototype.toUri = function () {
        return _.replace(this.toKebab(), "-", "/");
    };
    ;
    Caser.prototype.toBasicLatinWords = function () {
        return this.toKebab().split("-");
    };
    ;
    Caser.prototype.toSentence = function () {
        return this.toBasicLatinWords().join(" ");
    };
    ;
    Caser.prototype.toRealSentence = function () {
        return this.toFirstUpper(this.toSentence());
    };
    ;
    Caser.prototype.toString = function () {
        return this.value;
    };
    Caser.prototype.cases = function (name) {
        if (!_.isUndefined(name)) {
            this.value = name;
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
    Caser.prototype.toFirstUpper = function (value) {
        if (_.isUndefined(value) || value.length < 2) {
            return "";
        }
        return value[0].toUpperCase() + value.slice(1).trim();
    };
    ;
    return Caser;
})();
exports.Caser = Caser;
