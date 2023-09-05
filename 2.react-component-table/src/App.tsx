import React, { useState } from "react";
import "./App.css";

/**
 * 实现一个 Table 组件满足以下功能，如图 table.jpeg 所示
 * - 把数据渲染成表格
 * - 支持列排序
 * - 支持多列排序
 */
/**
 * 使用如下数据进行测试
 */

// 定义学生数据类型
interface Student {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

// 测试数据
const testData: Student[] = [
  {
    name: "Jim",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    name: "Tom",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    name: "Han",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    name: "Lilei",
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function Table({ data }: { data: Student[] }) {
  // 初始排序状态
  const initialSortState: Record<keyof Student, "asc" | "desc"> = {
    name: "asc",
    chinese: "asc",
    math: "asc",
    english: "asc",
  };

  const [sortState, setSortState] = useState(initialSortState);
  const [sortBy, setSortBy] = useState<keyof Student>("chinese");

  // 处理列排序的函数
  const handleSort = (column: keyof Student) => {
    const newSortState = { ...sortState };
    // 切换升序和降序
    newSortState[column] = sortState[column] === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortState(newSortState);
  };

  // 排序函数，根据当前排序列和方向排序数据
  const sortedData = [...data].sort((a, b) => {
    const sortDirection = sortState[sortBy];
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return ((a[sortBy] as any) - (b[sortBy] as any)) * multiplier;
  });

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          {/* 为每列添加排序点击事件 */}
          <th onClick={() => handleSort("chinese")}>
            Chinese
            {sortState["chinese"] === "asc" ? (
              <span className="bi bi-caret-up-fill" />
            ) : (
              <span className="bi bi-caret-down-fill" />
            )}
          </th>
          <th onClick={() => handleSort("math")}>
            Math
            {sortState["math"] === "asc" ? (
              <span className="bi bi-caret-up-fill" />
            ) : (
              <span className="bi bi-caret-down-fill" />
            )}
          </th>
          <th onClick={() => handleSort("english")}>
            English
            {sortState["english"] === "asc" ? (
              <span className="bi bi-caret-up-fill" />
            ) : (
              <span className="bi bi-caret-down-fill" />
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {/* 渲染排序后的数据 */}
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.chinese}</td>
            <td>{item.math}</td>
            <td>{item.english}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>使用 testData 数据在这里渲染实现的 Table 组件</div>
      {/* 渲染表格组件并传入测试数据 */}
      <Table data={testData} />
    </div>
  );
}

export default App;
