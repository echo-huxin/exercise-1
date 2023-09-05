/**
 * 实现一个加法计数器功能，加法的计算是在服务端完成，这里由 increaseRemote 进行模拟，要求实现的功能有：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 */

import React, { useState } from "react";
import "./index.css";

// 模拟异步加法操作，可以通过设置失败率来测试错误处理
async function increaseRemote(a: number, errorRate: number = 0) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  // 模拟错误，根据 errorRate 触发错误
  if (Math.random() < errorRate) {
    throw new Error("加法操作失败");
  }
  return a + 1;
}

function App() {
  // 计数器值
  const [count, setCount] = useState<number>(0);
  // 是否正在进行加法操作
  const [isAdding, setIsAdding] = useState<boolean>(false);
  // 错误状态
  const [error, setError] = useState<string | null>(null);

  // 处理 +1 或 +2 按钮的点击事件
  const handleAddClick = async (increment: number) => {
    if (!isAdding) {
      setIsAdding(true);
      setError(null); // 清除之前的错误

      try {
        const result = await increaseRemote(count + increment, Math.random());
        // 更新计数器值
        setCount(result);
      } catch (err: any) {
        // 捕获并处理错误
        setError(err.message);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>加法计数器</div>
      </header>
      <section className="App-content">
        <button onClick={() => handleAddClick(0)} disabled={isAdding}>
          +1
        </button>
        <button onClick={() => handleAddClick(1)} disabled={isAdding}>
          +2
        </button>
        {/* 显示计数器值 */}
        <p>数值：{count}</p>

        {/* 显示错误消息 */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </div>
  );
}
export default App;
