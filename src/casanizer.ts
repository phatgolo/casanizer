import * as _ from "lodash";

export interface Cases {
	camel: string;
	dot: string;
	kebab: string;
	pascal: string;
	path: string;
	realSentence: string;
	sentence: string;
	snake: string;
	uri: string;
	words: string[];
}

export class Caser {
	constructor(private value = "") { }

	toCamel() {
		return _.camelCase(this.value);
	};

	toKebab() {
		return _.kebabCase(this.value);
	};

	toSnake() {
		return _.snakeCase(this.value);
	};

	toPascal() {
		return this.toFirstUpper(this.toCamel());
	};

	toDot() {
		return _.replace(this.toKebab(), "-", ".");
	};

	toPath() {
		return _.replace(this.toKebab(), "-", "\\");
	};

	toUri() {
		return _.replace(this.toKebab(), "-", "/");
	};

	toBasicLatinWords() {
		return this.toKebab().split("-");
	};

	toSentence() {
		return this.toBasicLatinWords().join(" ");
	};

	toRealSentence() {
		return this.toFirstUpper(this.toSentence());
	};

	toString() {
		return this.value;
	}

	cases(name?: string): Cases {
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

	private toFirstUpper(value: string) {
		if (_.isUndefined(value) || value.length < 2) {
			return "";
		}
		return value[0].toUpperCase() + value.slice(1).trim();
	};
}