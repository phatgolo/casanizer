import {Caser, Cases} from "./casanizer";
let caser: Caser;
let cased: Cases;

describe("Given an empty casinizer", () => {

	beforeEach(() => {
		caser = new Caser();
	});

	describe("When case is called without value", () => {
		beforeEach(() => {
			expect(() => {
				cased = caser.cases();
			}).not.toThrow();
		});

		it("Then it must return an object", () => {
			expect(cased).toBeDefined();
		});

		it("Then it must return the right properties", () => {
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

	describe(`When case is called with special characters`, () => {
		beforeEach(() => {
			cased = caser.cases("åäö,âüï");
		});

		it("Then it must convert them to basic latin", () => {
			expect(caser.toCamel()).toEqual("aaoAui");
		});
	});

	testAll("_foo_^$$__bar_");
	testAll("foo, bar, ");
	testAll("foo_:::_bar");
	testAll("foo.bar...");
});

describe("Given a Casinizer with value set to \"foo, bar, --\"", () => {
	beforeEach(() => {
		caser = new Caser("foo, bar, --");
	});
	testAll();
});

describe("Given a Casinizer with value set to \"foo, bar, \"", () => {
	beforeEach(() => {
		caser = new Caser("foo, bar, ");
	});

	describe("When implicit toString is called", () => {
		it("Then it must return foo, bar, ", () => {
			expect(caser + "").toEqual("foo, bar, ");
		});
	});
});

function testAll(testValue?: string) {
	describe(`When case is called with \"${testValue}\"`, () => {
		beforeEach(() => {
			cased = caser.cases(testValue);
		});

		it("Then it must return camelCase: fooBar", () => {
			expect(caser.toCamel()).toEqual("fooBar");
		});

		it("Then it must return dotCase: foo.bar", () => {
			expect(caser.toDot()).toEqual("foo.bar");
		});

		it("Then it must return kebabCase: foo-bar", () => {
			expect(caser.toKebab()).toEqual("foo-bar");
		});

		it("Then it must return pascalCase: FooBar", () => {
			expect(caser.toPascal()).toEqual("FooBar");
		});

		it("Then it must return snakeCase: foo_bar", () => {
			expect(caser.toSnake()).toEqual("foo_bar");
		});

		it("Then it must return path: foo\\bar", () => {
			expect(caser.toPath()).toEqual("foo\\bar");
		});

		it("Then it must return uri: foo/bar", () => {
			expect(caser.toUri()).toEqual("foo/bar");
		});

		it("Then it must return sentence: foo bar", () => {
			expect(caser.toSentence()).toEqual("foo bar");
		});

		it("Then it must return real sentence: Foo bar", () => {
			expect(caser.toRealSentence()).toEqual("Foo bar");
		});

		it("Then it must return words: ['foo', 'bar']", () => {
			expect(caser.toBasicLatinWords()).toEqual(["foo", "bar"]);
		});

		it("Then it must return all the right casings", () => {
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
