import React, { useState } from "react";
import { Table } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css";

export default function App() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },
    {
      title: "Age",
      dataIndex: "age",
      className: "ant-table-cell",
    },

    {
      title: "Address",
      dataIndex: "address",
      fixed: "right",
    },
  ];

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "11111",
      age: "asjdljasldjlasjldkjlaksjdlkjaslkdjklasjdlasjdljasldjlasjldkjlaksjdlkjaslkdjklasjdlasjdljasldjlasjldkjlaksjdlkjaslkdjklasjdlasjdljasldjlasjldkjlaksjdlkjaslkdjklasjdl",
      address: "New York No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "22222",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "33333",
      name: "Joe Black",
      age: 39,
      address: "Sidney No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "44444",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "55555",
      name: "55555",
      age: 42,
      address: "London No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "66666",
      name: "66666",
      age: 39,
      address: "Sidney No. 1 Lake Park",
      className: "ant-table-cell",
    },
    {
      key: "7",
      name: "7777",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "8",
      name: "8888",
      age: 39,
      address: "Sidney No. 1 Lake Park",
    },
  ]);
  const DragableBodyRow = (props) => {
    console.log("props---");
    const index = dataSource.findIndex(
      (row) => row.key === props["data-row-key"]
    );
    return props.children.length === 10 ? (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"].toString()}
        index={index}
        data-row-key={props["data-row-key"]}
      >
        {(provided, snapshot) => {
          return (
            <tr
            {...props}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={
              snapshot.isDragging
                ? `${props.className} hello`
                : props.className
            }
            >
              
            </tr>
          );
        }}
      </Draggable> 
    ) : <tr {...props}></tr>;
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const items = reorder(
      dataSource,
      result.source.index,
      result.destination.index
    );
    setDataSource(items);
  };

  const draggableBody = (props) => {
    console.log(props, "props");
    return (
      <Droppable droppableId="droppable">
        {(provided, snapshot) => {
          return (
            <>
              <tbody
                {...props}
                {...provided.droppableProps}
                ref={provided.innerRef}
              ></tbody>
            </>
          );
        }}
      </Droppable>
    );
  };
  const components = {
    body: {
      wrapper: draggableBody,
      row: DragableBodyRow,
    },
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        components={components}
        scroll={{ x: 1480 }}
      />
    </DragDropContext>
  );
}
