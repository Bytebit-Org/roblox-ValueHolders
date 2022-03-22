import { ValueHolder } from "classes/ValueHolder";

/** @internal */
export class ValueHolderFactory {
	public createInstance<T>(initialValue: T) {
		return ValueHolder.create(initialValue);
	}
}
