var casanizer_1 = require("./casanizer");
var caser;
var cased;
describe("Given an empty casinizer", function () {
    beforeEach(function () {
        caser = new casanizer_1.Caser();
    });
    describe("When case is called without value", function () {
        beforeEach(function () {
            expect(function () {
                cased = caser.cases();
            }).not.toThrow();
        });
        it("Then it must return an object", function () {
            expect(cased).toBeDefined();
        });
        it("Then it must return the right properties", function () {
            expect(typeof cased.camel).toBe("string");
            expect(typeof cased.kebab).toBe("string");
            expect(typeof cased.snake).toBe("string");
            expect(typeof cased.pascal).toBe("string");
            expect(typeof cased.dot).toBe("string");
            expect(typeof cased.path).toBe("string");
            expect(typeof cased.uri).toBe("string");
            expect(typeof cased.words).toBe("object");
            expect(typeof cased.sentence).toBe("string");
            expect(typeof cased.realSentence).toBe("string");
        });
    });
    describe("When case is called with special characters", function () {
        beforeEach(function () {
            cased = caser.cases("åäö,âüï");
        });
        it("Then it must convert them to basic latin", function () {
            expect(caser.toCamel()).toEqual("aaoAui");
        });
    });
    testAll("_foo_^$$__bar_");
    testAll("foo, bar, ");
    testAll("foo_:::_bar");
    testAll("foo.bar...");
});
describe("Given a Casinizer with value set to \"foo, bar, --\"", function () {
    beforeEach(function () {
        caser = new casanizer_1.Caser("foo, bar, --");
    });
    testAll();
});
describe("Given a Casinizer with value set to \"foo, bar, \"", function () {
    beforeEach(function () {
        caser = new casanizer_1.Caser("foo, bar, ");
    });
    describe("When implicit toString is called", function () {
        it("Then it must return foo, bar, ", function () {
            expect(caser + "").toEqual("foo, bar, ");
        });
    });
});
function testAll(testValue) {
    describe("When case is called with \"" + testValue + "\"", function () {
        beforeEach(function () {
            cased = caser.cases(testValue);
        });
        it("Then it must return camelCase: fooBar", function () {
            expect(caser.toCamel()).toEqual("fooBar");
        });
        it("Then it must return dotCase: foo.bar", function () {
            expect(caser.toDot()).toEqual("foo.bar");
        });
        it("Then it must return kebabCase: foo-bar", function () {
            expect(caser.toKebab()).toEqual("foo-bar");
        });
        it("Then it must return pascalCase: FooBar", function () {
            expect(caser.toPascal()).toEqual("FooBar");
        });
        it("Then it must return snakeCase: foo_bar", function () {
            expect(caser.toSnake()).toEqual("foo_bar");
        });
        it("Then it must return path: foo\\bar", function () {
            expect(caser.toPath()).toEqual("foo\\bar");
        });
        it("Then it must return uri: foo/bar", function () {
            expect(caser.toUri()).toEqual("foo/bar");
        });
        it("Then it must return sentence: foo bar", function () {
            expect(caser.toSentence()).toEqual("foo bar");
        });
        it("Then it must return real sentence: Foo bar", function () {
            expect(caser.toRealSentence()).toEqual("Foo bar");
        });
        it("Then it must return words: ['foo', 'bar']", function () {
            expect(caser.toBasicLatinWords()).toEqual(["foo", "bar"]);
        });
        it("Then it must return all the right casings", function () {
            expect(cased.camel).toEqual("fooBar");
            expect(cased.kebab).toEqual("foo-bar");
            expect(cased.snake).toEqual("foo_bar");
            expect(cased.pascal).toEqual("FooBar");
            expect(cased.dot).toEqual("foo.bar");
            expect(cased.path).toEqual("foo\\bar");
            expect(cased.uri).toEqual("foo/bar");
            expect(cased.sentence).toEqual("foo bar");
            expect(cased.realSentence).toEqual("Foo bar");
        });
    });
}
