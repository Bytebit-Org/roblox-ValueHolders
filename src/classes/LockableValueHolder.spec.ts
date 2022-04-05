/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import { HttpService, LogService } from "@rbxts/services";
import { LockableValueHolder } from "./LockableValueHolder";

const DEFAULT_VALUE = HttpService.GenerateGUID();

export = () => {
	describe("destroy", () => {
		// other methods will test that they throw on a destroyed instance, so this should be fine
		it("should be idempotent and put a warning into the output upon the second call", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);
			lockableValueHolder.destroy();

			let wasExpectedWarningOutputted = false;
			const messageOutConnection = LogService.MessageOut.Connect((message, messageType) => {
				if (messageType !== Enum.MessageType.MessageWarning) {
					return;
				}

				if (message.find(tostring(getmetatable(lockableValueHolder))) === undefined) {
					return;
				}

				wasExpectedWarningOutputted = true;
			});

			lockableValueHolder.destroy();

			task.wait(0.2);

			messageOutConnection.Disconnect();

			expect(wasExpectedWarningOutputted).to.equal(true);
		});
	});

	describe("getValue", () => {
		// this will be tested in most of the other methods, so just a couple small tests should suffice
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.getValue()).to.throw();
		});

		it("should return the initial value for a newly created instance, even while locked", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			expect(lockableValueHolder.getValue()).to.equal(DEFAULT_VALUE);

			lockableValueHolder.mustTakeLock();

			expect(lockableValueHolder.getValue()).to.equal(DEFAULT_VALUE);
		});
	});

	describe("isLocked", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.isLocked()).to.throw();
		});

		it("should return false for a newly created instance", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			expect(lockableValueHolder.isLocked()).to.equal(false);
		});

		it("should return true after the lock is taken and false after it is released", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();
			expect(lockableValueHolder.isLocked()).to.equal(true);

			lockableValueHolder.releaseLock(lockKey);
			expect(lockableValueHolder.isLocked()).to.equal(false);
		});
	});

	describe("mustTakeLock", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.mustTakeLock()).to.throw();
		});

		it("should return a lock key that can be used to unlock the instance if it was not locked already", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();
			lockableValueHolder.releaseLock(lockKey);
		});

		it("should throw if the instance is locked already", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			// if the lock is taken via tryTakeLock
			let lockKey = lockableValueHolder.tryTakeLock();
			assert(lockKey !== undefined, "Expected lockKey to not be nil");
			expect(() => lockableValueHolder.mustTakeLock()).to.throw();
			lockableValueHolder.releaseLock(lockKey);

			// if lock is taken via mustTakeLock
			lockKey = lockableValueHolder.mustTakeLock();
			expect(() => lockableValueHolder.mustTakeLock()).to.throw();
			lockableValueHolder.releaseLock(lockKey);
		});

		it("should return a different lock key that can be used to unlock the instance after it has been unlocked before", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			let previousLockKey: object | undefined;
			for (let i = 0; i < 10; i++) {
				const lockKey = lockableValueHolder.mustTakeLock();
				expect(lockKey).to.never.equal(previousLockKey);

				lockableValueHolder.releaseLock(lockKey);
				previousLockKey = lockKey;
			}
		});
	});

	describe("releaseLock", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.releaseLock(lockKey)).to.throw();
		});

		it("should throw if not locked", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);
			expect(() => lockableValueHolder.releaseLock({})).to.throw();
		});

		it("should throw if given the wrong lock", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.mustTakeLock();
			expect(() => lockableValueHolder.releaseLock({})).to.throw();
		});

		it("should throw if given the same lock key twice", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();
			lockableValueHolder.releaseLock(lockKey);
			expect(() => lockableValueHolder.releaseLock(lockKey)).to.throw();
		});
	});

	describe("setValue", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.setValue("set value")).to.throw();
		});

		it("should make the value change to the given value and fire the signal with the expected values", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			lockableValueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			lockableValueHolder.setValue(newValue);

			expect(lockableValueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should not fire the signal if the input value is the same as the current value", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			let didSignalFire = false;
			lockableValueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			lockableValueHolder.setValue(DEFAULT_VALUE);

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});

		it("should throw if not given the correct lock key", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.mustTakeLock();

			expect(() => lockableValueHolder.setValue(HttpService.GenerateGUID())).to.throw();
			expect(() => lockableValueHolder.setValue(HttpService.GenerateGUID(), {})).to.throw();
		});

		it("should make the value change to the given value and fire the signal with the expected values even while locked if given the correct key", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			lockableValueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			lockableValueHolder.setValue(newValue, lockKey);

			expect(lockableValueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should not fire the signal if the input value is the same as the current value even while locked if given the correct key", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();

			let didSignalFire = false;
			lockableValueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			lockableValueHolder.setValue(DEFAULT_VALUE, lockKey);

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});
	});

	describe("tryTakeLock", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.tryTakeLock()).to.throw();
		});

		it("should return a lock key that can be used to unlock the instance if it was not locked already", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.tryTakeLock();
			assert(lockKey !== undefined, "Expected lockKey to not be nil");
			lockableValueHolder.releaseLock(lockKey);
		});

		it("should return nil if the instance is locked already", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			// if the lock is taken via tryTakeLock
			let lockKey = lockableValueHolder.tryTakeLock();
			assert(lockKey !== undefined, "Expected lockKey to not be nil");
			expect(lockableValueHolder.tryTakeLock()).to.never.be.ok();
			lockableValueHolder.releaseLock(lockKey);

			// if lock is taken via mustTakeLock
			lockKey = lockableValueHolder.mustTakeLock();
			expect(lockableValueHolder.tryTakeLock()).to.never.be.ok();
			lockableValueHolder.releaseLock(lockKey);
		});

		it("should return a different lock key that can be used to unlock the instance after it has been unlocked before", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			let previousLockKey: object | undefined;
			for (let i = 0; i < 10; i++) {
				const lockKey = lockableValueHolder.tryTakeLock();
				assert(lockKey !== undefined, "Expected lockKey to not be nil");
				expect(lockKey).to.never.equal(previousLockKey);

				lockableValueHolder.releaseLock(lockKey);
				previousLockKey = lockKey;
			}
		});
	});

	describe("updateValue", () => {
		it("should throw if the instance is destroyed", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.destroy();

			expect(() => lockableValueHolder.updateValue(() => "updated value")).to.throw();
		});

		it("should pass the current value to the callback then make the value change to the returned value and fire the signal with the expected values", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			lockableValueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			lockableValueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return newValue;
			});

			expect(lockableValueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should the current value to the callback then not fire the signal if the returned value is the same as the current value", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			let didSignalFire = false;
			lockableValueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			lockableValueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return DEFAULT_VALUE;
			});

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});

		it("should throw if not given the correct lock key without calling the callbacks", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			lockableValueHolder.mustTakeLock();

			expect(() =>
				lockableValueHolder.updateValue(() => {
					throw "Should not have called this callback when locked and not given a key";
				}, undefined),
			).to.throw();
			expect(() =>
				lockableValueHolder.updateValue(() => {
					throw "Should not have called this callback when locked and not given the correct key";
				}, {}),
			).to.throw();
		});

		it("should pass the current value to the callback then make the value change to the returned value and fire the signal with the expected values even while locked if given the correct key", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();

			const newValue = HttpService.GenerateGUID();

			let didSignalFireAsExpected = false;
			lockableValueHolder.valueChanged.Connect((newValueFromSignal, oldValueFromSignal) => {
				expect(newValueFromSignal).to.equal(newValue);
				expect(oldValueFromSignal).to.equal(DEFAULT_VALUE);
				didSignalFireAsExpected = true;
			});

			lockableValueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return newValue;
			}, lockKey);

			expect(lockableValueHolder.getValue()).to.equal(newValue);

			task.wait(0.2);

			expect(didSignalFireAsExpected).to.equal(true);
		});

		it("should the current value to the callback then not fire the signal if the returned value is the same as the current value even while locked if given the correct key", () => {
			const lockableValueHolder = LockableValueHolder.create(DEFAULT_VALUE);

			const lockKey = lockableValueHolder.mustTakeLock();

			let didSignalFire = false;
			lockableValueHolder.valueChanged.Connect(() => {
				didSignalFire = true;
			});

			lockableValueHolder.updateValue((existingValue) => {
				expect(existingValue).to.equal(DEFAULT_VALUE);
				return DEFAULT_VALUE;
			}, lockKey);

			task.wait(0.2);

			expect(didSignalFire).to.equal(false);
		});
	});
};
