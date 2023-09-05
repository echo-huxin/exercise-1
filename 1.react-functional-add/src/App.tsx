import React, { useEffect, useState } from "react";
import "./App.css";

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */

// 缓存结果的对象
const resultCache: Record<string, number> = {};

async function add(...inputs: number[]) {
  // 你的实现
  try {
    // 输入验证

    // 将输入数字排序并生成一个唯一的缓存键
    const sortedInputs = inputs.sort((a, b) => a - b);
    const cacheKey = sortedInputs.join(",");
    // 检查缓存，如果已经计算过该结果，则直接返回缓存的结果
    if (resultCache[cacheKey] !== undefined) {
      return resultCache[cacheKey];
    }
    // 使用 Promise.all 来并发调用 addRemote，以提高性能
    const results = await Promise.all(inputs.map((num) => addRemote(num, 0)));
    // 使用 reduce 对结果进行累加
    const sum = results.reduce((acc, curr) => acc + curr, 0);
    // 缓存结果
    resultCache[cacheKey] = sum;
    return sum;
  } catch (error) {
    // 捕获可能发生的错误
    console.error("加法操作出错:", error);
    throw error;
  }
}
function App() {
  const [count, setCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  // 处理输入框值变化的函数
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    // 更新 inputValue 状态
    if (/^[,0-9]*$/.test(value)) {
      const cleanedValue = value.replace(/,+/g, ",");
      // 更新 inputValue 状态
      setInputValue(cleanedValue);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input
          type="text"
          placeholder="请输入要相加的数字（如1,3,4,5,6）"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button
          onClick={(e) => {
            if (inputValue.length === 0) {
              return setCount(0);
            }
            const numbers = inputValue
              .replace(/^,|,$/g, "")
              .split(",")
              .map((str) => parseFloat(str.trim()));

            add(...numbers).then((result) => {
              setCount(result);
            });
          }}
        >
          相加
        </button>
      </section>
      <section className="App-result">
        {count !== 0 && (
          <p>
            相加结果是：<span>{count}</span>
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
