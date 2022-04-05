import { IValueHolder } from "../interfaces/IValueHolder";
import { Bin } from "@rbxts/bin";
import { ISignal } from "@rbxts/signals-tooling";
import { BinFactory } from "../factories/BinFactory";
import { SignalFactory } from "../factories/SignalFactory";
import { assertNotDestroyed, warnAlreadyDestroyed } from "@rbxts/destroyed-instance-logging";

/**
 * Standard implementation of IValueHolder
 */
export class ValueHolder<T> implements IValueHolder<T> {
	public readonly valueChanged: ISignal<(newValue: T, oldValue: T) => void>;

	private readonly bin: Bin;
	private currentValue: T;
	private isDestroyed = false;

	private constructor(binFactory: BinFactory, initialValue: T, signalFactory: SignalFactory) {
		this.bin = binFactory.createInstance();
		this.currentValue = initialValue;

		this.valueChanged = this.bin.add(signalFactory.createInstance());
	}

	public static create<T>(this: void, initialValue: T): IValueHolder<T> {
		return new ValueHolder(new BinFactory(), initialValue, new SignalFactory());
	}

	public destroy() {
		if (this.isDestroyed) {
			warnAlreadyDestroyed(this);
			return;
		}

		this.bin.destroy();
		this.isDestroyed = true;
	}

	public getValue() {
		assertNotDestroyed(this.isDestroyed, this);

		return this.currentValue;
	}

	public setValue(newValue: T) {
		assertNotDestroyed(this.isDestroyed, this);

		if (newValue === this.currentValue) {
			return;
		}

		const oldValue = this.currentValue;
		this.currentValue = newValue;

		this.valueChanged.fire(newValue, oldValue);
	}

	public updateValue(updateCallback: (currentValue: T) => T) {
		assertNotDestroyed(this.isDestroyed, this);

		const newValue = updateCallback(this.currentValue);
		this.setValue(newValue);
	}
}
