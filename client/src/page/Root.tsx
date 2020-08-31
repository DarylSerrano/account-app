import React, { useEffect, useState } from "react";
import { User } from "../interfaces/api";
import fetcher from "../service/fetcher";

export default function RootPage() {
  const [users, setusers] = useState<User[]>([]);

  const fetchUsers = async () => {
    let userGetted = await fetcher.makeFetch<User[]>(
      "http://localhost:8080/api/users"
    );
    console.log("Fetch users")
    setusers(userGetted);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Root page</h1>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
}
