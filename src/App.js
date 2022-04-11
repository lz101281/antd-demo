import React, { useState } from "react";
import { Table } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css"

export default function App() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "drag-visible"
    },
    {
      title: "Age",
      dataIndex: "age"
    },
    {
      title: "Address",
      dataIndex: "address"
    }
  ];

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "11111",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "22222",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "33333",
      name: "Joe Black",
      age: 39,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: "44444",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "55555",
      name: "55555",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "66666",
      name: "66666",
      age: 39,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: "7",
      name: "7777",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "8",
      name: "8888",
      age: 39,
      address: "Sidney No. 1 Lake Park"
    },
    
  ]);
  const DragableBodyRow = (props) => {
    console.log(props);
    const index = dataSource.findIndex(
      (row) => row.key === props["data-row-key"]
    );
    return (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"].toString()}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <tr
              {...props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={snapshot.isDragging ? "hello" : props.className}
            />
          );
        }}
      </Draggable>
    );
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
              {provided.placeholder}
            </>
          );
        }}
      </Droppable>
    );
  };
  const components = {
    body: {
      wrapper: draggableBody,
      row: DragableBodyRow
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        components={components}
      />
    </DragDropContext>
  );
}
