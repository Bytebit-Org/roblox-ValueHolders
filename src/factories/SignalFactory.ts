import { AnyArgs, ISignal, Signal } from "@rbxts/signals-tooling";

/** @internal */
export class SignalFactory {
	public createInstance<T extends AnyArgs = () => void>(): ISignal<T> {
		return new Signal<T>();
	}
}
