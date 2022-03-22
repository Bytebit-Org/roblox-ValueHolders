import { Bin } from "@rbxts/bin";
import { assertNotDestroyed, warnAlreadyDestroyed } from "@rbxts/destroyed-instance-logging";
import { IReadOnlySignal } from "@rbxts/signals-tooling";
import { BinFactory } from "factories/BinFactory";
import { ValueHolderFactory } from "factories/ValueHolderFactory";
import { ILockableValueHolder } from "interfaces/ILockableValueHolder";
import { IValueHolder } from "interfaces/IValueHolder";

/**
 * Standard implementation of ILockableValueHolder
 */
export class LockableValueHolder<T> implements ILockableValueHolder<T> {
	public readonly valueChanged: IReadOnlySignal<(newValue: T, oldValue: T) => void>;

	private bin: Bin;
	private currentLockKey: object | undefined;
	private readonly internalValueHolder: IValueHolder<T>;
	private isDestroyed = false;

	private constructor(binFactory: BinFactory, initialValue: T, valueHolderFactory: ValueHolderFactory) {
		this.bin = binFactory.createInstance();
		this.internalValueHolder = this.bin.add(valueHolderFactory.createInstance(initialValue));
		this.valueChanged = this.internalValueHolder.valueChanged;
	}

	public static create<T>(this: void, initialValue: T): ILockableValueHolder<T> {
		return new LockableValueHolder(new BinFactory(), initialValue, new ValueHolderFactory());
	}

	public destroy() {
		if (this.isDestroyed) {
			warnAlreadyDestroyed(this);
			return;
		}

		this.isDestroyed = true;
	}

	public getValue() {
		assertNotDestroyed(this.isDestroyed, this);

		return this.internalValueHolder.getValue();
	}

	public isLocked(): boolean {
		assertNotDestroyed(this.isDestroyed, this);

		return this.currentLockKey !== undefined;
	}

	public mustTakeLock(): object {
		assertNotDestroyed(this.isDestroyed, this);

		if (this.currentLockKey !== undefined) {
			throw `Lock is already taken`;
		}

		this.currentLockKey = {};
		return this.currentLockKey;
	}

	public releaseLock(lockKey: object): void {
		assertNotDestroyed(this.isDestroyed, this);

		if (lockKey !== this.currentLockKey) {
			throw `Attempt to unlock without matching key`;
		}

		this.currentLockKey = undefined;
	}

	public setValue(newValue: T, lockKey?: object) {
		assertNotDestroyed(this.isDestroyed, this);

		if (this.currentLockKey !== undefined && lockKey !== this.currentLockKey) {
			throw `Attempt to write to a locked value holder`;
		}

		this.internalValueHolder.setValue(newValue);
	}

	public tryTakeLock(): object | undefined {
		assertNotDestroyed(this.isDestroyed, this);

		if (this.currentLockKey !== undefined) {
			return undefined;
		}

		this.currentLockKey = {};
		return this.currentLockKey;
	}

	public updateValue(updateCallback: (currentValue: T) => T, lockKey?: object) {
		assertNotDestroyed(this.isDestroyed, this);

		if (this.currentLockKey !== undefined && lockKey !== this.currentLockKey) {
			throw `Attempt to write to a locked value holder`;
		}

		this.internalValueHolder.updateValue(updateCallback);
	}
}
