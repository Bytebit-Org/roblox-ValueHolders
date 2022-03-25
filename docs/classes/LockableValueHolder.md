[@rbxts/value-holders](../README.md) / LockableValueHolder

# Class: LockableValueHolder<T\>

Standard implementation of ILockableValueHolder

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`ILockableValueHolder`](../interfaces/ILockableValueHolder.md)<`T`\>

## Table of contents

### Properties

- [valueChanged](LockableValueHolder.md#valuechanged)

### Methods

- [destroy](LockableValueHolder.md#destroy)
- [getValue](LockableValueHolder.md#getvalue)
- [isLocked](LockableValueHolder.md#islocked)
- [mustTakeLock](LockableValueHolder.md#musttakelock)
- [releaseLock](LockableValueHolder.md#releaselock)
- [setValue](LockableValueHolder.md#setvalue)
- [tryTakeLock](LockableValueHolder.md#trytakelock)
- [updateValue](LockableValueHolder.md#updatevalue)
- [create](LockableValueHolder.md#create)

## Properties

### valueChanged

• `Readonly` **valueChanged**: `IReadOnlySignal`<(`newValue`: `T`, `oldValue`: `T`) => `void`\>

Fired when the value is changed

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[valueChanged](../interfaces/ILockableValueHolder.md#valuechanged)

#### Defined in

[src/classes/LockableValueHolder.ts:13](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L13)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the instance.
Any further calls to methods on the instance will throw errors.

#### Returns

`void`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[destroy](../interfaces/ILockableValueHolder.md#destroy)

#### Defined in

[src/classes/LockableValueHolder.ts:30](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L30)

___

### getValue

▸ **getValue**(): `T`

Gets the current value

#### Returns

`T`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[getValue](../interfaces/ILockableValueHolder.md#getvalue)

#### Defined in

[src/classes/LockableValueHolder.ts:39](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L39)

___

### isLocked

▸ **isLocked**(): `boolean`

Checks whether the value holder is locked

#### Returns

`boolean`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[isLocked](../interfaces/ILockableValueHolder.md#islocked)

#### Defined in

[src/classes/LockableValueHolder.ts:45](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L45)

___

### mustTakeLock

▸ **mustTakeLock**(): `object`

Tries to take the lock and returns a lock key object if successful, otherwise throws

#### Returns

`object`

The lock key object

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[mustTakeLock](../interfaces/ILockableValueHolder.md#musttakelock)

#### Defined in

[src/classes/LockableValueHolder.ts:51](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L51)

___

### releaseLock

▸ **releaseLock**(`lockKey`): `void`

Releases the lock

#### Parameters

| Name | Type |
| :------ | :------ |
| `lockKey` | `object` |

#### Returns

`void`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[releaseLock](../interfaces/ILockableValueHolder.md#releaselock)

#### Defined in

[src/classes/LockableValueHolder.ts:62](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L62)

___

### setValue

▸ **setValue**(`newValue`, `lockKey?`): `void`

Changes the value and fires valueChanged if the new value is not equal to the current value

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |
| `lockKey?` | `object` |

#### Returns

`void`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[setValue](../interfaces/ILockableValueHolder.md#setvalue)

#### Defined in

[src/classes/LockableValueHolder.ts:72](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L72)

___

### tryTakeLock

▸ **tryTakeLock**(): `undefined` \| `object`

Tries to take the lock and returns a lock key object if successful, otherwise returns undefined

#### Returns

`undefined` \| `object`

The lock key object if successful, otherwise undefined

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[tryTakeLock](../interfaces/ILockableValueHolder.md#trytakelock)

#### Defined in

[src/classes/LockableValueHolder.ts:82](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L82)

___

### updateValue

▸ **updateValue**(`updateCallback`, `lockKey?`): `void`

Calls the provided function and changes the value if the returned value is not equal to the current value
If the value is changed, then valueChanged is fired

#### Parameters

| Name | Type |
| :------ | :------ |
| `updateCallback` | (`currentValue`: `T`) => `T` |
| `lockKey?` | `object` |

#### Returns

`void`

#### Implementation of

[ILockableValueHolder](../interfaces/ILockableValueHolder.md).[updateValue](../interfaces/ILockableValueHolder.md#updatevalue)

#### Defined in

[src/classes/LockableValueHolder.ts:93](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L93)

___

### create

▸ `Static` **create**<`T`\>(`this`, `initialValue`): [`ILockableValueHolder`](../interfaces/ILockableValueHolder.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `initialValue` | `T` |

#### Returns

[`ILockableValueHolder`](../interfaces/ILockableValueHolder.md)<`T`\>

#### Defined in

[src/classes/LockableValueHolder.ts:26](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/LockableValueHolder.ts#L26)
