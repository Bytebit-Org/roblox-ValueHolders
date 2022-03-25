import { IReadonlyValueHolder } from "interfaces/IReadonlyValueHolder";

/**
 * Defines a writable value holder for a value of type T
 */
export interface IValueHolder<T> extends IReadonlyValueHolder<T> {
	/**
	 * Destroys the instance.
	 * Any further calls to methods on the instance will throw errors.
	 */
	destroy(): void;

	/**
	 * Changes the value and fires valueChanged if the new value is not equal to the current value
	 * @param newValue The new value
	 */
	setValue(newValue: T): void;

	/**
	 * Calls the provided function and changes the value if the returned value is not equal to the current value
	 * If the value is changed, then valueChanged is fired
	 * @param updateCallback A function that takes a current value and returns a new value
	 */
	updateValue(updateCallback: (currentValue: T) => T): void;
}
