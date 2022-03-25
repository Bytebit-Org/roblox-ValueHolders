[@rbxts/value-holders](../README.md) / ValueHolder

# Class: ValueHolder<T\>

Standard implementation of IValueHolder

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`IValueHolder`](../interfaces/IValueHolder.md)<`T`\>

## Table of contents

### Properties

- [valueChanged](ValueHolder.md#valuechanged)

### Methods

- [destroy](ValueHolder.md#destroy)
- [getValue](ValueHolder.md#getvalue)
- [setValue](ValueHolder.md#setvalue)
- [updateValue](ValueHolder.md#updatevalue)
- [create](ValueHolder.md#create)

## Properties

### valueChanged

• `Readonly` **valueChanged**: `ISignal`<(`newValue`: `T`, `oldValue`: `T`) => `void`\>

Fired when the value is changed

#### Implementation of

[IValueHolder](../interfaces/IValueHolder.md).[valueChanged](../interfaces/IValueHolder.md#valuechanged)

#### Defined in

[src/classes/ValueHolder.ts:12](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L12)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the instance.
Any further calls to methods on the instance will throw errors.

#### Returns

`void`

#### Implementation of

[IValueHolder](../interfaces/IValueHolder.md).[destroy](../interfaces/IValueHolder.md#destroy)

#### Defined in

[src/classes/ValueHolder.ts:29](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L29)

___

### getValue

▸ **getValue**(): `T`

Gets the current value

#### Returns

`T`

#### Implementation of

[IValueHolder](../interfaces/IValueHolder.md).[getValue](../interfaces/IValueHolder.md#getvalue)

#### Defined in

[src/classes/ValueHolder.ts:39](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L39)

___

### setValue

▸ **setValue**(`newValue`): `void`

Changes the value and fires valueChanged if the new value is not equal to the current value

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

#### Returns

`void`

#### Implementation of

[IValueHolder](../interfaces/IValueHolder.md).[setValue](../interfaces/IValueHolder.md#setvalue)

#### Defined in

[src/classes/ValueHolder.ts:45](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L45)

___

### updateValue

▸ **updateValue**(`updateCallback`): `void`

Calls the provided function and changes the value if the returned value is not equal to the current value
If the value is changed, then valueChanged is fired

#### Parameters

| Name | Type |
| :------ | :------ |
| `updateCallback` | (`currentValue`: `T`) => `T` |

#### Returns

`void`

#### Implementation of

[IValueHolder](../interfaces/IValueHolder.md).[updateValue](../interfaces/IValueHolder.md#updatevalue)

#### Defined in

[src/classes/ValueHolder.ts:58](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L58)

___

### create

▸ `Static` **create**<`T`\>(`this`, `initialValue`): [`IValueHolder`](../interfaces/IValueHolder.md)<`T`\>

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

[`IValueHolder`](../interfaces/IValueHolder.md)<`T`\>

#### Defined in

[src/classes/ValueHolder.ts:25](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/classes/ValueHolder.ts#L25)
