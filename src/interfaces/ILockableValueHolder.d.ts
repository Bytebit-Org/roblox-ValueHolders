import { IReadonlyValueHolder } from "./IReadonlyValueHolder";

/**
 * Defines a lockable value holder
 */
export interface ILockableValueHolder<T> extends IReadonlyValueHolder<T> {
	/**
	 * Destroys the instance.
	 * Any further calls to methods on the instance will throw errors.
	 */
	destroy(): void;

	/**
	 * Checks whether the value holder is locked
	 */
	isLocked(): boolean;

	/**
	 * Tries to take the lock and returns a lock key object if successful, otherwise throws
	 * @returns The lock key object
	 * @throws Throws if taking the lock is unsuccessful
	 */
	mustTakeLock(): object;

	/**
	 * Releases the lock
	 * @param lockKey The lock key
	 * @throws Throws if not given the expected lock key
	 */
	releaseLock(lockKey: object): void;

	/**
	 * Changes the value and fires valueChanged if the new value is not equal to the current value
	 * @param newValue The new value
	 * @param lockKey The lock key, if any
	 * @throws Throws if not given the expected lock key while locked
	 */
	setValue(newValue: T, lockKey?: object): void;

	/**
	 * Tries to take the lock and returns a lock key object if successful, otherwise returns undefined
	 * @returns The lock key object if successful, otherwise undefined
	 */
	tryTakeLock(): object | undefined;

	/**
	 * Calls the provided function and changes the value if the returned value is not equal to the current value
	 * If the value is changed, then valueChanged is fired
	 * @param updateCallback A function that takes a current value and returns a new value
	 * @param lockKey The lock key, if any
	 * @throws Throws if not given the expected lock key while locked
	 */
	updateValue(updateCallback: (currentValue: T) => T, lockKey?: object): void;
}
