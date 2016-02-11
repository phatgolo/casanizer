var _ = require("lodash");

function Casanizer() {
    this.toCamel = function(name){
        return validateName(name, _.camelCase(name));
    }

    this.toKebab = function(name) {
        return validateName(name, _.kebabCase(name));
    }

    this.toSnake = function(name) {
        return validateName(name, _.snakeCase(name));
    }

    this.toPascal = function(name) {
        var camelName = validateName(name, this.toCamel(name));
        return this.toFirstUpper(camelName);
    }
    
    this.toFirstUpper = function(name) {
        return validateName(name, () => {
            return name[0].toUpperCase() + name.slice(1)
        });
    }

    this.toDot = function(name) {
        var kebabName = validateName(name, this.toKebab(name));
        return replaceAll(kebabName, "-", ".");
    }

    this.toPath = function(name) {
        var kebabName = validateName(name, this.toKebab(name));
        return replaceAll(kebabName, "-", "\\");
    }

    this.toUri = function(name) {
        var kebabName = validateName(name, this.toKebab(name));
        return replaceAll(kebabName, "-", "/");
    }

    this.toWords = function(name) {
        var kebabName = validateName(name, this.toKebab(name));
        return kebabName.split("-");
    }

    this.toSentence = function(name) {
        return validateName(name, this.toWords(name).join(" "));
    }

    this.toRealSentence = function(name) {
        return validateName(name, this.toFirstUpper(this.toSentence(name)));
    }

    this.case = function(name) {
        return {
            camel: this.toCamel(name),
            kebab: this.toKebab(name),
            snake: this.toSnake(name),
            pascal: this.toPascal(name),
            dot: this.toDot(name),
            path: this.toPath(name),
            uri: this.toUri(name),
            words: this.toWords(name),
            sentence: this.toSentence(name),
            realSentence: this.toRealSentence(name)
        }
    }

    function validateName(name, fn) {
        if (typeof name !== "string") {
            return "";
        } else {
            return fn.bind(this);
        }
    }

    function replaceAll(name, search, replacement) {
        return name.replace(new RegExp(search, 'g'), replacement)
    }
}

module.exports = new Casanizer();