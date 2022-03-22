import { IDestroyable } from "@rbxts/dumpster";
import { IReadOnlySignal } from "@rbxts/signals-tooling";

/**
 * Defines a readonly value manager for a value of type T
 */
export interface IReadonlyValueHolder<T> extends IDestroyable {
	/**
	 * Fired when the value is changed
	 */
	readonly valueChanged: IReadOnlySignal<(newValue: T, oldValue: T) => void>;

	/**
	 * Gets the current value
	 */
	getValue(): T;
}
