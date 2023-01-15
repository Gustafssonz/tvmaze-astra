import React from "react";
import { useQuery } from "react-query";

function Shows({ data }: any) {
  console.log(data);

  return <div>{data}</div>;
}

export default Shows;
