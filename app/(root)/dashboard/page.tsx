import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  return (
    <div>
      <br />
      <h1 className="text-4xl font-semibold">
        {" "}
        welcome to fortinix, you are logged in as{" "}
        <span className="text-blue-600">{session?.user.email}</span>
      </h1>
    </div>
  );
};

export default page;
