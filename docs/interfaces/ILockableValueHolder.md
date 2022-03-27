[@rbxts/value-holders](../README.md) / ILockableValueHolder

# Interface: ILockableValueHolder<T\>

Defines a lockable value holder

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`IReadonlyValueHolder`](IReadonlyValueHolder.md)<`T`\>

  ↳ **`ILockableValueHolder`**

## Implemented by

- [`LockableValueHolder`](../classes/LockableValueHolder.md)

## Table of contents

### Properties

- [valueChanged](ILockableValueHolder.md#valuechanged)

### Methods

- [destroy](ILockableValueHolder.md#destroy)
- [getValue](ILockableValueHolder.md#getvalue)
- [isLocked](ILockableValueHolder.md#islocked)
- [mustTakeLock](ILockableValueHolder.md#musttakelock)
- [releaseLock](ILockableValueHolder.md#releaselock)
- [setValue](ILockableValueHolder.md#setvalue)
- [tryTakeLock](ILockableValueHolder.md#trytakelock)
- [updateValue](ILockableValueHolder.md#updatevalue)

## Properties

### valueChanged

• `Readonly` **valueChanged**: `IReadOnlySignal`<(`newValue`: `T`, `oldValue`: `T`) => `void`\>

Fired when the value is changed

#### Inherited from

[IReadonlyValueHolder](IReadonlyValueHolder.md).[valueChanged](IReadonlyValueHolder.md#valuechanged)

#### Defined in

[src/interfaces/IReadonlyValueHolder.d.ts:11](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/IReadonlyValueHolder.d.ts#L11)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the instance.
Any further calls to methods on the instance will throw errors.

#### Returns

`void`

#### Overrides

[IReadonlyValueHolder](IReadonlyValueHolder.md).[destroy](IReadonlyValueHolder.md#destroy)

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:11](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L11)

___

### getValue

▸ **getValue**(): `T`

Gets the current value

#### Returns

`T`

#### Inherited from

[IReadonlyValueHolder](IReadonlyValueHolder.md).[getValue](IReadonlyValueHolder.md#getvalue)

#### Defined in

[src/interfaces/IReadonlyValueHolder.d.ts:16](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/IReadonlyValueHolder.d.ts#L16)

___

### isLocked

▸ **isLocked**(): `boolean`

Checks whether the value holder is locked

#### Returns

`boolean`

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:16](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L16)

___

### mustTakeLock

▸ **mustTakeLock**(): `object`

Tries to take the lock and returns a lock key object if successful, otherwise throws

**`throws`** Throws if taking the lock is unsuccessful

#### Returns

`object`

The lock key object

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:23](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L23)

___

### releaseLock

▸ **releaseLock**(`lockKey`): `void`

Releases the lock

**`throws`** Throws if not given the expected lock key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lockKey` | `object` | The lock key |

#### Returns

`void`

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:30](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L30)

___

### setValue

▸ **setValue**(`newValue`, `lockKey?`): `void`

Changes the value and fires valueChanged if the new value is not equal to the current value

**`throws`** Throws if not given the expected lock key while locked

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValue` | `T` | The new value |
| `lockKey?` | `object` | The lock key, if any |

#### Returns

`void`

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:38](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L38)

___

### tryTakeLock

▸ **tryTakeLock**(): `undefined` \| `object`

Tries to take the lock and returns a lock key object if successful, otherwise returns undefined

#### Returns

`undefined` \| `object`

The lock key object if successful, otherwise undefined

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:44](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L44)

___

### updateValue

▸ **updateValue**(`updateCallback`, `lockKey?`): `void`

Calls the provided function and changes the value if the returned value is not equal to the current value
If the value is changed, then valueChanged is fired

**`throws`** Throws if not given the expected lock key while locked

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `updateCallback` | (`currentValue`: `T`) => `T` | A function that takes a current value and returns a new value |
| `lockKey?` | `object` | The lock key, if any |

#### Returns

`void`

#### Defined in

[src/interfaces/ILockableValueHolder.d.ts:53](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/ILockableValueHolder.d.ts#L53)
