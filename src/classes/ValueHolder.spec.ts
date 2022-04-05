/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import { HttpService, LogService } from "@rbxts/services";
import { ValueHolder } from "./ValueHolder";

const DEFAULT_VALUE = HttpService.GenerateGUID();

export = () => {
	describe("destroy", () => {
		// other methods will test that they throw on a destroyed instance, so this should be fine
		it("should be idempotent and put a warning into the output upon the second call", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);
			valueHolder.destroy();

			let wasExpectedWarningOutputted = false;
			const messageOutConnection = LogService.MessageOut.Connect((message, messageType) => {
				if (messageType !== Enum.MessageType.MessageWarning) {
					return;
				}

				if (message.find(tostring(getmetatable(valueHolder))) === undefined) {
					return;
				}

				wasExpectedWarningOutputted = true;
				messageOutConnection.Disconnect();
			});

			valueHolder.destroy();

			task.wait(0.2);

			messageOutConnection.Disconnect();

			expect(wasExpectedWarningOutputted).to.equal(true);
		});
	});

	describe("getValue", () => {
		// this will be tested in most of the other methods, so just a couple small tests should suffice
		it("should throw if the instance is destroyed", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			valueHolder.destroy();

			expect(() => valueHolder.getValue()).to.throw();
		});

		it("should return the initial value for a newly created instance", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			expect(valueHolder.getValue()).to.equal(DEFAULT_VALUE);
		});
	});

	describe("setValue", () => {
		it("should throw if the instance is destroyed", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			valueHolder.destroy();

			expect(() => valueHolder.setValue("set value")).to.throw();
		});

		it("should make the value change to the given value and fire the signal with the expected values", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			valueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			valueHolder.setValue(newValue);

			expect(valueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should not fire the signal if the input value is the same as the current value", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			let didSignalFire = false;
			valueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			valueHolder.setValue(DEFAULT_VALUE);

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});
	});

	describe("updateValue", () => {
		it("should throw if the instance is destroyed", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			valueHolder.destroy();

			expect(() => valueHolder.updateValue(() => "updated value")).to.throw();
		});

		it("should pass the current value to the callback then make the value change to the returned value and fire the signal with the expected values", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			valueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			valueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return newValue;
			});

			expect(valueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should the current value to the callback then not fire the signal if the returned value is the same as the current value", () => {
			const valueHolder = ValueHolder.create(DEFAULT_VALUE);

			let didSignalFire = false;
			valueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			valueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return DEFAULT_VALUE;
			});

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});
	});
};
