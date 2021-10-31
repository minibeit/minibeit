import React, { useState } from "react";

import UserPage from "./UserPage";
import BusinessPage from "./BusinessPage";

export default function ProfileTestComponent({ userId }) {
  const [mode, setMode] = useState("user");
  return (
    <div>
      <button onClick={() => setMode("user")}>개인 프로필</button>
      <button onClick={() => setMode("business")}>비즈니스 프로필</button>
      {mode === "user" ? <UserPage /> : <BusinessPage />}
    </div>
  );
}
