# Value Holders
<p align="center">
  <a href="https://github.com/Bytebit-Org/roblox-ValueHolders/actions">
      <img src="https://github.com/Bytebit-Org/roblox-ValueHolders/workflows/CI/badge.svg" alt="CI status" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  </a>
  <a href="https://discord.gg/QEz3v8y">
    <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" alt="Discord server" />
  </a>
</p>

Value Holders is a module for passing any values around by sharing a pointer, as well as allowing consumers to subscribe to changes and allowing authors to hold locks on changing the value.

## Installation
### roblox-ts
Simply install to your [roblox-ts](https://roblox-ts.com/) project as follows:
```
npm i @rbxts/value-holders
```

### Wally
[Wally](https://github.com/UpliftGames/wally/) users can install this package by adding the following line to their `Wally.toml` under `[dependencies]`:
```
ValueHolders = "bytebit/value-holders@1.0.3"
```

Then just run `wally install`.

### From model file
Model files are uploaded to every release as `.rbxmx` files. You can download the file from the [Releases page](https://github.com/Bytebit-Org/roblox-ValueHolders/releases) and load it into your project however you see fit.

### From model asset
New versions of the asset are uploaded with every release. The asset can be added to your Roblox Inventory and then inserted into your Place via Toolbox by getting it [here.](https://www.roblox.com/library/9170323611/Value-Holders-Package)

## Documentation
Documentation can be found [here](https://github.com/Bytebit-Org/roblox-ValueHolders/tree/master/docs), is included in the TypeScript files directly, and was generated using [TypeDoc](https://typedoc.org/).

## Examples
### Standard IValueHolder and a Readonly consumer
Here's an example of using a standard `IValueHolder` with one class, `Writer`, that contains the value and exposes it publicly as an `IReadonlyValueHolder` and one class, `Reader`, that only reads from the `IValueHolder` by using the `IReadonlyValueHolder` reference (in the TypeScript example). The actual value isn't very important for the purposes of this example, so we'll just have `Writer` update the value once every second.

<details>
  <summary>roblox-ts example</summary>

  ```ts
  import { IValueHolder, IReadonlyValueHolder, ValueHolder } from "@rbxts/value-holders";

  export class Writer {
    public readonly valueHolder: IReadonlyValueHolder<number>;

    private readonly internalValueHolder: IValueHolder<number>;

    public constructor() {
      this.internalValueHolder = new ValueHolder(0);
      this.valueHolder = this.internalValueHolder;

      this.incrementValueEverySecond();
    }

    private incrementValueEverySecond() {
      while (true) {
        task.wait(1);
        valueHolder.updateValue(currentValue => currentValue + 1);
      }
    }
  }

  export class Reader {
    public constructor(writer: Writer) {
      this.printEveryValueUpdate(writer.valueHolder);
    }

    private printEveryValueUpdate(valueHolder: IReadonlyValueHolder<number>) {
      valueHolder.valueChanged.Connect(newValue => print("New value is: " + newValue));
    }
  }
  ```
</details>

<details>
  <summary>Luau example</summary>

  ```lua
  local ValueHolder = require(path.to.modules["value-holders"]).ValueHolder

  local Writer = {}
  Writer.__index = Writer

  local WriterConstructor = {}
  function WriterConstructor.new()
    local self = {}
    setmetatable(self, Writer)

    self.valueHolder = ValueHolder.create(0)
    _incrementValueEverySecond(self)

    return self
  end

  function _incrementValueEverySecond(self)
    while true do
      task.wait(1)
      self.valueHolder:updateValue(function (currentValue)
        return currentValue + 1
      end)
    end
  end

  local Reader = {}
  Reader.__index = Reader

  local ReaderConstructor = {}
  function ReaderConstructor.new(writer)
    local self = {}
    setmetatable(self, Reader)

    _printEveryValueUpdate(self, writer.valueHolder)

    return self
  end

  function _printEveryValueUpdate(self, valueHolder)
    valueHolder.valueChanged:Connect(function (newValue)
      print("New value is: ", newValue)
    end)
  end

  return {
    Writer = WriterConstructor,
    Reader = ReaderConstructor
  }
  ```
</details>

### Two writers fighting over one ILockableValueHolder instance
The `ILockableValueHolder` interface is meant to enable some writers to shut off access to further writes from other potential writers. In this example, there will be a class that locks the value holder via a public method and another class that tries to set the value to 0 every second. Whenever the value is locked, the first class will increment the value every second. As in the previous example, we'll also have a Reader that just prints the value every time that it changes.

<details>
  <summary>roblox-ts example</summary>

  ```ts
  import { ILockableValueHolder, IReadonlyValueHolder, LockableValueHolder } from "@rbxts/value-holders";
  
  // not going to use this but just for example purposes
  const exampleLockableValueHolder = LockableValueHolder.create(0);

  export class LockedIncrementingWriter {
    private lockKey: object | undefined = undefined;

    public constructor(private readonly lockableValueHolder: ILockableValueHolder) {
      this.incrementValueEverySecond();
    }

    public takeLock() {
      if (this.lockKey !== undefined) {
        return;
      }

      this.lockKey = this.lockableValueHolder.tryTakeLock();
    }

    public releaseLock() {
      if (this.lockKey !== undefined) {
        return;
      }

      this.lockableValueHolder.releaseLock(this.lockKey);
      this.lockKey = undefined;
    }

    private incrementValueEverySecond() {
      while (true) {
        task.wait(1);
        if (lockableValueHolder.isLocked()) {
          lockableValueHolder.updateValue(
            currentValue => currentValue + 1,
            this.lockKey);
        }
      }
    }
  }

  export class ZeroWriter {
    public constructor(private readonly lockableValueHolder: ILockableValueHolder) {
      this.setValueToZeroEverySecond();
    }

    private setValueToZeroEverySecond() {
      while (true) {
        task.wait(1);
        if (!lockableValueHolder.isLocked()) {
          // If the code did not first check whether the value holder was locked,
          // then this line would error
          lockableValueHolder.setValue(0);
        }
      }
    }
  }

  export class Reader {
    public constructor(valueHolder: IReadonlyValueHolder) {
      this.printEveryValueUpdate(valueHolder);
    }

    private printEveryValueUpdate(valueHolder: IReadonlyValueHolder<number>) {
      valueHolder.valueChanged.Connect(newValue => print("New value is: " + newValue));
    }
  }
  ```
</details>

<details>
  <summary>Luau example</summary>

  ```lua
  local LockableValueHolder = require(path.to.modules["value-holders"]).LockableValueHolder

  -- not going to use this but just for example purposes
  local exampleLockableValueHolder = LockableValueHolder.create(0);

  local LockedIncrementingWriter = {}
  LockedIncrementingWriter.__index = LockedIncrementingWriter

  local LockedIncrementingWriterConstructor = {}
  function LockedIncrementingWriterConstructor.new(lockableValueHolder)
    local self = {}
    setmetatable(self, LockedIncrementingWriter)

    self._lockableValueHolder = lockableValueHolder
    _incrementValueEverySecond(self)

    return self
  end

  function LockedIncrementingWriter:takeLock()
    if self._lockKey then
      return
    end

    self._lockKey = self._lockableValueHolder:tryTakeLock();
  end

  function LockedIncrementingWriter:releaseLock()
    if self._lockKey then
      return
    end

    self._lockableValueHolder:releaseLock(self._lockKey);
    self._lockKey = nil;
  end

  function _incrementValueEverySecond(self)
    while true do
      task.wait(1)
      if self._lockableValueHolder:isLocked() then
        self._lockableValueHolder:updateValue(function (currentValue)
          return currentValue + 1
        end, self._lockKey)
      end
    end
  end

  local ZeroWriter = {}
  ZeroWriter.__index = ZeroWriter

  local ZeroWriterConstructor = {}
  function ZeroWriterConstructor.new(lockableValueHolder)
    local self = {}
    setmetatable(self, ZeroWriter)

    self._lockableValueHolder = lockableValueHolder
    _setValueToZeroEverySecond(self)

    return self
  end

  function _setValueToZeroEverySecond(self)
    while true do
      task.wait(1)
      if not self._lockableValueHolder:isLocked() then
        -- If the code did not first check whether the value holder was locked,
        -- then this line would error
        self._lockableValueHolder:setValue(0)
      end
    end
  end

  local Reader = {}
  Reader.__index = Reader

  local ReaderConstructor = {}
  function ReaderConstructor.new(valueHolder)
    local self = {}
    setmetatable(self, Reader)

    _printEveryValueUpdate(self, valueHolder)

    return self
  end

  function _printEveryValueUpdate(self, valueHolder)
    valueHolder.valueChanged:Connect(function (newValue)
      print("New value is: ", newValue)
    end)
  end

  return {
    LockedIncrementingWriter = LockedIncrementingWriterConstructor,
    ZeroWriter = ZeroWriterConstructor,
    Reader = ReaderConstructor
  }
  ```
</details>