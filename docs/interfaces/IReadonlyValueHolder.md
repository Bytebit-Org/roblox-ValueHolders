[@rbxts/value-holders](../README.md) / IReadonlyValueHolder

# Interface: IReadonlyValueHolder<T\>

Defines a readonly value manager for a value of type T

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `IDestroyable`

  ↳ **`IReadonlyValueHolder`**

  ↳↳ [`ILockableValueHolder`](ILockableValueHolder.md)

  ↳↳ [`IValueHolder`](IValueHolder.md)

## Table of contents

### Properties

- [valueChanged](IReadonlyValueHolder.md#valuechanged)

### Methods

- [destroy](IReadonlyValueHolder.md#destroy)
- [getValue](IReadonlyValueHolder.md#getvalue)

## Properties

### valueChanged

• `Readonly` **valueChanged**: `IReadOnlySignal`<(`newValue`: `T`, `oldValue`: `T`) => `void`\>

Fired when the value is changed

#### Defined in

[src/interfaces/IReadonlyValueHolder.d.ts:11](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/interfaces/IReadonlyValueHolder.d.ts#L11)

## Methods

### destroy

▸ **destroy**(): `void`

Clean up everything

#### Returns

`void`

#### Inherited from

IDestroyable.destroy

#### Defined in

node_modules/@rbxts/dumpster/Dumpster.d.ts:5

___

### getValue

▸ **getValue**(): `T`

Gets the current value

#### Returns

`T`

#### Defined in

[src/interfaces/IReadonlyValueHolder.d.ts:16](https://github.com/Bytebit-Org/roblox-ValueHolders/blob/156ddd9/src/interfaces/IReadonlyValueHolder.d.ts#L16)
