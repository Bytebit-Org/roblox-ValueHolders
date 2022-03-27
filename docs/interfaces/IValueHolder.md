[@rbxts/value-holders](../README.md) / IValueHolder

# Interface: IValueHolder<T\>

Defines a writable value holder for a value of type T

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`IReadonlyValueHolder`](IReadonlyValueHolder.md)<`T`\>

  ↳ **`IValueHolder`**

## Implemented by

- [`ValueHolder`](../classes/ValueHolder.md)

## Table of contents

### Properties

- [valueChanged](IValueHolder.md#valuechanged)

### Methods

- [destroy](IValueHolder.md#destroy)
- [getValue](IValueHolder.md#getvalue)
- [setValue](IValueHolder.md#setvalue)
- [updateValue](IValueHolder.md#updatevalue)

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

[src/interfaces/IValueHolder.d.ts:11](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/IValueHolder.d.ts#L11)

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

### setValue

▸ **setValue**(`newValue`): `void`

Changes the value and fires valueChanged if the new value is not equal to the current value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValue` | `T` | The new value |

#### Returns

`void`

#### Defined in

[src/interfaces/IValueHolder.d.ts:17](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/IValueHolder.d.ts#L17)

___

### updateValue

▸ **updateValue**(`updateCallback`): `void`

Calls the provided function and changes the value if the returned value is not equal to the current value
If the value is changed, then valueChanged is fired

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `updateCallback` | (`currentValue`: `T`) => `T` | A function that takes a current value and returns a new value |

#### Returns

`void`

#### Defined in

[src/interfaces/IValueHolder.d.ts:24](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/5837c16/src/interfaces/IValueHolder.d.ts#L24)
